<template>
    <transition
        :enter-active-class="dAnimationIn"
        :leave-active-class="dAnimationOut"
        @after-enter="onAfterEnterAnim"
        @after-leave="onAfterLeaveAnim"
        :css="animated"
    >
        <div
            ref="window"
            v-if="isMounted"
            v-show="isVisible"
            :id="id"
            class="fwindow"
            :class="cssClass"
            :style="style"
            :role="role"
            :aria-modal="modal"
            :aria-labelledby="_ids.title"
            :aria-describedby="_ids.body"
            :data-code="code || null"
            tabindex="-1"
            @keyup="onKeyup"
            @keydown="onKeydown"
        >
            <div ref="doc" role="document" class="fwindow_doc">
                <header v-if="withHeader" class="fwindow_header">
                    <div class="fwindow_header_leftcontrols">
                        <slot name="left-controls"></slot>
                    </div>
                    <div :id="_ids.title" class="fwindow_header_title">
                        <!-- @slot Default to `title` prop -->
                        <slot name="title">
                            <h1 class="h3">{{ title }}</h1>
                        </slot>
                    </div>
                    <div class="fwindow_header_controls" @click="onControlsClick">
                        <!-- @slot Default to `close-btn` button -->
                        <slot name="controls">
                            <button
                                class="close-btn btn btn-samesize btn-round btn-tertiary"
                                :title="translate('fwindow.closeWindow')"
                            >
                                <slot name="close-button-content">
                                    <FSvgIcon size="20px">
                                        <IconTimes />
                                    </FSvgIcon>
                                </slot>
                            </button>
                        </slot>
                    </div>
                </header>

                <div :id="_ids.body" class="fwindow_body">
                    <slot></slot>
                </div>

                <footer v-if="withFooter" class="fwindow_footer">
                    <slot name="footer"></slot>
                </footer>

                <div v-if="withArrow" ref="arrow" class="fwindow_arrow" :data-arrow-dir="arrowDir" :style="arrowStyle">
                    <slot name="arrow-icon">
                        <FSvgIcon rotate="-90deg"><IconPopoverArrow /></FSvgIcon>
                    </slot>
                </div>

                <FOverlay
                    v-if="dWithOverlay && isVisible"
                    ref="overlay"
                    :z-index="dZIndex - 1"
                    :class="['fwindow_overlay', overlayClass]"
                    :hide-on-click="hideOnEscapeKey && !closingDisabled"
                    @overlay-hide="onOverlayHide"
                />
            </div>
        </div>
    </transition>
</template>

<script>
import { getLengthAndUnit, getComputedStyle, getCustomProperty, setCustomProperty } from '../../utils/css.js';
import { getUniqueId } from '../../utils/index.js';
import { throttle } from '../../utils/function/function.js';
import FOverlay from '../FOverlay/FOverlay.vue';
import { focusTrap, isKey, returnFocus, setReceiveFocusFromAttr } from '../../utils/aria.js';
// import ResizeObserver from 'resize-observer-polyfill';
import {
    attachElemTo,
    getAlignment,
    getAttachPosition,
    getAttachPositionByRects,
    getAutoAttachPosition,
    getElemRect,
} from '../../utils/DOM.js';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconTimes from '../icons/IconTimes.vue';
import IconPopoverArrow from '../icons/IconPopoverArrow.vue';
import { translationsMixin } from '../../mixins/translations.js';
import { findParentByName } from '../../utils/vue-helpers.js';
import { nextTick } from 'vue';
// import './directives.js';

/**
 * Basic window following WAI-ARIA practices.
 * Needs `resize-observer-polyfill` plugin.
 */
export default {
    name: 'FWindow',

    components: { IconPopoverArrow, IconTimes, FSvgIcon, FOverlay },

    mixins: [translationsMixin],

    emits: ['window-hide'],

    props: {
        /** Is window visible on initialization? */
        visible: {
            type: Boolean,
            default: false,
        },
        /** Title of window rendered in header. */
        title: {
            type: String,
            default: '',
        },
        /** Has window a title? */
        noTitle: {
            type: Boolean,
            default: false,
        },
        /** Animation that starts when the window is just about to show. */
        animationIn: {
            type: String,
            default: 'fade-enter-active',
        },
        /** Animation that starts when the window is just about to hide. */
        animationOut: {
            type: String,
            default: 'fade-leave-active',
        },
        /** WAI-ARIA role. */
        role: {
            type: String,
            default: 'dialog',
        },
        /** `data-code` attribute */
        code: {
            type: String,
            default: '',
        },
        /** Is window a modal? */
        modal: {
            type: Boolean,
            default: false,
        },
        /** Is window a popover? */
        popover: {
            type: Boolean,
            default: false,
        },
        /** `<header>` will be rendered. */
        withHeader: {
            type: Boolean,
            default: true,
        },
        /** `<footer>` will be rendered. */
        withFooter: {
            type: Boolean,
            default: false,
        },
        /** Use arrow with popover */
        withArrow: {
            type: Boolean,
            default: false,
        },
        /** `FOverlay` shows. */
        withOverlay: {
            type: Boolean,
            default: true,
        },
        /** Css class for the overlay */
        overlayClass: {
            type: String,
            default: '',
        },
        /** 'fixed' | 'absolute' */
        position: {
            type: String,
            default: 'fixed',
        },
        /** `z-index` of window, if overlay is used, it has `z-index` `zIndex -1`. */
        zIndex: {
            type: Number,
            default: 6,
        },
        /** CSS selector. If window is popover, it will be attached to elemnet given by this selector. */
        attachTo: {
            type: String,
            default: '',
        },
        /**
         * How to place popover to `attachTo` element. (`'top'` | `'right'` | `'bottom'` | `'left'` | `'auto'` | `'[lcrm][tcbm] [lcrm][tcbm]'`)
         *
         * @type {('top' | 'right' | 'bottom' | 'left' | 'auto' | 'auto-vertical' | 'auto-vertical-exact' | 'auto-horizontal' | 'auto-horizontal-exact' | '[lcrm][tcbm] [lcrm][tcbm]')}
         */
        attachPosition: {
            type: String,
            default: '',
        },
        /**
         * Prefered attach position, if `attachPosition` is `'auto'`. (`'top'` | `'right'` | `'bottom'` | `'left'` | `'auto'` | `'[lcrm][tcbm] [lcrm][tcbm]'`)
         *
         * @type {('top' | 'right' | 'bottom' | 'left' | '[lcrm][tcbm] [lcrm][tcbm]')}
         */
        preferredAttachPosition: {
            type: String,
            default: '',
        },
        /**
         * Margin of popover. (`[top, right, bottom, left]`)
         *
         * @type {[number, number, number, number]}
         */
        attachMargin: {
            type: Array,
            default() {
                return [0, 0, 0, 0];
            },
            validator: function (_value) {
                return _value.length === 4;
            },
        },
        /** When `hideOnDocumentMousedown` is set, don't hide the window by clicking on the elements with this code  */
        descendantsCode: {
            type: String,
            default: '',
        },
        /** Set the minimum width of the window as the element to which the window is attached */
        widthAsAttach: {
            type: Boolean,
            default: false,
        },
        /** Hide window after this amout of milliseconds. 0 means no auto hiding. */
        hideAfter: {
            type: Number,
            default: 0,
        },
        /** Center window horizontally. */
        centerHorizontally: {
            type: Boolean,
            default: true,
        },
        /** Center window vertically. */
        centerVertically: {
            type: Boolean,
            default: true,
        },
        /** Make window stay in viewport. `'horizontal'` - correct just horizontal position if it's necessary */
        stayInViewport: {
            type: [Boolean, String],
            default: true,
        },
        /** Don't append window element to 'body' element */
        stayInPlace: {
            type: [Boolean, String],
            default: false,
        },
        /** Hide window when browser window is resized. */
        hideOnDocumentResize: {
            type: Boolean,
            default: false,
        },
        /** Hide window on browser window mousedown. */
        hideOnDocumentMousedown: {
            type: Boolean,
            default: false,
        },
        /** Hide window on browser window is scrolled. */
        hideOnDocumentScroll: {
            type: Boolean,
            default: false,
        },
        /** Hide window when escape key is pressed. */
        hideOnEscapeKey: {
            type: Boolean,
            default: true,
        },
        /** Correct window's position and size on document scroll */
        correctPosOnScroll: {
            type: Boolean,
            default: true,
        },
        /** Check (when window is about to hide) if any descendant component has changed */
        checkComponentsChange: {
            type: Boolean,
            default: true,
        },
        /** Prevent window to focus */
        preventFocus: {
            type: Boolean,
            default: false,
        },
        /**  */
        closingDisabled: {
            type: Boolean,
            default: false,
        },
        resizeThrottleInterval: {
            type: Number,
            default: 300,
        },
    },

    data() {
        return {
            id: getUniqueId(),
            isVisible: false,
            isMounted: false,
            animated: true,
            dPosition: this.popover ? 'absolute' : this.position,
            dAnimationIn: this.animationIn,
            dAnimationOut: this.animationOut,
            dZIndex: this.zIndex,
            dWithOverlay: this.popover ? false : this.withOverlay,
            dAttachMargin: [...this.attachMargin],
            style: {
                zIndex: this.zIndex,
            },
            arrowDir: 'up',
            arrowStyle: {},
        };
    },

    computed: {
        cssClass() {
            return {
                'fwindow-absolute': this.dPosition === 'absolute',
                'fwindow-fixed': this.dPosition === 'fixed',
                'fwindow-withheader': this.withHeader,
                'fwindow-withfooter': this.withFooter,
                'fwindow-witharrow': this.withArrow,
                'fwindow-notitle': this.noTitle,
                'fwindow-closingdisabled': this.closingDisabled,
                modal: this.modal,
                'fwindow-popover': this.popover,
            };
        },
    },

    watch: {
        visible(_value) {
            if (_value) {
                this.isMounted = true;
            }
            this.isVisible = _value;
        },
        withArrow(_value) {
            if (!_value) {
                this.dAttachMargin = [...this.attachMargin];
                this._arrowSizeAdded = false;
            }
        },
    },

    created() {
        const uid = this.$.uid;

        /** Initial css values of window. */
        this._windowStyle = {
            top: 0,
            left: 0,
            width: 0,
            maxWidth: 0,
            minWidth: 0,
            height: 0,
            maxHeight: 0,
            minHeight: 0,
            /*
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            */
            _horHalfMarginSet: false, // helper
            _verHalfMarginSet: false, // helper
        };
        /** Various ids. */
        this._ids = {
            comp: `fwin-${uid}`,
            title: `fwin-title-${uid}`,
            body: `fwin-body-${uid}`,
        };
        /** Debounce function used as window resize callback. */
        this._resizeCallback = throttle((_event) => this.onWindowResize(_event), 300, true);
        /** Debounce function used as document scroll callback. */
        this._scrollCallback = throttle((_event) => this.onDocumentScroll(_event), 300, true);
        /** Instance of ResizeObserver. */
        this._resizeObserver = null;
        /** Stores first and last focusable elements in window. */
        this._firstLastFocusables = {
            first: null,
            last: null,
        };
        /** `hideAfter` timeout id. */
        this._hideAfterId = -1;
        /** Value of `--f-zindex-modal-base` custom property */
        this._modalZIndex = -1;
        /** Is show animation in progress? */
        this._showAnimInProgress = false;
        /** Is hide animation in progress? */
        this._hideAnimInProgress = false;
        this._arrowSize = {
            width: 0,
            height: 0,
        };
        /** Signals if arrow size was added to `attachMargin` */
        this._arrowSizeAdded = false;
    },

    mounted() {
        const modalZIndex = parseInt(getCustomProperty('--f-zindex-modal-base', 'zIndex'));

        if (!isNaN(modalZIndex)) {
            this._modalZIndex = modalZIndex;
            this.dZIndex = modalZIndex + 1;
            this._updateStyle({ zIndex: this.dZIndex });
        }

        if (!this.stayInPlace) {
            document.body.appendChild(this.$el);
        }

        if (this.hideOnDocumentResize) {
            window.addEventListener('resize', this._resizeCallback, false);
        }

        if (this.hideOnDocumentMousedown) {
            window.addEventListener('mousedown', this.onWindowMousedown, false);
        }

        if (this.correctPosOnScroll || this.hideOnDocumentScroll) {
            document.addEventListener('scroll', this._scrollCallback, false);
        }

        if (this.visible) {
            this.$nextTick(() => {
                this.show();
            });
        }
    },

    beforeUnmount() {
        this._firstLastFocusables = null;

        this.hide();

        if (this.hideOnDocumentResize) {
            window.removeEventListener('resize', this._resizeCallback);
        }

        if (this.hideOnDocumentMousedown) {
            window.removeEventListener('mousedown', this.onWindowMousedown);
        }

        if (this.correctPosOnScroll) {
            document.removeEventListener('scroll', this._scrollCallback);
        }

        this.clearHideAfterTimeout();

        this.destroyResizeObserver();
    },

    unmounted() {
        this.$el.remove();
    },

    methods: {
        show(_animationIn) {
            if (!this.isVisible || this._hideAnimInProgress) {
                const parentWindow = findParentByName(this, 'FWindow');

                if (parentWindow) {
                    this.dZIndex = parentWindow.dZIndex + 2;
                    this._updateStyle({ zIndex: this.dZIndex });
                }

                if (this._modalZIndex > -1) {
                    setCustomProperty('--f-zindex-modal-curr', this.dZIndex);
                }

                if (_animationIn) {
                    this.dAnimationIn = _animationIn;
                } else {
                    this.dAnimationIn = this.animationIn;
                }

                if (!this.preventFocus) {
                    setReceiveFocusFromAttr(this._ids.comp);
                }

                this._firstLastFocusables.first = null;
                this._firstLastFocusables.last = null;

                this.$nextTick(() => {
                    this.isMounted = true;
                    this.isVisible = true;
                    this._showAnimInProgress = true;

                    this.$nextTick(() => {
                        getComputedStyle(this.$el, this._windowStyle);

                        if (this.withArrow) {
                            this._setAttachMargin();
                        }

                        this.setPosition();
                        if (!this.preventFocus) {
                            this.focus();
                        }
                        this.createResizeObserver();
                        this.startHideAfterTimeout();
                    });
                });
            }
        },

        hide(_animationOut, _byOverlay) {
            if ((this.isVisible || this._showAnimInProgress) && !this.closingDisabled) {
                /*if (
                    this.checkComponentsChange &&
                    !this.dWithOverlay &&
                    isAnyComponentChanged(this, this.translate('componentChangeMessages'))
                ) {
                    return;
                }*/

                if (this._modalZIndex > -1 && this.dZIndex - 1 > this._modalZIndex) {
                    setCustomProperty('--f-zindex-modal-curr', this.dZIndex - 2);
                }

                if (!_byOverlay) {
                    if (_animationOut) {
                        this.dAnimationOut = _animationOut;
                    } else {
                        this.dAnimationOut = this.animationOut;
                    }
                }

                this._hideAnimInProgress = true;

                this.$nextTick(() => {
                    if (this.dWithOverlay && !_byOverlay && this.$refs.overlay) {
                        this.$refs.overlay.hide();
                    } else {
                        this.destroyResizeObserver();
                        this.isVisible = false;

                        this.$emit('window-hide');
                    }

                    if (!this.preventFocus) {
                        returnFocus(this._ids.comp);
                    }
                });
            }
        },

        toggle() {
            if (!this.isVisible) {
                this.show();
            } else {
                this.hide();
            }
        },

        /**
         * Focus element with `data-focus` attribute or focus `.doc` by default.
         */
        focus() {
            const focusElem = this.$el.querySelector('[data-focus]');
            let inputElem = null;

            if (focusElem) {
                // try to find element with `name` attribute
                inputElem = focusElem.querySelector('[name]');
                if (inputElem) {
                    inputElem.focus();
                } else if (focusElem) {
                    focusElem.focus();
                }
            } else {
                this.$nextTick(() => {
                    if (this.$refs.window) {
                        this.$refs.window.focus();
                    }
                });
            }
        },

        setPosition() {
            const style = {};

            if (this.isVisible) {
                if (this.dPosition === 'fixed') {
                    if (this.centerHorizontally) {
                        this._setHalfMargin(style);
                        style.left = '50%';
                    }

                    if (this.centerVertically) {
                        this._setHalfMargin(style, true);
                        style.top = '50%';
                    }
                }

                this._updateStyle(style);

                this.$nextTick(() => {
                    this.correctPositionAndSize();
                });

                // defer(() => this.correctPositionAndSize());
            }
        },

        correctPositionAndSize() {
            let rect;
            // let attachMargin;
            // let pos;
            const css = {};
            const windowStyle = this._windowStyle;

            if (!this.isVisible) {
                return;
            }

            if (this.dPosition === 'fixed') {
                rect = this.$el.getBoundingClientRect();

                if (this.centerHorizontally) {
                    if (windowStyle._horHalfMarginSet && rect.left < 0) {
                        css.marginLeft = 0;
                        css.left = 0;

                        windowStyle._horHalfMarginSet = false;
                    } else if (!windowStyle._horHalfMarginSet && rect.width < document.documentElement.clientWidth) {
                        this._setHalfMargin(css);
                        css.left = '50%';
                    }
                }

                if (this.centerVertically) {
                    if (windowStyle._verHalfMarginSet && rect.top <= 0) {
                        css.marginTop = 0;
                        css.top = 0;

                        windowStyle._verHalfMarginSet = false;
                    } else if (!windowStyle._verHalfMarginSet && rect.height < document.documentElement.clientHeight) {
                        this._setHalfMargin(css, true);
                        css.top = '50%';
                    }

                    if (rect.top > 0) {
                        this._setHalfMargin(css, true);
                    }
                }

                this._updateStyle(css);
            } else if (this.dPosition === 'absolute') {
                if (this.attachTo || this.attachToPoint) {
                    const attachMargin = this.dAttachMargin;
                    const elem = !this.attachToPoint ? document.querySelector(this.attachTo) : null;

                    if (elem && this.widthAsAttach) {
                        this.$el.style.minWidth = `${elem.clientWidth}px`;
                    }

                    rect = attachElemTo(
                        this.$el,
                        this.attachToPoint || elem,
                        this._getAlignment(),
                        this.stayInViewport,
                        {
                            top: attachMargin[0],
                            right: attachMargin[1],
                            bottom: attachMargin[2],
                            left: attachMargin[3],
                        }
                    );

                    if (rect) {
                        setCustomProperty('--fwindow-offset-top', `${rect.elem1Rect.top}px`, this.$el);
                    }

                    this.attachToPoint = null;

                    if (this.withArrow && rect) {
                        this._correctArrowPosition(rect);
                    }
                }
            }
        },

        _correctArrowPosition(_rects) {
            const contRect = _rects.elem1Rect;
            const elemRect = _rects.elem2Rect;
            const arrowDir = this.arrowDir;
            const windowStyle = this._windowStyle;
            let arrowSize = 16;
            let arrowPos = 0;
            const arrowStyle = { display: 'block' };

            if (contRect && elemRect) {
                if (
                    _rects.pos &&
                    (((arrowDir === 'down' || arrowDir === 'up') && _rects.pos.top !== -1) ||
                        ((arrowDir === 'left' || arrowDir === 'right') && _rects.pos.left !== -1))
                ) {
                    this.arrowStyle = { display: 'none' };
                    return;
                }

                if (arrowDir === 'up' || arrowDir === 'down') {
                    arrowSize = this._arrowSize.width || arrowSize;

                    if (contRect.width > elemRect.width) {
                        // widths
                        arrowPos = elemRect.left + elemRect.width / 2 - arrowSize / 2 - contRect.left;
                    } else {
                        arrowPos = contRect.width / 2 - arrowSize / 2;
                    }

                    if (arrowPos < 0) {
                        arrowPos =
                            arrowDir === 'up' ? windowStyle.borderTopLeftRadius : windowStyle.borderBottomLeftRadius;
                    } else if (arrowPos > contRect.width - arrowSize) {
                        arrowPos =
                            contRect.width -
                            arrowSize -
                            (arrowDir === 'up'
                                ? windowStyle.borderTopRightRadius
                                : windowStyle.borderBottomRightRadius);
                    }

                    arrowStyle.left = `${arrowPos}px`;
                } else {
                    arrowSize = this._arrowSize.height || arrowSize;

                    if (contRect.height > elemRect.height) {
                        // heights
                        arrowPos = elemRect.top + elemRect.height / 2 - arrowSize / 2 - contRect.top;
                    } else {
                        arrowPos = contRect.height / 2 - arrowSize / 2;
                    }

                    if (arrowPos < 0) {
                        arrowPos =
                            arrowDir === 'left' ? windowStyle.borderTopLeftRadius : windowStyle.borderTopRightRadius;
                    } else if (arrowPos > contRect.height - arrowSize) {
                        arrowPos =
                            contRect.height -
                            arrowSize -
                            (arrowDir === 'left'
                                ? windowStyle.borderBottomLeftRadius
                                : windowStyle.borderBottomRightRadius);
                    }

                    arrowStyle.top = `${arrowPos}px`;
                }

                this.arrowStyle = arrowStyle;
            }
        },

        createResizeObserver() {
            this.destroyResizeObserver();

            if (!this._resizeObserver && window.ResizeObserver) {
                this._resizeObserver = new window.ResizeObserver(
                    throttle((_entries) => this.onResize(_entries), this.resizeThrottleInterval, true)
                );
                this._resizeObserver.observe(this.$el);
            }
        },

        destroyResizeObserver() {
            if (this._resizeObserver) {
                this._resizeObserver.disconnect();
                this._resizeObserver = null;
            }
        },

        startHideAfterTimeout() {
            if (this.hideAfter > 0) {
                this.clearHideAfterTimeout();

                this._hideAfterId = setTimeout(() => {
                    this.hide();
                }, this.hideAfter);
            }
        },

        clearHideAfterTimeout() {
            if (this._hideAfterId > -1) {
                clearTimeout(this._hideAfterId);
            }
        },

        _setHalfMargin(_style, _setTopMargin) {
            const margin = this._getHalfMargin(_setTopMargin);
            const windowStyle = this._windowStyle;
            let style;

            if (margin) {
                style = _style || this.$el.style;

                if (_setTopMargin) {
                    style.marginTop = margin;
                    windowStyle._verHalfMarginSet = true;
                } else {
                    style.marginLeft = margin;
                    windowStyle._horHalfMarginSet = true;
                }
            }
        },

        _getHalfMargin(_getTopMargin) {
            const windowStyle = this._windowStyle;
            const { clientHeight } = this.$el;

            if (windowStyle.height === 'auto') {
                windowStyle.height = `${clientHeight}px`;
            }

            const lau = getLengthAndUnit(
                // eslint-disable-next-line no-nested-ternary
                _getTopMargin
                    ? parseInt(windowStyle.height, 10)
                        ? `${clientHeight}px`
                        : windowStyle.maxHeight
                    : parseInt(windowStyle.maxWidth, 10)
                    ? windowStyle.maxWidth
                    : windowStyle.width
            );

            if (lau.len) {
                return -(lau.len / 2) + lau.unit;
            }
            return '';
        },

        _setAttachMargin() {
            if (this.withArrow && !this._arrowSizeAdded) {
                const { dAttachMargin } = this;

                getComputedStyle(this.$refs.arrow, this._arrowSize, true);

                dAttachMargin[0] += this._arrowSize.height;
                dAttachMargin[1] += this._arrowSize.width;
                dAttachMargin[2] += this._arrowSize.height;
                dAttachMargin[3] += this._arrowSize.width;

                this._arrowSizeAdded = true;
            }
        },

        _updateStyle(_css) {
            this.style = {
                ...this.style,
                ..._css,
            };
        },

        _getAlignment() {
            let alignment = ['lt', 'lb'];
            let { attachPosition } = this;
            let pos;

            if (attachPosition) {
                if (attachPosition.indexOf('auto') > -1) {
                    if (this.attachToPoint) {
                        pos = getAttachPositionByRects(getElemRect(this.$el), {
                            width: 1,
                            height: 1,
                            left: this.attachToPoint[0],
                            top: this.attachToPoint[1],
                        });
                    } else if (this.attachTo) {
                        pos = getAttachPosition(this.$el, document.querySelector(this.attachTo));
                    }

                    attachPosition = getAutoAttachPosition(pos, attachPosition, this.preferredAttachPosition);
                }

                alignment = getAlignment(attachPosition);
            }

            if (this.withArrow) {
                if (alignment[0].charAt(1) === 'b' && alignment[1].charAt(1) === 't') {
                    this.arrowDir = 'down';
                } else if (alignment[0].charAt(1) === 't' && alignment[1].charAt(1) === 'b') {
                    this.arrowDir = 'up';
                } else if (alignment[0].charAt(0) === 'l' && alignment[1].charAt(0) === 'r') {
                    this.arrowDir = 'left';
                } else {
                    this.arrowDir = 'right';
                }
            }

            return alignment;
        },

        isWindowVisible() {
            return this.isVisible;
        },

        /**
         * @return {boolean}
         */
        isChildWindowOpened() {
            /*const openedWindow = this.findChildByName('FWindow', false, (_component) => _component.isVisible);

            return !!openedWindow;*/
            return false;
        },

        containsDescendant(_event) {
            return _event.target.closest(`[data-code="${this.descendantsCode}"]`) !== null;
        },

        onWindowResize() {
            if (this.isVisible) {
                if (this.hideOnDocumentResize) {
                    this.hide();
                } /* else {
                    this.correctPositionAndSize();
                }*/
            }
        },

        /**
         * @param {MouseEvent} _event
         */
        onWindowMousedown(_event) {
            if (
                this.isVisible &&
                this.hideOnDocumentMousedown &&
                !_event.target.closest(`#${this.id}`) &&
                !this.isChildWindowOpened() &&
                !this.containsDescendant(_event)
            ) {
                this.hide();
            }
        },

        onDocumentScroll() {
            if (this.isVisible && this.correctPosOnScroll) {
                this.correctPositionAndSize();
            }

            if (this.hideOnDocumentScroll) {
                this.hide();
            }
        },

        /**
         * Called by ResizeObserver when FWindow is resized.
         */
        onResize() {
            if (this.isVisible && !(this._showAnimInProgress || this._hideAnimInProgress)) {
                this.correctPositionAndSize();
            }
        },

        onOverlayHide(_hiddenByClick) {
            this.hide('', true, _hiddenByClick);
        },

        /*onBeforeOverlayHide(_payload) {
            if (this.checkComponentsChange && isAnyComponentChanged(this, this.translate('componentChangeMessages'))) {
                _payload.preventDefault = true;
            }
        },*/

        onControlsClick(_event) {
            if (_event.target.closest('.close-btn')) {
                this.hide();
            }
        },

        onKeyup(_event) {
            if (this.hideOnEscapeKey) {
                if (isKey('Escape', _event)) {
                    this.hide();
                }
            }
        },

        onKeydown(_event) {
            focusTrap(_event, this.$el, this._firstLastFocusables);
        },

        onAfterEnterAnim() {
            this._showAnimInProgress = false;
        },

        onAfterLeaveAnim() {
            if (!this._hideAnimInProgress) {
                return;
            }

            this._hideAnimInProgress = false;
            this.animated = false;
            this.isMounted = false;

            nextTick(() => {
                this.animated = true;
            });
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

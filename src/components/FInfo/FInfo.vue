<template>
    <span class="finfo" @click="onClick" :data-testid="dataTestid">
        <!-- @slot Default to `FButton` -->
        <slot name="button">
            <FButton :tertiary="tertiary" :round="round" v-bind="$attrs" :id="dButtonId" :title="cButtonTitle">
                <!-- @slot Default to info icon -->
                <slot name="button-content">
                    <FSvgIcon :size="iconSize"><IconInfoCircle /></FSvgIcon>
                </slot>
            </FButton>
        </slot>

        <template v-if="!usePopup">
            <FPopover
                v-if="windowCreated"
                ref="window"
                :hide-on-document-mousedown="hideOnDocumentMousedown"
                v-bind="$attrs"
                :attach-to="`#${dButtonId}`"
                :class="windowClass"
                :style="windowStyle"
                @window-hide="$emit('window-hide', $event)"
            >
                <!-- @slot Default to popover content -->
                <slot></slot>
            </FPopover>
        </template>
        <template v-else>
            <FWindow
                v-if="windowCreated"
                ref="window"
                v-bind="$attrs"
                :class="windowClass"
                :style="windowStyle"
                @window-hide="$emit('window-hide', $event)"
            >
                <!-- @slot Default to window content -->
                <slot></slot>
            </FWindow>
        </template>
    </span>
</template>

<script>
import { getUniqueId } from '../../utils';
import FButton from '../FButton/FButton.vue';
import FPopover from '../FPopover/FPopover.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import { translationsMixin } from '../../mixins/translations.js';
import IconInfoCircle from '../icons/IconInfoCircle.vue';
import FWindow from '../FWindow/FWindow.vue';

/**
 * Component for showing info text.
 * The given attributes are also passed to the child components `FButton` and `FPopover` or `FWindow`
 */
export default {
    name: 'FInfo',

    components: { FWindow, IconInfoCircle, FSvgIcon, FPopover, FButton },

    mixins: [translationsMixin],

    emits: ['click', 'window-hide'],

    inheritAttrs: false,

    props: {
        /** Use popup window instead of popover. */
        usePopup: {
            type: Boolean,
            default: false,
        },
        /** Css class added to FPopover or FWindow component */
        windowClass: {
            type: String,
            default: '',
        },
        /** Style added to FPopover or FWindow component */
        windowStyle: {
            type: Object,
            default() {
                return {};
            },
        },
        /** Button's title */
        buttonTitle: {
            type: String,
            default: '',
        },
        /** Size of default icon */
        iconSize: {
            type: String,
            default: '16px',
        },
        /**  */
        showPopover: {
            type: Boolean,
            default: true,
        },
        /** Unique id */
        buttonId: {
            type: String,
            default: '',
        },

        /** Hide window on browser window mousedown. */
        hideOnDocumentMousedown: {
            type: Boolean,
            default: true,
        },
        /** Specifies that button is styled as a secondary button */
        tertiary: {
            type: Boolean,
            default: true,
        },
        /** Specifies that the button has the same width and height and is rounded */
        round: {
            type: Boolean,
            default: true,
        },
        dataTestid: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            windowCreated: false,
            dButtonId: this.buttonId || getUniqueId(),
        };
    },

    computed: {
        cButtonTitle() {
            return this.buttonTitle || this.translate('finfo.moreInfo');
        },
    },

    methods: {
        async onClick(event) {
            const payload = { preventDefault: false };

            this.$emit('click', event, payload);

            if (!payload.preventDefault) {
                if (!this.windowCreated) {
                    this.windowCreated = true;

                    this.$nextTick(() => {
                        this.$refs.window.show();
                    });
                } else {
                    this.$refs.window.show();
                }
            }
        },
    },
};
</script>

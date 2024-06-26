<template>
    <button class="fbutton btn" v-bind="buttonProps" :disabled="cDisabled" :class="classes">
        <span class="fbutton_label">
            <slot>{{ label }}</slot>
        </span>
    </button>
</template>

<script>
import { buttonMixin } from '../../mixins/button.js';
import { getElemRect } from '../../utils/DOM.js';

/**
 * Button wrapper
 */
export default {
    name: 'FButton',

    mixins: [buttonMixin],

    props: {
        /**
         * Size of the button
         *
         * @type {('large' | 'small' | 'mini')}
         */
        size: {
            type: String,
            default: '',
            validator: function (_value) {
                return ['', 'large', 'small', 'mini'].indexOf(_value) !== -1;
            },
        },
        /** Button's label */
        label: {
            type: String,
            default: '',
        },
        /** Button's style. Alternative to `secondary` and `tertiary` props */
        btnType: {
            type: String,
            default: '',
            validator: function (_value) {
                return ['', 'primary', 'secondary', 'tertiary', 'quaternary'].indexOf(_value) !== -1;
            },
        },
        /** Specifies that button is styled as a secondary button */
        secondary: {
            type: Boolean,
            default: false,
        },
        /** Specifies that button is styled as a tertiary button */
        tertiary: {
            type: Boolean,
            default: false,
        },
        /** Specifies that button is styled as a quaternary button */
        quaternary: {
            type: Boolean,
            default: false,
        },
        /** Specifies that the button has the same width and height and is rounded */
        round: {
            type: Boolean,
            default: false,
        },
        /** Specifies that the button has the same width and height */
        sameSize: {
            type: Boolean,
            default: false,
        },
        hovered: {
            type: Boolean,
            default: false,
        },
        /** Disabled but with style of normal button */
        semiDisabled: {
            type: Boolean,
            default: false,
        },
        /** Not disabled but with style of disabled button */
        likeDisabled: {
            type: Boolean,
            default: false,
        },
        /** Show loading indicator (spinner) */
        loading: {
            type: Boolean,
            default: false,
        },
        /** Don't disable button while `loading` is `true` */
        notDisableWhileLoading: {
            type: Boolean,
            default: false,
        },
        /** Hide label while `loading` is `true` */
        noLabelWhileLoading: {
            type: Boolean,
            default: false,
        },
        /** Use custom spinner defined with `--fbutton-spinner` custom property */
        useCustomSpinner: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            val: this.value,
            isInvalid: this.invalid,
            errmsgslot: 'suffix',
            ariaDescribedBy: null,
            isLoading: false,
            inputId: `${this.id}-f-inp`,
        };
    },

    computed: {
        classes() {
            const { size, btnType } = this;

            return {
                'btn-secondary':
                    (this.secondary && btnType !== 'primary' && btnType !== 'tertiary' && btnType !== 'quaternary') ||
                    btnType === 'secondary',
                'btn-tertiary':
                    (this.tertiary && btnType !== 'primary' && btnType !== 'secondary' && btnType !== 'quaternary') ||
                    btnType === 'tertiary',
                'btn-quaternary':
                    (this.quaternary && btnType !== 'primary' && btnType !== 'secondary' && btnType !== 'tertiary') ||
                    btnType === 'quaternary',
                'btn-lg': size === 'large',
                'btn-sm': size === 'small',
                'btn-xs': size === 'mini',
                'btn-round': this.round,
                'btn-samesize': this.sameSize || this.round,
                'btn-hovered': this.hovered,
                'btn-semi-disabled': this.semiDisabled,
                'btn-like-disabled': this.likeDisabled,
                'fbutton-loading': this.isLoading,
                'fbutton-customspinner': this.useCustomSpinner,
                'fbutton-nolabel': this.noLabelWhileLoading,
            };
        },

        cDisabled() {
            return this.disabled || this.semiDisabled || (this.loading && !this.notDisableWhileLoading);
        },
    },

    watch: {
        loading(value) {
            this.setMinWidth(value);
            this.isLoading = value;
        },
    },

    mounted() {
        if (this.loading) {
            this.setMinWidth(true);
            this.isLoading = true;
        }
    },

    methods: {
        setMinWidth(loading) {
            const { $el } = this;
            let elRect = null;

            if (this.noLabelWhileLoading) {
                if (loading) {
                    elRect = getElemRect($el);
                }

                $el.style.minWidth = elRect ? `${elRect.width}px` : '';
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

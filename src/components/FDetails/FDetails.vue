<template>
    <details class="fdetails" :open="dOpened || undefined" :class="classes">
        <summary @click.prevent="onSummaryClick">
            <slot name="summary">
                <span class="fdetails_summary">
                    <span class="fdetails_label">
                        <!-- @slot Default to `label` prop -->
                        <slot name="label">
                            {{ label }}
                        </slot>
                    </span>
                    <span class="fdetails_icon">
                        <!-- @slot Default to `icon-angle-left` icon -->
                        <slot name="icon">
                            <FSvgIcon size="16px" rotate="180deg" class="fsvgicon-rtl-mirror">
                                <IconAngleLeft />
                            </FSvgIcon>
                        </slot>
                    </span>
                </span>
            </slot>
        </summary>

        <FHeightTransition @transition-end="onTransitionEnd" :disabled="!animate">
            <div v-if="create" v-show="render" class="fdetails_content_wrap" data-testid="content_wrap">
                <div class="fdetails_content">
                    <slot></slot>
                </div>
            </div>
        </FHeightTransition>
    </details>
</template>

<script>
import FHeightTransition from '../FHeightTransition/FHeightTransition.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';

/**
 * Wrapper component for `<details>` element with support for open/close animation.
 */
export default {
    name: 'FDetails',

    components: { IconAngleLeft, FSvgIcon, FHeightTransition },

    emits: ['toggle'],

    props: {
        /** Specifies if component is collapsed or not */
        open: {
            type: Boolean,
            default: false,
        },
        /** Label */
        label: {
            type: String,
            default: '',
        },
        /** Disable opening/hiding */
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Use content and icon animation */
        animate: {
            type: Boolean,
            default: false,
        },
        /**
         * 'render' - render content inside component, event if component is in 'closed' state (v-show)
         * 'create' - if initial state is 'closed', render content when component is opened for the first time (v-if, v-show)
         * 'create-destroy' - render content when component is opened, destroy content when component is closed (v-if)
         */
        strategy: {
            type: String,
            default: 'render',
            validator: function (_value) {
                return ['render', 'create', 'create-destroy'].indexOf(_value) !== -1;
            },
        },
        /** Use 'flat' style */
        flat: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            opened: this.open,
            dOpened: this.open,
            create: this.open || this.strategy === 'render',
            render: this.open || this.strategy === 'render',
        };
    },

    computed: {
        classes() {
            return {
                'fdetails-open': this.opened,
                'fdetails-disabled': this.disabled,
                'fdetails-animate': this.animate,
                'fdetails-flat': this.flat,
            };
        },
    },

    watch: {
        open(value) {
            this.opened = value;
            this.dOpened = value;

            if (value) {
                this.render = true;
            }
        },
    },

    mounted() {
        this.$nextTick(() => {
            if (!this.open && this.strategy === 'render' && this.animate) {
                this.render = false;
            }
        });
    },

    methods: {
        onSummaryClick() {
            if (this.disabled) {
                return;
            }

            this.opened = !this.opened;

            this.create = true;

            this.$nextTick(() => {
                this.render = this.opened;

                if (this.opened) {
                    this.dOpened = true;
                    /**
                     * Triggers when component changes open/close state
                     *
                     * @property {boolean} opened
                     */
                    this.$emit('toggle', true);
                }
            });
        },

        onTransitionEnd(type) {
            if (type === 'leave') {
                this.dOpened = false;
                if (this.strategy === 'create-destroy') {
                    this.create = false;
                }
                /**
                 * Triggers when component changes open/close state
                 *
                 * @property {boolean} opened
                 */
                this.$emit('toggle', false);
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

<template>
    <span class="fdatetimefield" :data-testid="dataTestid">
        <slot name="top" v-bind="slotProps">
            <FLabel v-if="label" native :id="labeledById" :label="label" :required="required" />
        </slot>
        <span class="fdatetimefield_cont" :class="inpClasses">
            <input
                ref="date"
                type="date"
                v-bind="inputProps"
                :id="labeledById"
                @input="onDateInput"
                class="inp-nostyle fdatetimefield_date"
            />
            <input
                ref="time"
                type="time"
                v-bind="inputProps"
                @input="onTimeInput"
                class="inp-nostyle fdatetimefield_time"
                :aria-label="valueOrNull(label)"
            />
        </span>
        <slot name="bottom" v-bind="slotProps">
            <div v-if="validationState.errors.length > 0">
                <component
                    :is="
                        typeof errorMessagesComponent === 'object'
                            ? errorMessagesComponent.name
                            : errorMessagesComponent
                    "
                    :errors-cont-id="errorMsgId"
                    :errors="validationState.errors"
                    :input-cont-id="dInputContId"
                    v-bind="{ ...(typeof errorMessagesComponent === 'object' ? errorMessagesComponent.props : {}) }"
                />
            </div>
            <div v-else-if="infoText">
                <FInfoText :text="infoText" :info-text-id="infoTextId" />
            </div>
        </slot>
    </span>
</template>

<script>
import { formInputMixin } from '../../mixins/form-input.js';
import FLabel from '../FLabel/FLabel.vue';
import FErrorMessages from '../FErrorMessages/FErrorMessages.vue';
import FInfoText from '../FInfoText/FInfoText.vue';
import { valueOrNull } from '../../utils/vue-helpers.js';

export default {
    name: 'FDatetimeField',

    components: { FInfoText, FErrorMessages, FLabel },

    inheritAttrs: false,

    mixins: [formInputMixin],

    emits: ['update:value'],

    props: {
        value: {
            type: [String, Number, Boolean, Object, Date, Array],
            default: '',
        },
        /** Size of input, 'large' | 'small' */
        fieldSize: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        /** Throttle onInput callback interval in milliseconds */
        throttleInputInterval: {
            type: Number,
            default: 0,
        },
        /** Validate on input event as well */
        validateOnInput: {
            type: Boolean,
            default: false,
        },
        hideInfoOnError: {
            type: Boolean,
            default: false,
        },
        /** Don't style FInput as input field */
        noStyle: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
        dataTestid: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            inputValue: '',
        };
    },

    computed: {
        inpClasses() {
            return {
                'inp-invalid': this.validationState.invalid || this.invalid,
                'inp-lg': this.fieldSize === 'large',
                'inp-sm': this.fieldSize === 'small',
                'inp-xs': this.fieldSize === 'mini',
                'inp-readonly': this.readonly,
                'inp-disabled': this.disabled,
                inp: !this.noStyle,
                'inp-cont': true,
            };
        },

        inputProps() {
            return {
                disabled: valueOrNull(this.disabled),
                invalid: valueOrNull(this.invalid),
                validateOnInput: valueOrNull(this.validateOnInput),
                hideInfoOnError: valueOrNull(this.hideInfoOnError),
            };
        },
    },

    watch: {
        value: {
            handler(value) {
                const oldValue = this.inputValue;

                this.inputValue = this.formatIn(value);

                if (this.inputValue) {
                    const spl = this.inputValue.trim().split('T');

                    if (spl.length === 2) {
                        this.$nextTick(() => {
                            this.$refs.date.value = spl[0];
                            this.$refs.time.value = spl[1];
                        });
                    }
                }

                if (this.validateOnInput && oldValue !== value) {
                    this.validate();
                }
            },
            immediate: true,
        },

        inputValue(value) {
            this.$emit('update:value', this.formatOut(value));
        },
    },

    methods: {
        setValue() {
            const { $refs } = this;
            const date = $refs.date.value;
            const time = $refs.time.value;

            if (date && time) {
                this.inputValue = this.formatIn(`${date}T${time}`);

                if (this.validateOnChange || this.validateOnInput) {
                    this.validate();
                }
            }
        },

        onDateInput() {
            this.setValue();
        },

        onTimeInput() {
            this.setValue();
        },

        valueOrNull,
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

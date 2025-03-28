<template>
    <label class="foption cr" :class="classes" v-on="{ click: handleShiftClick && onLabelClick }">
        <input
            v-bind="checkboxProps"
            :type="type"
            :checked="cChecked"
            :value="value"
            :aria-invalid="invalid"
            :aria-label="hideLabel ? label : null"
            class="cr_input"
            @change="onChange"
        />
        <slot name="check-element"><span class="cr_check"></span></slot>
        <span v-if="!hideLabel" class="cr_label">
            <slot v-bind="slotProps">{{ label }}</slot>
        </span>
    </label>
</template>

<script>
import { checkboxMixin } from '../../mixins/checkbox.js';
import { isArray } from '../../utils/index.js';

/**
 * Checkbox and radio button wrapper
 */
export default {
    name: 'FOption',

    mixins: [checkboxMixin],

    emits: ['update:modelValue'],

    props: {
        /**
         * Type of option
         *
         * @type {('checkbox' | 'radio')}
         */
        type: {
            type: String,
            default: 'checkbox',
            validator: function (_value) {
                return ['checkbox', 'radio'].indexOf(_value) !== -1;
            },
        },
        modelValue: {
            default: '',
        },
        /**
         * Size of option
         *
         * @type {('large' | 'small' | 'mini')}
         */
        optionSize: {
            type: String,
            default: '',
            validator: function (_value) {
                return ['', 'large', 'small', 'mini'].indexOf(_value) !== -1;
            },
        },
        /**
         * Specifies, what value will return when checkbox is checked.
         */
        trueValue: {
            default: true,
        },
        /**
         * Specifies, what value will return when checkbox is unchecked.
         */
        falseValue: {
            default: false,
        },
        hideLabel: {
            type: Boolean,
            default: false,
        },
        handleShiftClick: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            val: '',
        };
    },

    computed: {
        classes() {
            const { optionSize } = this;
            const { type } = this;

            return {
                'cr-checkbox': type === 'checkbox',
                'cr-radio': type === 'radio',
                'cr-lg': optionSize === 'large',
                'cr-sm': optionSize === 'small',
                'cr-xs': optionSize === 'mini',
                'cr-invalid': this.invalid,
            };
        },

        cChecked() {
            if (this.type === 'radio') {
                return this.checked || this.modelValue === this.value;
            } else {
                if (isArray(this.modelValue)) {
                    return this.modelValue.indexOf(this.value) > -1;
                }

                return this.checked || this.modelValue === this.trueValue;
            }
        },

        slotProps() {
            return {
                label: this.label,
            };
        },
    },

    methods: {
        onChange(_event) {
            const checked = _event.target.checked;

            if (this.type === 'radio') {
                this.$emit('update:modelValue', this.value);
            } else {
                if (isArray(this.modelValue)) {
                    let value = [...this.modelValue];

                    if (checked) {
                        value.push(this.value);
                    } else {
                        value.splice(value.indexOf(this.value), 1);
                    }

                    this.$emit('update:modelValue', value);
                } else {
                    this.$emit('update:modelValue', checked ? this.trueValue : this.falseValue);
                }
            }
        },

        onLabelClick(_event) {
            if (_event.shiftKey) {
                const checkbox = _event.target.closest('label').querySelector('input');

                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

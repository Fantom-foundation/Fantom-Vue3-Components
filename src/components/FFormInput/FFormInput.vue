<template>
    <div class="fforminput" :class="[clas, classType]">
        <FInput
            v-if="_fInputTypes.includes(type)"
            ref="input"
            :is-textarea="type === 'textarea'"
            :disabled="dDisabled"
            v-bind="{ ...$attrs, ...inputProps }"
            :type="type"
            :name="name"
            v-model:value="inputValue"
            @validation-state="onValidationState"
        >
            <template v-for="(index, name) in $slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </FInput>
        <template v-else-if="type === 'checkbox' || type === 'radio'">
            <FOption
                ref="input"
                :type="type"
                :disabled="dDisabled"
                v-bind="{ ...$attrs, ...inputProps }"
                :name="name"
                v-model="inputValue"
            >
                <template v-for="(index, name) in $slots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                </template>
            </FOption>
        </template>
        <FOptionGroup
            v-else-if="type === 'checkboxgroup' || type === 'radiogroup'"
            ref="input"
            :type="type === 'checkboxgroup' ? 'checkbox' : 'radio'"
            :disabled="dDisabled"
            v-bind="{ ...$attrs, ...inputProps }"
            :name="name"
            v-model:checked="inputValue"
            ignore-first-change
            @validation-state="onValidationState"
        >
            <template v-for="(index, name) in $slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </FOptionGroup>
        <component
            v-else
            :is="getComponentName(type)"
            ref="input"
            :disabled="dDisabled"
            v-bind="{ ...$attrs, ...inputProps }"
            :name="name"
            v-model:value="inputValue"
            v-model:checked="inputValue"
            @validation-state="onValidationState"
        >
            <template v-for="(index, name) in $slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </component>
    </div>
</template>

<script>
import FOption from '../FOption/FOption.vue';
import { clone, cloneObject } from '../../utils/index.js';
import FInput from '../FInput/FInput.vue';
import FDropdownListbox from '../FDropdownListbox/FDropdownListbox.vue';
import FSelect from '../FSelect/FSelect.vue';
import FListbox from '../FListbox/FListbox.vue';
import FOptionGroup from '../FOptionGroup/FOptionGroup.vue';
import FPasswordField from '../FPasswordField/FPasswordField.vue';
import FSlider from '../FSlider/FSlider.vue';
import FToggleButton from '../FToggleButton/FToggleButton.vue';
import FComboBox from '../FComboBox/FComboBox.vue';
import FDatetimeField from '../FDatetimeField/FDatetimeField.vue';

const fInputTypes = ['text', 'textarea', 'number', 'email', 'date', 'datetime-local', 'time', 'search', 'url', 'tel'];
/*
const types = [
    ...fInputTypes,
    'select',
    'dropdownlistbox',
    'checkbox',
    'checkboxgroup',
    'radio',
    'radiogroup',
    'listbox',
    'passwordfield',
    'slider',
    'toggle',
    'combobox',
    'datetime',
];
*/

/**
 * Wrapper for form inputs (based on form-input mixin) intended to be used in `FForm` component.
 */
export default {
    name: 'FFormInput',

    components: {
        FSlider,
        FOptionGroup,
        FListbox,
        FSelect,
        FDropdownListbox,
        FInput,
        FOption,
        FPasswordField,
        FToggleButton,
        FComboBox,
        FDatetimeField,
    },

    emits: ['update:modelValue'],

    inheritAttrs: false,

    inject: ['elements', 'elementStates', 'lastChangedElement', 'validations'],

    props: {
        type: {
            // type: String,
            default: 'text',
            /*validator: function (_value) {
                return types.indexOf(_value) !== -1 || !!_value;
            },*/
        },
        name: {
            type: String,
            default: '',
        },
        modelValue: {},
        /** Css class to be added to the root element */
        clas: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            inputValue: this.modelValue || this.getInitialValue(),
            inputProps: {},
            dDisabled: this.disabled,
        };
    },

    computed: {
        willValidate() {
            const { input } = this.$refs;

            return input ? typeof input.validate === 'function' : false;
        },

        classType() {
            const { type } = this;

            return typeof type === 'string' ? `fforminput_${type}` : '';
        },
    },

    watch: {
        inputValue(_value, _oldValue) {
            this._firstChange = false;

            if (_value !== undefined) {
                this._oldInputValue = clone(_oldValue);
                // this.$emit('input', _value);
                this.$emit('update:modelValue', _value);
                if (this.name && this.elements.elements) {
                    this.elements.elements[this.name] = _value;
                }
            }
        },

        modelValue(_value) {
            this.inputValue = _value;
        },

        'elements.reset': function (_value) {
            if (_value && this.name) {
                this._setElementValue();
            }
        },

        'elements.elements': {
            handler(_value) {
                const { name } = this;
                const { lastChangedElement } = this;

                if (_value && name && name in _value) {
                    const valStr = JSON.stringify(_value[name]);

                    if (valStr !== JSON.stringify(this._oldInputValue) || valStr !== JSON.stringify(this.inputValue)) {
                        // if (JSON.stringify(_value[name]) !== JSON.stringify(this._oldInputValue)) {
                        if (!this._firstChange) {
                            lastChangedElement.name = name;
                            lastChangedElement.value = clone(_value[name]);
                            lastChangedElement.oldValue = clone(this._oldInputValue);

                            this._updateValidationState(cloneObject(lastChangedElement));
                        }

                        this.inputValue = clone(_value[name]);

                        this._firstChange = false;
                    }

                    this._oldInputValue = clone(_value[name]);
                }
            },
            deep: true,
        },

        ['validations.check'](check) {
            if (check) {
                this.validations.validationPromises.push(this.validate());
            }
        },

        ['elements.disable'](disable) {
            if (!this._disabled) {
                this.dDisabled = disable;
            }
        },
    },

    created() {
        /** Array of allowed types for FInput component */
        this._fInputTypes = fInputTypes;
        /** Previous value of the component */
        this._oldInputValue = '';
        /** Signals first change of the component */
        this._firstChange = true;
        this._disabled = this.disabled;

        if (this.name) {
            this._setElementValue();
            this.elementStates[this.name] = {};
            // this.$set(this.elementStates, this.name, {});
        }
    },

    beforeUnmount() {
        if (this.name) {
            delete this.elements.elements[this.name];
            // this.$delete(this.elements.elements, this.name);
        }
    },

    methods: {
        /**
         * @return {Promise<null|*>}
         */
        async validate() {
            const { input } = this.$refs;

            return input && typeof input.validate === 'function' ? input.validate() : undefined;
        },

        /**
         * Get component name by type.
         *
         * @param {string} _type
         * @return {string}
         */
        getComponentName(_type) {
            switch (_type) {
                case 'select':
                    return 'FSelect';
                case 'combobox':
                    return 'FComboBox';
                case 'dropdownlistbox':
                    return 'FDropdownListbox';
                case 'listbox':
                    return 'FListbox';
                case this._fInputTypes.indexOf(_type) > -1:
                case 'textarea':
                    return 'FInput';
                case 'checkbox':
                case 'radio':
                    return 'FOption';
                case 'checkboxgroup':
                case 'radiogroup':
                    return 'FOptionGroup';
                case 'passwordfield':
                    return 'FPasswordField';
                case 'datetime':
                    return 'FDatetimeField';
                case 'slider':
                    return 'FSlider';
                case 'toggle':
                    return 'FToggleButton';
            }

            return _type;
        },

        getValidationState() {
            const { input } = this.$refs;

            return input && input.validationState ? cloneObject(input.validationState) : {};
        },

        getEmptyValue() {
            switch (this.type) {
                case 'checkbox':
                case 'radio':
                    return false;
                case 'checkboxgroup':
                case 'radiogroup':
                    return [];
                default:
                    return '';
            }
        },

        getInitialValue() {
            return this.name in this.elements.elements ? this.elements.elements[this.name] : this.getEmptyValue();
        },

        _updateValidationState(_data) {
            this.elementStates[this.name] = {
                ...(this.elementStates[this.name] || {}),
                ..._data,
            };
        },

        _setElementValue() {
            let value = this.modelValue;

            if (value === undefined) {
                value = this.getInitialValue();
            }

            if (!value && value !== null) {
                value = this.inputValue;
            }

            // this.$set(this.elements.elements, this.name, this.modelValue || this.getInitialValue());
            // this.$set(this.elements.elements, this.name, this.modelValue || this.getInitialValue() || this.inputValue);

            this.elements.elements[this.name] = value;
            // this.$set(this.elements.elements, this.name, value);
        },

        onValidationState(_data) {
            this._updateValidationState(cloneObject(_data));
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

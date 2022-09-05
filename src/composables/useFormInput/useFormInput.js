import { ref, computed } from 'vue';
import { requiredValidator } from '../../utils/validators/validators.js';
import { getUniqueId, isArray } from '../../utils/index.js';
import { FAriaAlert } from '../../components/index.js';

export function formInputProps() {
    return {
        /**
         * Custom validator function.
         * If return value is `true`, `errorMessage` will be displayed.
         * If returns non-empty string, the string will be displayed as an error message.
         * If returns non-empty array, all error messages in the array will be displayed.
         * Can return also Promise (asynchronous validation) or array of error messages.
         * @param {*} _value
         */
        validator: {
            type: Function,
            default: null,
        },
        /**
         * Validator for required field.
         * @param {*} _value
         */
        requiredValidator: {
            type: Function,
            default: requiredValidator,
        },
        /** Validate on change or input event */
        validateOnChange: {
            type: Boolean,
            default: false,
        },
        /** To presentation format */
        inFormatter: {
            type: Function,
            default: null,
        },
        /** From presentation format */
        outFormatter: {
            type: Function,
            default: null,
        },
        /** Error message to be displayed when validation fails */
        errorMessage: {
            type: String,
            default: '',
        },
        /** Additional information text besides label */
        infoText: {
            type: String,
            default: '',
        },
        /** Id (or ids separated by space) of element(s) that represents label for the component */
        labeledBy: {
            type: String,
            default: '',
        },
        /** Hide label element */
        noLabel: {
            type: Boolean,
            default: false,
        },
        /**
         * Id (or ids separated by space) of element(s) that represents description (besided label) for the component
         */
        describedBy: {
            type: String,
            default: '',
        },
        /** Id (or ids separated by space) of element(s) that represents control (aria-controls) for the component */
        controlsId: {
            type: String,
            default: '',
        },
        ariaAutocomplete: {
            type: String,
            default: '',
        },
        ariaActivedescendant: {
            type: String,
            default: '',
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        /**
         * Component to be used for displaying error messages.
         * String (component name) or object {name: string, props: object}.
         */
        errorMessagesComponent: {
            type: [String, Object],
            default: 'FErrorMessages',
        },
        /**
         * Component to be used for displaying info text in a form input element.
         * String (component name) or object {name: string, props: object}.
         */
        infoTextComponent: {
            type: [String, Object],
            default: 'FInfoText',
        },
        /** */
        inputContId: {
            type: String,
            default: '',
        },
        /** */
        required: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    };
}

export function useFormInput(props = {}, emit) {
    if (!props || !emit) {
        throw new Error('Need props and emit');
    }

    // refs
    const inputValue = ref(formatIn(props.value !== undefined ? props.value : ''));
    /** Identifies what represents empty value of form input component */
    const emptyValue = ref('');
    const validationState = ref({
        valid: props.invalid ? !props.invalid : true,
        invalid: props.invalid ? !!props.invalid : false,
        pending: false,
        validated: false,
        errors: [],
    });
    const labeledById = ref(props.labeledBy || getUniqueId());
    const infoTextId = ref(getUniqueId());
    const errorMsgId = ref(getUniqueId());
    const dInputContId = ref(props.inputContId || getUniqueId());

    /** @type {Promise} */
    let pendingValidation = null;
    /** Helper */
    let pendingValue = '';

    /**
     * Object passed to slots
     *
     * @returns {{labeledById: (String|string), label: formInputMixin.computed.label}}
     */
    const slotProps = computed(() => ({
        labeledById: labeledById.value,
        label: props.label,
        infoText: props.infoText,
        validationState: validationState.value,
        errorMsgId: errorMsgId.value,
        infoTextId: infoTextId.value,
        required: props.required,
    }));

    /**
     * Use in component's `aria-describedby` attribute
     *
     * @returns {string|null}
     */
    const ariaLabeledByIds = computed(() => {
        const ids = [];

        if (props.label) {
            ids.push(labeledById.value);
        }

        if (props.labeledBy) {
            ids.push(props.labeledBy);
        }

        return ids.length > 0 ? ids.join(' ') : null;
    });

    /**
     * Use in component's `aria-describedby` attribute
     *
     * @returns {string|null}
     */
    const ariaDescribedByIds = computed(() => {
        const ids = [];

        if (props.describedBy) {
            ids.push(props.describedBy);
        }

        if (props.infoText) {
            ids.push(infoTextId.value);
        }

        if (validationState.value.errors.length > 0) {
            ids.push(errorMsgId.value);
        }

        return ids.length > 0 ? ids.join(' ') : null;
    });

    /**
     * @param {function} [_validator]
     * @return {Promise<null|*>}
     */
    async function validate(_validator) {
        const validator = _validator || props.validator;
        const validationSte = { ...validationState.value };
        const validatorExists = typeof validator === 'function';
        let errorMsgs = [];
        let invalid = false;
        let result;

        if (validatorExists) {
            if (pendingValidation) {
                return pendingValidation;
            }

            result = validator(inputValue.value);

            if (result instanceof Promise) {
                pendingValidation = result;
                validationSte.pending = true;

                // store current value
                pendingValue = inputValue.value;

                await changeValidationState(validationSte);

                try {
                    result = await result;

                    // if current value is different than pending value, validate again
                    if (pendingValue !== inputValue.value) {
                        pendingValue = '';
                        pendingValidation = null;

                        this.validate(_validator);

                        return;
                    }
                } catch (_error) {
                    pendingValidation = null;
                    validationSte.pending = false;
                    validationSte.errors = [_error];

                    await changeValidationState(validationSte);

                    throw _error;
                }
            }

            invalid = isArray(result) ? result.length > 0 : !!result;

            if (isArray(result)) {
                errorMsgs = result;
            } else if (typeof result === 'string') {
                errorMsgs = result ? [result] : [];
            } else {
                errorMsgs = invalid ? [this.errorMessage] : [];
            }

            pendingValidation = null;
        }

        if (props.required) {
            result = props.requiredValidator(inputValue.value);

            if (result) {
                errorMsgs.push(result);
            }

            if (!invalid) {
                invalid = !!result;
            }
        }

        if (validatorExists || props.required) {
            setValidationState({ validationState: validationSte, errorMessages: errorMsgs, invalid });
            await changeValidationState(validationSte);
        }
    }

    function setValidationState({ validationState = {}, errorMessages = [], invalid = false }) {
        validationState.errors = [...errorMessages];
        validationState.invalid = invalid;
        validationState.valid = !invalid;
        validationState.pending = false;
        validationState.validated = true;
    }

    /**
     * @param {object} _validationState
     */
    async function changeValidationState(_validationState) {
        const { errors } = _validationState;

        if (!props.validateOnInput && errors && errors.length > 0) {
            // const { activeElement } = document;

            // if (activeElement && this.id && activeElement.closest(`#${this.id}`) === null) {
            await FAriaAlert.clear();
            for (let i = 0, len = errors.length; i < len; i++) {
                await FAriaAlert.append(errors[i]);
            }
            // }
        }

        validationState.value = { ..._validationState };
        emit('validation-state', _validationState);
    }

    /**
     * @param {*} _value
     * @returns {*}
     */
    function formatIn(_value) {
        if (typeof props.inFormatter === 'function') {
            return props.inFormatter(_value);
        }

        return _value;
    }

    /**
     * @param {*} _value
     * @returns {*}
     */
    function formatOut(_value) {
        if (typeof props.outFormatter === 'function') {
            return props.outFormatter(_value);
        }

        return _value;
    }

    return {
        // refs
        inputValue,
        emptyValue,
        validationState,
        labeledById,
        infoTextId,
        errorMsgId,
        dInputContId,
        // computed
        slotProps,
        ariaLabeledByIds,
        ariaDescribedByIds,
        // functions
        validate,
        setValidationState,
        changeValidationState,
        formatIn,
        formatOut,
    };
}

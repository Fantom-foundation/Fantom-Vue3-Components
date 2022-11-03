<template>
    <form ref="form" method="post" class="fform" novalidate @submit="onSubmit" @reset="onReset">
        <slot v-bind="slotProps"></slot>
    </form>
</template>

<script>
import { cloneObject, objectEquals } from '../../utils/index.js';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';
import { nextTick } from 'vue';

/**
 * The component is intended to work only with the `FFormInput` components.
 */
export default {
    emits: ['element-change', 'submit', 'reset', 'update:formValues'],

    props: {
        /**
         * Text used before error list on form submit, if any form element error exist.
         * Text is invisible and read by screen readers.
         * `%n` will be replaced by actual number of error messages
         */
        formErrorText: {
            type: String,
            default: '%n form errors:',
        },
        values: {
            type: Object,
            default() {
                return {};
            },
        },
        formValues: {
            type: Object,
            default() {
                return null;
            },
        },
        /** Submit form when an element is changed */
        submitOnChange: {
            type: Boolean,
            default: false,
        },
        /** Call preventDefault() on form submit event */
        cancelSubmit: {
            type: Boolean,
            default: true,
        },
        /** Method `isChanged` returns always `false` */
        noChangeCheck: {
            type: Boolean,
            default: false,
        },
        /** Submit form only if form has been changed */
        submitIfChanged: {
            type: Boolean,
            default: false,
        },
        /** All form inputs will be disabled */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    provide() {
        return {
            elements: this.elements,
            // elements: this.elements,
            elementStates: this.elementStates,
            lastChangedElement: this.lastChangedElement,
            validations: this.validations,
        };
    },

    data() {
        return {
            submitting: null,
            // elements: this.formValues || { ...this.values },
            elements: {
                elements: this.formValues || { ...this.values },
                disable: false,
                reset: false,
            },
            elementStates: {},
            validations: {
                check: false,
                validationPromises: [],
            },
            errorMessages: [],
            pendingValidation: false,
            lastChangedElement: {
                name: '',
                value: '',
                oldValue: '',
            },
        };
    },

    computed: {
        slotProps() {
            return {
                lastChangedElement: this.lastChangedElement,
                elementStates: this.elementStates,
                pendingValidation: this.pendingValidation,
                errorMessages: this.errorMessages,
                disabled: this.disabled,
            };
        },
    },

    watch: {
        lastChangedElement: {
            handler(_value) {
                this.onElementChange(_value);
            },
            deep: true,
        },

        elementStates: {
            handler(_value) {
                const states = cloneObject(_value);

                this.pendingValidation = this.pendingValidationExists(states);
                this.errorMessages = this.collectErrors(states);

                if (this.errorMessages.length > 0) {
                    this.ariaReportErrors(this.errorMessages);
                }
            },
            deep: true,
        },

        disabled(_value) {
            if (_value) {
                this.disableElements();
            } else {
                this.enableElements();
            }
        },

        formValues(_value, _oldValue) {
            if (_value === _oldValue) {
                return;
            }

            if (_value) {
                this.elements.reset = false;

                this.$nextTick(() => {
                    this.elements.reset = true;
                    this.elements.elements = _value;

                    this.$nextTick(() => {
                        this.refreshInitValues();
                    });
                });
            } else {
                this.refreshInitValues();
            }
        },
    },

    created() {
        /** Initial values */
        this._initValues = {};
    },

    mounted() {
        if (this.disabled) {
            this.disableElements();
        }

        this.$nextTick(() => {
            this.refreshInitValues();
        });
    },

    methods: {
        /**
         * Submit form.
         */
        submit() {
            let eSubmitBtn = this.$refs.form.querySelector('[type="submit"]');

            if (!eSubmitBtn) {
                eSubmitBtn = this.createSubmitButton();
                this.$refs.form.appendChild(eSubmitBtn);
            }

            eSubmitBtn.click();
        },

        createSubmitButton() {
            const elem = document.createElement('button');

            elem.type = 'submit';
            elem.style.display = 'none';

            return elem;
        },

        /**
         * Reset form.
         */
        reset() {
            this.$refs.form.reset();
        },

        /**
         * Collect validation error messages from elements.
         *
         * @param {object} _elementStates
         * @return {array}
         */
        collectErrors(_elementStates) {
            let errors = [];

            Object.keys(_elementStates).forEach((_key) => {
                const elementState = _elementStates[_key];

                if (elementState.invalid) {
                    errors = errors.concat(elementState.errors);
                }
            });

            return errors;
        },

        /**
         * Check if a pending validation exits.
         *
         * @param {object} _elementStates
         * @return {boolean}
         */
        pendingValidationExists(_elementStates) {
            const keys = Object.keys(_elementStates);

            for (let i = 0, len1 = keys.length; i < len1; i++) {
                if (_elementStates[keys[i]].pending) {
                    return true;
                }
            }

            return false;
        },

        disableElements() {
            this.elements.disable = true;
        },

        enableElements() {
            this.elements.disable = false;
        },

        /**
         * Check form validity.
         *
         * @return {Boolean}
         */
        async checkValidity() {
            this.validations.check = true;

            await nextTick();

            try {
                // await for all promises to settle
                await Promise.all(this.validations.validationPromises);

                // this.pendingValidation = false;

                this.errorMessages = this.collectErrors(this.elementStates);

                // await this.ariaReportErrors(this.errorMessages);

                this.validations.check = false;
                this.validations.validationPromises = [];

                return this.errorMessages.length === 0;
            } catch (_error) {
                this.pendingValidation = false;
                this.errorMessages.push(_error);
                console.error(_error);

                this.validations.check = false;
                this.validations.validationPromises = [];

                return false;
            }
        },

        async ariaReportErrors(_errors = []) {
            if (_errors.length > 0) {
                await FAriaAlert.replace(`${this.formErrorText.replace('%n', _errors.length)} ${_errors.join(' ')}`);
            }
        },

        isChanged() {
            // return this.noChangeCheck ? false : !objectEquals(this._initValues, this.elements);
            return this.noChangeCheck ? false : !objectEquals(this._initValues, this.elements.elements);
        },

        getElements() {
            const fileLists = {};

            Object.keys(this.elements.elements).forEach((key) => {
                const value = this.elements.elements[key];
                if (value instanceof FileList) {
                    fileLists[key] = value;
                }
            });

            const elements = cloneObject(this.elements.elements);

            Object.keys(fileLists).forEach((key) => {
                elements[key] = fileLists[key];
            });

            return elements;
        },

        getLastChangedElement() {
            return cloneObject(this.lastChangedElement);
        },

        refreshInitValues() {
            this._initValues = this.getElements();
        },

        onElementChange(_value) {
            this.$emit('element-change', cloneObject(_value));

            if (this.submitOnChange) {
                this.submit();
            }
        },

        /**
         * Triggered on form submit.
         *
         * @param {Event} _event
         */
        async onSubmit(_event) {
            if (this.cancelSubmit) {
                _event.preventDefault();
            }

            if (this.submitIfChanged && !this.isChanged()) {
                return;
            }

            /** @type {function} */
            let resolveSubmitting = null;

            this.submitting = new Promise((resolve) => {
                resolveSubmitting = resolve;
            });

            try {
                const valid = await this.checkValidity();

                if (valid) {
                    const payload = {
                        values: this.getElements(),
                        lastChangedElem: this.getLastChangedElement(),
                        submitter: _event?.submitter?.name,
                        event: _event,
                        form: this,
                    };

                    this.$emit('submit', payload);
                } else {
                    _event.preventDefault();
                }

                resolveSubmitting();
            } catch (_error) {
                resolveSubmitting();
                _event.preventDefault();
                throw _error;
            }
        },

        /**
         * Triggered when form is about to reset.
         *
         * @param {Event} _event
         */
        onReset(_event) {
            const initValues = cloneObject(this._initValues);
            const { elements } = this.elements;

            _event.preventDefault();

            Object.keys(elements).forEach((_key) => {
                if (_key in initValues) {
                    elements[_key] = initValues[_key];
                } else {
                    // TODO: default value according to type
                    elements[_key] = '';
                }
            });

            this.$emit('reset', {
                values: cloneObject(initValues),
                event: _event,
            });
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

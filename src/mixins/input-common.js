import { getUniqueId } from '../utils/index.js';

// common props for custom inputs
export const inputCommonMixin = {
    props: {
        id: {
            type: String,
            default() {
                return getUniqueId();
            },
        },
        type: {
            type: String,
            default: '',
        },
        value: {
            type: [String, Number, Boolean, Object, Date],
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        inputCommonProps() {
            return {
                id: this.id,
                type: this.type,
                // value: this.value,
                name: this.name || null,
                disabled: this.disabled || null,
                required: this.required || null,
                invalid: this.invalid || null,
            };
        },
    },
};

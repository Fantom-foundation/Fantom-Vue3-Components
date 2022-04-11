import { inputCommonMixin } from './input-common.js';

const selectM = {
    props: {
        ...inputCommonMixin.props,

        value: {
            type: [String, Number, Boolean, Object, Date, Array],
            default: '',
        },
    },

    computed: {
        ...inputCommonMixin.computed,

        selectProps() {
            const props = { ...this.inputCommonProps };

            delete props.type;

            return props;
        },
    },
};

// delete selectM.props.type;

export const selectMixin = selectM;

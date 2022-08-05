/**
 * @param {Object} wrapper
 * @return {{setInnerHTML: setInnerHTML}}
 */
export function checkRadioOptionPlugin(wrapper) {
    /**
     * @param {number} optionIndex
     */
    async function checkRadioOption(optionIndex = 1) {
        const inputs = wrapper.findAll('input[type="radio"]');

        if (optionIndex < 1 || optionIndex > inputs.length) {
            throw new Error(`Bad item index ${optionIndex}`);
        }

        await inputs[optionIndex - 1].trigger('click');
        await inputs[optionIndex - 1].trigger('change');

        return inputs[optionIndex - 1];
    }

    async function checkRadioOptionByValue(value) {
        const inputs = wrapper.findAll('input[type="radio"]');
        let selectedOption = null;

        for (let i = 0, len = inputs.length; i < len; i++) {
            if (inputs[i].element.value === value) {
                selectedOption = inputs[i];
                break;
            }
        }

        if (selectedOption) {
            await selectedOption.trigger('click');
            await selectedOption.trigger('change');
        }

        return selectedOption;
    }

    return {
        checkRadioOption,
        checkRadioOptionByValue,
    };
}

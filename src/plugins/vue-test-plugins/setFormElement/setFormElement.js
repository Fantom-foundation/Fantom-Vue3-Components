/**
 * @param {Object} wrapper
 * @return {{setFormElement: ((function(string=, *): Promise<void>)|*)}}
 */
export function setFormElementPlugin(wrapper) {
    /**
     * @param {string} name
     */
    async function setFormElement(name = '', value) {
        const formElement = wrapper.find(`[name=${name}]`);

        if (formElement.exists()) {
            await formElement.setValue(value);
        } else {
            throw new Error(`Can't find form element named '${name}'`);
        }
    }

    return {
        setFormElement,
    };
}

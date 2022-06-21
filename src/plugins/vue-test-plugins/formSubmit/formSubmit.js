/**
 * @param {Object} wrapper
 * @return {{submitForm: (function(string=): Promise<*>)}}
 */
export function submitFormPlugin(wrapper) {
    /**
     * @param {string} name
     */
    async function submitForm(name = '') {
        const selector = name
            ? `button[type="submit"][name="${name}"], input[type="submitd"][name="${name}"]`
            : 'button[type="submit"], input[type="submit"]';
        const submitElement = wrapper.find(selector);

        if (!submitElement.exists()) {
            throw new Error("Can't find a submit element");
        }

        await submitElement.trigger('click');

        return submitElement;
    }

    return {
        submitForm,
    };
}

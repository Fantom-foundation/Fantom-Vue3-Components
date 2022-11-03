import { FForm } from '../../../components/index.js';
import { isPromise } from '../../../utils/index.js';

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
            ? `button[type="submit"][name="${name}"], input[type="submit"][name="${name}"]`
            : 'button[type="submit"], input[type="submit"]';
        const submitElement = wrapper.find(selector);
        const fForm = wrapper.findComponent(FForm);

        if (!submitElement.exists()) {
            throw new Error("Can't find a submit element");
        }

        await submitElement.trigger('click');

        const submitting = fForm.exists() ? fForm.vm.submitting : null;
        if (submitting && isPromise(submitting)) {
            await submitting;
        }

        return submitElement;
    }

    return {
        submitForm,
    };
}

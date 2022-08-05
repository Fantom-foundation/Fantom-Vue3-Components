/**
 * @param {Object} wrapper
 * @return {{toggleCheckbox: (function(string=): Promise<*>)}}
 */
export function toggleCheckboxPlugin(wrapper) {
    /**
     * @param {string} [name]
     * @return {Promise<HTMLElement>}
     */
    async function toggleCheckbox(name = '') {
        const checkbox = wrapper.find(`input[type="checkbox"]${name ? `[name="${name}"]` : ''}`);

        await checkbox.trigger('click');
        await checkbox.trigger('change');

        return checkbox;
    }

    return {
        toggleCheckbox,
    };
}

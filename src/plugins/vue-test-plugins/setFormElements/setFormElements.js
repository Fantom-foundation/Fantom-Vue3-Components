/**
 * Needs `setFormElement` vue test plugin to have been installed
 *
 * @param {Object} wrapper
 * @return {{setFormElements: (function(Object): Promise<Awaited<unknown>[]>)}}
 */
export function setFormElementsPlugin(wrapper) {
    /**
     * @param {Object} elements Keys are elment names, values are element values
     */
    async function setFormElements(elements) {
        const promises = [];

        Object.keys(elements).forEach((name) => {
            promises.push(wrapper.setFormElement(name, elements[name]));
        });

        return await Promise.all(promises);
    }

    return {
        setFormElements,
    };
}

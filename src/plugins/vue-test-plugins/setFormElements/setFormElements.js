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
    async function setFormElements(elements, notNullValue = false) {
        const promises = [];
        let elems = elements;

        if (notNullValue) {
            elems = {};
            Object.keys(elements).forEach((name) => {
                const value = elements[name];

                if (value !== null) {
                    elems[name] = value;
                }
            });
        }

        Object.keys(elems).forEach((name) => {
            promises.push(wrapper.setFormElement(name, elems[name]));
        });

        return await Promise.all(promises);
    }

    return {
        setFormElements,
    };
}

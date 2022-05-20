/**
 * Remove all attributes given by `attribute` arg
 *
 * @param {Object} wrapper
 * @return {{removeAttributes: removeAttributes}}
 */
export function removeAttributesPlugin(wrapper) {
    /**
     * Remove all attributes given by `attribute` arg
     *
     * @param {string} attribute
     */
    function removeAttributes(attribute) {
        wrapper.element.querySelectorAll(`[${attribute}]`).forEach((el) => {
            el.removeAttribute(attribute);
        });
    }

    return {
        removeAttributes,
    };
}

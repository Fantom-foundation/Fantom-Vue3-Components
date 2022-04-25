/**
 * Find all elements by `data-testcode` attribute.
 *
 * @param {Object} wrapper
 * @returns {{findByTestId: ((function(*): (DOMWrapper<NodeType>))|*)}}
 */
export function findByTestCodePlugin(wrapper) {
    function findByTestCode(selector) {
        return wrapper.findAll(`[data-testcode='${selector}']`);
    }

    return {
        findByTestCode,
    };
}

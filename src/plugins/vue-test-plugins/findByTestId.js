/**
 * Find element by `data-testid` attribute.
 *
 * @param {Object} wrapper
 * @returns {{findByTestId: ((function(*): (DOMWrapper<NodeType>))|*)}}
 */
export function findByTestIdPlugin(wrapper) {
    function findByTestId(selector) {
        return wrapper.find(`[data-testid='${selector}']`);
    }

    return {
        findByTestId,
    };
}

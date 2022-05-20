/**
 * Set innerHTML on the elements given by selector
 *
 * @param {Object} wrapper
 * @return {{setInnerHTML: setInnerHTML}}
 */
export function setInnerHTMLPlugin(wrapper) {
    /**
     * Set innerHTML on the elements given by selector
     *
     * @param {string} selector
     * @param {string} html
     */
    function setInnerHTML(selector, html = '') {
        wrapper.element.querySelectorAll(selector).forEach((el) => {
            el.innerHTML = html;
        });
    }

    return {
        setInnerHTML,
    };
}

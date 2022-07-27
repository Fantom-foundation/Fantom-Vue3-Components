import { isRef, unref } from 'vue';

/**
 * Expose vue compoent's methods
 *
 * @param {Object} component
 * @param {string[]} methods
 * @return {{}} Keys are method names, values are functions
 */
export function exposeMethods(component, methods = []) {
    let value = {};

    methods.forEach((method) => {
        value[method] = function (...args) {
            const comp = isRef(component) ? unref(component) : component;
            const fn = comp ? comp[method] : null;

            if (typeof fn === 'function') {
                return fn(...args);
            }
        };
    });

    return value;
}

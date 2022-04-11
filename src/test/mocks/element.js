import { vi } from 'vitest';

/**
 * Mock a getter of html element.
 *
 * @param {HTMLElement|*} element
 * @param {string} getter
 * @param {*} value
 * @return {vi.SpyInstance<*, []>}
 */
export function spyElementGetter(element, getter, value) {
    return vi.spyOn(element, getter, 'get').mockImplementation(() => (typeof value === 'function' ? value() : value));
}

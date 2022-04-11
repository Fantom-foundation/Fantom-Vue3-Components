import { vi } from 'vitest/dist/index.js';

/**
 * @param {HTMLElement|*} element
 * @param {{callback: null}} eventListener
 * @return {SpyInstance<A, R>}
 */
export function spyAddEventListener(element, eventListener = {}) {
    return vi.spyOn(element, 'addEventListener').mockImplementation((eventName, fn) => {
        if ('callback' in eventListener) {
            eventListener.callback = fn;
        }
    });
}

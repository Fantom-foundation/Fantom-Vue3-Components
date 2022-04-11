import { spyAddEventListener } from './event-listener.js';
import { spyElementGetter } from './element.js';

export function spyPageVisibility() {
    const eventListener = { callback: null };
    const spy = spyAddEventListener(document, eventListener);

    return {
        spy,
        eventListener,
    };
}

/**
 * @param {('visible'|'hidden'|'prerender')} visibilityState
 * @param {{callback: null}} eventListener
 */
export function setPageVisibility(visibilityState, eventListener) {
    if (eventListener && eventListener.callback) {
        const spy = spyElementGetter(document, 'visibilityState', visibilityState);

        eventListener.callback();

        spy.mockRestore();
    }
}

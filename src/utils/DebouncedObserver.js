import { debounce } from './index.js';

export class DebouncedObserver {
    /** Observer instance */
    #observer = null;
    /** Observer class */
    #Observer = null;
    /** Ignore first callback call */
    #firstCall = false;

    constructor(Observer = window.ResizeObserver) {
        this.#Observer = Observer;
    }

    /**
     * @param {HTMLElement} element
     * @param {function} callback
     * @param {number} debounceInterval In milliseconds. 0 means no debouncing.
     * @param {boolean} ignoreFirstCall
     * @param {Object} options
     */
    create({ element, callback, debounceInterval = 0, ignoreFirstCall = false, options = {} }) {
        this.destroy();

        if (this.#Observer) {
            this.#firstCall = true;

            const _callback = (entries) => {
                if (ignoreFirstCall) {
                    if (!this.#firstCall) {
                        callback(entries);
                    } else {
                        this.#firstCall = false;
                    }
                } else {
                    callback(entries);
                }
            };

            this.#observer = new this.#Observer(
                debounceInterval > 0 ? debounce(_callback, debounceInterval, true) : _callback
            );
            this.#observer.observe(element, options);
        }
    }

    destroy() {
        if (this.#observer !== null) {
            this.#observer.disconnect();
            this.#observer = null;
        }
    }
}

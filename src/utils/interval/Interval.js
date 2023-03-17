/**
 * Class for handling repeated function calls.
 */
export class Interval {
    /**
     * @param {number} interval
     */
    constructor({ interval = 3000 } = {}) {
        // Keys are codes, values are objects { id: number, paused: boolean }
        this._intervals = {};
        // Default interval interval
        this._interval = interval;
        // All intervals are paused
        this._paused = false;
    }

    destroy() {
        this.stopAll();
    }

    /**
     * @param {string} code
     * @param {function} callback
     * @param {number} [interval] In milliseconds
     * @param {boolean} [immediate] Call function immediately
     */
    start(code, callback, interval = this._interval, immediate = false) {
        if (typeof callback === 'function') {
            this.stop(code);

            if (immediate) {
                callback();
            }

            const id = setInterval(() => {
                const interval = this._getIntervalByCode(code);

                if (!interval || !interval.paused) {
                    callback();
                }
            }, interval);

            this._intervals[code] = {
                id,
                paused: this._paused,
            };
        } else {
            throw new Error(`'callback' is not a function`);
        }
    }

    /**
     * @param {string} code
     */
    stop(code) {
        const interval = this._getIntervalByCode(code);

        if (interval) {
            clearInterval(interval.id);
            delete this._intervals[code];
        }
    }

    stopAll() {
        Object.keys(this._intervals).forEach((_code) => {
            this.stop(_code);
        });
    }

    /**
     * @param {string} code
     */
    pause(code) {
        const interval = this._getIntervalByCode(code);

        if (interval) {
            interval.paused = true;
        }
    }

    pauseAll() {
        this._paused = true;

        Object.keys(this._intervals).forEach((code) => {
            this.pause(code);
        });
    }

    /**
     * @param {string} code
     */
    resume(code) {
        const interval = this._getIntervalByCode(code);

        if (interval) {
            interval.paused = false;
        }
    }

    resumeAll() {
        this._paused = false;

        Object.keys(this._intervals).forEach((code) => {
            this.resume(code);
        });
    }

    /**
     * @param code
     * @return {*|null}
     * @private
     */
    _getIntervalByCode(code) {
        const intervals = this._intervals;

        return code in intervals ? intervals[code] : null;
    }
}

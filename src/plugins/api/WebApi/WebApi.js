// import { computed } from 'vue';

/**
 * Parent for web apis
 */
export class WebApi {
    #onError = null;

    /**
     * @param {function} onError
     */
    constructor(onError = null) {
        if (onError) {
            this.registerOnErrorFunction(onError);
        }
    }

    /**
     * @param {function} onError
     */
    registerOnErrorFunction(onError) {
        if (typeof onError === 'function') {
            this.#onError = onError;
        }
    }

    /**
     * @param {function} onResult
     * @param {function} [onError]
     * @param {*} [defaultData]
     * @param {function} [pickFn]
     * @return {Promise<unknown>}
     * @private
     */
    _dataPromise(onResult, onError, defaultData = null, pickFn = null) {
        return new Promise((resolve, reject) => {
            if (typeof onResult !== 'function') {
                reject(new Error('onResult is not a function'));
            } else {
                onResult((data) => {
                    resolve(this._useResult({ value: data?.data || data }, defaultData, pickFn));
                });

                if (typeof onError === 'function') {
                    onError((error) => {
                        reject(error);
                    });
                }
            }
        });
    }

    /**
     * @param {Object} result
     * @param {*} [defaultData]
     * @param {function} [pickFn]
     * @return {*|null}
     * @private
     */
    _useResult(result, defaultData = null, pickFn = null) {
        let data = null;

        if (typeof pickFn === 'function') {
            data = pickFn(result.value);
        } else {
            data = this._getValueOfFirstKey(result.value);
        }

        return data ?? defaultData;
    }

    /**
     * @param {Object} [obj]
     * @return {*|null}
     * @private
     */
    _getValueOfFirstKey(obj) {
        const keys = obj ? Object.keys(obj) : [];

        return keys.length > 0 ? obj[keys[0]] : null;
    }

    /**
     * @param {function} onError
     * @param {boolean} [silent]
     * @private
     */
    _onError(onError, silent = false) {
        if (!!this.#onError && !silent) {
            onError(this.#onError);
        }
    }
}

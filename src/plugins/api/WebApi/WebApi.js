import { useApi } from '../Api/useApi/useApi.js';
import { clone } from '../../../utils/index.js';

const api = useApi().api;

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

    _getFunctionMock(funcMock, funcMockName) {
        return api._getFunctionMock(funcMock, funcMockName);
    }

    /**
     * @param {function} onResult
     * @param {function} [onError]
     * @param {*} [defaultData]
     * @param {function} [pickFn]
     * @param {boolean} [copyData]
     * @param {boolean} [useResult]
     * @return {Promise<unknown>}
     * @private
     */
    _dataPromise({ onResult, onError, defaultData = null, pickFn = null, copyData = false, useResult = true }) {
        return new Promise((resolve, reject) => {
            if (typeof onResult !== 'function') {
                reject(new Error('onResult is not a function'));
            } else {
                onResult((data) => {
                    resolve(
                        useResult
                            ? this._useResult({ value: data?.data || data }, defaultData, pickFn, copyData)
                            : data?.data || data || defaultData
                    );
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
     * @param {boolean} [copyData]
     * @return {*|null}
     * @private
     */
    _useResult(result, defaultData = null, pickFn = null, copyData = false) {
        let data;
        let value = copyData ? clone(result.value) : result.value;

        if (typeof pickFn === 'function') {
            data = pickFn(value);
        } else {
            data = this._getValueOfFirstKey(value);
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

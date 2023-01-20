import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { WebApi } from './WebApi.js';

export const QUERY_RETURN_KEYS = [
    'data',
    'dataPromise',
    'result',
    'loading',
    'error',
    'refetch',
    'enabled',
    'fetchMore',
    'onResult',
    'onError',
];

export const MUTATION_RETURN_KEYS = ['mutate', 'getPromise', 'loading', 'error', 'called', 'onDone', 'onError'];

let api = null;

beforeEach(() => {
    api = new WebApi();
});

afterEach(() => {
    api = null;
});

describe('WebApi', () => {
    describe('_getValueOfFirstKey()', () => {
        it('should return null if the given object is not defined', () => {
            expect(api._getValueOfFirstKey()).toBeNull();
        });

        it('should return null if the given object is empty', () => {
            expect(api._getValueOfFirstKey({})).toBeNull();
        });

        it('should return value of the first found key in the given object', () => {
            expect(
                api._getValueOfFirstKey({
                    key1: 'foo1',
                    key2: 'foo2',
                })
            ).toBe('foo1');
        });
    });

    describe('_useResult()', () => {
        it('should return default data if there are no data in the result.value', () => {
            // const result = { value: { bla: {} } };
            const result = {};

            expect(api._useResult(result, 'default data')).toBe('default data');
        });

        it('should return value of the first found key in the result.value object if no `pickFn` function is given', () => {
            const result = { value: { foo: 'foo' } };

            expect(api._useResult(result)).toBe('foo');
        });

        it('should use value from the `pickFn` function if it is given', () => {
            const result = { value: { foo: 'foo', foo2: 'foo2' } };
            const pickFn = (data) => data?.foo2;

            expect(api._useResult(result, null, pickFn)).toBe('foo2');
        });

        it('should copy data to be able to modify them', () => {
            const data = ['foo'];
            const result = { value: { foo: data } };

            const retResult = api._useResult(result, null, null, true);
            expect(retResult !== data).toBe(true);
        });
    });

    describe('_dataPromise()', () => {
        it('should return a promise that rejects if given `onResult` argument is not a function', async () => {
            await expect(api._dataPromise({})).rejects.toBeInstanceOf(Error);
        });

        it('should return a promise that rejects if given `onError` function is called', async () => {
            const onResult = () => {};
            const onError = (fn) => {
                fn(new Error('Some error'));
            };

            await expect(api._dataPromise({ onResult, onError })).rejects.toBeInstanceOf(Error);
        });

        it('should return a promise that resolves when function passed to `onResult` function is called', async () => {
            const onResult = (fn) => {
                fn({
                    result: 'on result',
                });
            };

            await expect(api._dataPromise({ onResult })).resolves.toBe('on result');
        });

        it('should use `_useResult` method on data result', async () => {
            const onResult = (fn) => {
                fn({});
            };

            await expect(api._dataPromise({ onResult, onError: () => {}, defaultData: 'default data' })).resolves.toBe(
                'default data'
            );
        });

        it('should not use `_useResult` method on data result when `useResult` is false', async () => {
            const onResult = (fn) => {
                fn('result');
            };

            await expect(api._dataPromise({ onResult, onError: () => {}, useResult: false })).resolves.toBe('result');
        });
    });

    describe('_onError()', () => {
        it('should call stored function on error', () => {
            const onError = vi.fn(() => {});
            api.registerOnErrorFunction(onError);

            const onErrorCallback = (fn) => {
                fn();
            };

            api._onError(onErrorCallback);

            expect(onError).toHaveBeenCalled();
        });

        it('should not call stored function on error if `silent` argument is `true`', () => {
            const onError = vi.fn(() => {});
            api.registerOnErrorFunction(onError);

            const onErrorCallback = (fn) => {
                fn();
            };

            api._onError(onErrorCallback, true);

            expect(onError).not.toHaveBeenCalled();
        });
    });
});

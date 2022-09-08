import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { implementsInterface } from '@/utils/interface/interface.js';
import { WebApiInterface } from '../WebApi/WebApiInterface.js';
import { MUTATION_RETURN_KEYS, QUERY_RETURN_KEYS } from '../WebApi/WebApi.spec.js';
import { GqlApi } from './GqlApi.js';
import { delay } from '@/utils/index.js';

let api = null;

function useQuery() {
    return { data: null, onResult() {} };
}

function useMutation() {
    return { mutate() {} };
}

beforeEach(() => {
    api = new GqlApi();
    api.setup({ useQuery, useMutation });
});

afterEach(() => {
    api = null;
});

describe('GqlApi', () => {
    it('should implement WebApi interface', () => {
        expect(() => {
            implementsInterface(api, WebApiInterface);
        }).not.toThrowError();
    });

    describe('query()', () => {
        it('should return expected keys', () => {
            const result = api.query({
                query: `
                    query foo {
                        foo
                    }
                `,
            });

            expect(Object.keys(result).sort()).toEqual(QUERY_RETURN_KEYS.sort());
        });
    });

    describe('mutation()', () => {
        it('should return expected keys', () => {
            const result = api.mutation({
                mutation: `
                    mutation foo {
                        foo
                    }
                `,
            });

            expect(Object.keys(result).sort()).toEqual(MUTATION_RETURN_KEYS.sort());
        });
    });

    describe('queryMock()', () => {
        it('should return expected object', () => {
            const result = api.queryMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
            });

            expect(result).toMatchObject({
                data: { value: 'default' },
                result: { value: null },
                loading: { value: true },
                error: { value: null },
            });
            expect(result.dataPromise instanceof Promise).toBe(true);
            expect(typeof result.refetch).toBe('function');
            expect(typeof result.fetchMore).toBe('function');
            expect(typeof result.onResult).toBe('function');
            expect(typeof result.onError).toBe('function');
            expect(Object.keys(result).sort()).toEqual(QUERY_RETURN_KEYS.sort());
        });

        it('should call right functions after a tick', async () => {
            const spyOnResult = vi.fn(() => {});

            const result = api.queryMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
            });

            result.onResult(spyOnResult);

            await delay();

            expect(spyOnResult).toBeCalledWith({
                data: {
                    myFoo: 'foo',
                },
            });
            expect(result).toMatchObject({
                result: {
                    value: {
                        myFoo: 'foo',
                    },
                },
                loading: { value: false },
            });
        });

        it('should call refetch function properly', async () => {
            const spyOnResult = vi.fn(() => {});

            const result = api.queryMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
            });
            result.onResult(spyOnResult);

            await delay();

            result.refetch({ myFoo: 'foo2' });

            expect(result.loading.value).toBe(true);

            await delay();

            expect(spyOnResult).toBeCalledWith({
                data: {
                    myFoo: 'foo2',
                },
            });
            expect(result).toMatchObject({
                result: {
                    value: {
                        myFoo: 'foo2',
                    },
                },
                loading: { value: false },
            });
        });

        it('should call error function properly', async () => {
            const spyOnError = vi.fn(() => {});
            const errors = [{ message: 'error 1' }];

            const result = api.queryMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
                errors,
            });
            result.onError(spyOnError);

            await delay();

            expect(spyOnError).toBeCalledWith({
                errors,
            });
            expect(result).toMatchObject({
                error: {
                    value: { errors },
                },
                loading: { value: false },
            });
        });
    });
});

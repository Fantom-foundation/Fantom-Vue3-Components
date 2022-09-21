import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { implementsInterface } from '@/utils/interface/interface.js';
import { WebApiInterface } from '../WebApi/WebApiInterface.js';
import { MUTATION_RETURN_KEYS, QUERY_RETURN_KEYS } from '../WebApi/WebApi.spec.js';
import { GqlApi } from './GqlApi.js';
import { delay } from '@/utils/index.js';
import { useApi } from '@/plugins/index.js';

const api = useApi().api;
let gqlApi = null;

function useQuery() {
    return { data: null, onResult() {} };
}

function useMutation() {
    return { mutate() {} };
}

beforeEach(() => {
    gqlApi = new GqlApi();
    gqlApi.setup({ useQuery, useMutation });
});

afterEach(() => {
    gqlApi = null;
});

describe('GqlApi', () => {
    it('should implement WebApi interface', () => {
        expect(() => {
            implementsInterface(gqlApi, WebApiInterface);
        }).not.toThrowError();
    });

    describe('query()', () => {
        it('should return expected keys', () => {
            const result = gqlApi.query({
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
            const result = gqlApi.mutation({
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
            const result = gqlApi.queryMock({
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

            const result = gqlApi.queryMock({
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

            const result = gqlApi.queryMock({
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

            const result = gqlApi.queryMock({
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

        it('should use fake data function instead of mock function if fake data function is given', async () => {
            function fooMock() {
                return gqlApi.queryMock({
                    mockFunction: ({ myFoo = 'foo' } = {}) => {
                        return { myFoo };
                    },
                    fnName: 'fooMock',
                });
            }
            api.registerQueryMock(fooMock, 'fooMock');

            api.fakeData('fooMock', () => ({ myFoo: 'data fake' }));
            const result = api.query.fooMock();
            await delay();

            expect(result.data.value).toBe('data fake');

            api.restoreDataFake('fooMock');
        });
    });
});

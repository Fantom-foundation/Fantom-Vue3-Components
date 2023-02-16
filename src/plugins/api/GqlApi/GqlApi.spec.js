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
                enabled: { value: true },
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

        it('should pass the same arguments to the mock function as the original function', async () => {
            const mockFn = vi.fn();
            function fooMock(...args) {
                return gqlApi.queryMock({
                    mockFunction: mockFn,
                    fnName: 'fooMock',
                    args: [...args],
                });
            }
            api.registerQueryMock(fooMock, 'fooMock');

            api.query.fooMock({ arg: 'foo' });
            await delay();

            expect(mockFn).toBeCalledWith({ arg: 'foo' });

            api.restoreDataFake('fooMock');
        });

        it('should pass the same arguments to the fake data function as the original function', async () => {
            function fooMock(...args) {
                return gqlApi.queryMock({
                    mockFunction: () => {},
                    fnName: 'fooMock',
                    args: [...args],
                });
            }
            api.registerQueryMock(fooMock, 'fooMock');
            const fakeDataFn = vi.fn();
            api.fakeData('fooMock', fakeDataFn);

            api.query.fooMock({ arg: 'foo' });
            await delay();

            expect(fakeDataFn).toBeCalledWith({ arg: 'foo' });

            api.restoreDataFake('fooMock');
        });
    });

    describe('mutationMock()', () => {
        it('should return expected object', () => {
            const result = gqlApi.mutationMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
            });

            expect(result.called.value).toBe(false);
            expect(result.loading.value).toBe(true);
            expect(result.error.value).toBeNull();
            expect(typeof result.getPromise).toBe('function');
            expect(typeof result.mutate).toBe('function');
            expect(typeof result.onDone).toBe('function');
            expect(typeof result.onError).toBe('function');
            expect(Object.keys(result).sort()).toEqual(MUTATION_RETURN_KEYS.sort());
        });

        it('should call mutate function properly', async () => {
            const spyOnDone = vi.fn(() => {});

            const result = gqlApi.mutationMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
            });
            result.onDone(spyOnDone);

            expect(result.called.value).toBe(false);

            result.mutate({ myFoo: 'foo2' });

            expect(result.loading.value).toBe(true);

            await delay();

            expect(spyOnDone).toBeCalledWith('foo2');
            expect(result.loading.value).toBe(false);
            expect(result.called.value).toBe(true);
        });

        it('getPromise() should work properly', async () => {
            const result = gqlApi.mutationMock({
                mockFunction: () => ({ result: 'foo' }),
                pickFn: (data) => data?.result,
            });

            const promise = result.getPromise();
            result.mutate();

            expect(await promise).toBe('foo');
        });

        it('should call error function properly', async () => {
            const spyOnError = vi.fn(() => {});
            const errors = [{ message: 'error 1' }];

            const result = gqlApi.mutationMock({
                mockFunction: ({ myFoo = 'foo' } = {}) => {
                    return { myFoo };
                },
                defaultData: 'default',
                errors,
            });
            result.onError(spyOnError);
            result.mutate({});

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
                return gqlApi.mutationMock({
                    mockFunction: ({ myFoo = 'foo' } = {}) => {
                        return { myFoo };
                    },
                    fnName: 'fooMock',
                });
            }
            api.registerMutationMock(fooMock, 'fooMock');
            let result;

            api.fakeData('fooMock', () => ({ myFoo: 'data fake' }));
            const { mutate, onDone } = api.mutation.fooMock();
            onDone((res) => {
                result = res;
            });
            mutate({});
            await delay();

            expect(result).toBe('data fake');

            api.restoreDataFake('fooMock');
        });

        it('should pass the same arguments to the mock function as the original function', async () => {
            const mockFn = vi.fn();
            function fooMock(...args) {
                return gqlApi.mutationMock({
                    mockFunction: mockFn,
                    fnName: 'fooMock',
                    args: [...args],
                });
            }
            api.registerMutationMock(fooMock, 'fooMock');

            api.mutation.fooMock({ arg: 'foo' });
            await delay();

            expect(mockFn).toBeCalledWith({ arg: 'foo' });

            api.restoreDataFake('fooMock');
        });

        it('should pass the same arguments to the fake data function as the original function', async () => {
            function fooMock(...args) {
                return gqlApi.mutationMock({
                    mockFunction: () => {},
                    fnName: 'fooMock',
                    args: [...args],
                });
            }
            api.registerMutationMock(fooMock, 'fooMock');
            const fakeDataFn = vi.fn();
            api.fakeData('fooMock', fakeDataFn);

            api.query.fooMock({ arg: 'foo' });
            await delay();

            expect(fakeDataFn).toBeCalledWith({ arg: 'foo' });

            api.restoreDataFake('fooMock');
        });
    });
});

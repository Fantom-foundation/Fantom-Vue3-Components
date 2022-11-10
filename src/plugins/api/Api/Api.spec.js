import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Api } from './Api.js';
import { WebApi } from '../WebApi/WebApi.js';

let api = null;
let myApi = null;

class MyApi extends WebApi {
    query(q) {
        return q;
    }
    mutation(m) {
        return m;
    }
    registerOnErrorFunction() {}
    queryMock(fn) {
        return fn();
    }
    mutationMock(fn) {
        return fn();
    }
}

function myQuery() {
    return myApi.query('my query');
}

function myQueryMock() {
    return myApi.queryMock(api._getFunctionMock(() => 'query mock', 'myQueryMock'));
}

function myMutation(m) {
    return myApi.mutation(m);
}

function myMutationMock() {
    return myApi.mutationMock(api._getFunctionMock(() => 'mutation mock', 'myMutationMock'));
}

beforeEach(() => {
    myApi = new MyApi();
    api = new Api();
    // api.registerApi(myApi, 'myapi');
});

afterEach(() => {
    myApi = null;
    api = null;
});

describe('Api', () => {
    /*it('should register an api', () => {
        expect(api.myapi instanceof MyApi).toBe(true);
    });

    it('should throw an error if given api does not implement WebApiInterface', () => {
        class MyApi2 {}

        expect(() => {
            const myApi2 = new MyApi2();
            const api2 = new Api();
            api2.registerApi(myApi2, 'myapi2');
        }).toThrowError();
    });*/

    describe('query registration', () => {
        it('should register query function', () => {
            api.registerQuery(myQuery);

            expect(api.query.myQuery()).toBe('my query');
        });

        it('should register query function and use given function name', () => {
            api.registerQuery(myQuery, 'myNewQuery');

            expect(api.query.myNewQuery()).toBe('my query');
        });

        it('should throw an error if query to be registered is already registered', () => {
            api.registerQuery(myQuery);

            expect(() => {
                api.registerQuery(myQuery);
            }).toThrowError();
        });
    });

    describe('mutation registration', () => {
        it('should register mutation function', () => {
            api.registerMutation(myMutation);

            expect(api.mutation.myMutation('my mutation')).toBe('my mutation');
        });

        it('should register mutation function and use given function name', () => {
            api.registerMutation(myMutation, 'myNewMutaion');

            expect(api.mutation.myNewMutaion('my mutation')).toBe('my mutation');
        });

        it('should throw an error if mutation to be registered is already registered', () => {
            api.registerMutation(myMutation);

            expect(() => {
                api.registerMutation(myMutation);
            }).toThrowError();
        });
    });

    describe('query mock registration', () => {
        it('should register query function ', () => {
            api.registerQueryMock(myQueryMock);

            expect(api.query.myQueryMock()).toBe('query mock');
        });

        it('should register query function and use given function name', () => {
            api.registerQueryMock(myQueryMock, 'myQuery');

            expect(api.query.myQuery()).toBe('query mock');
        });
    });

    describe('mutation mock registration', () => {
        it('should register query function ', () => {
            api.registerMutationMock(myMutationMock);

            expect(api.mutation.myMutationMock()).toBe('mutation mock');
        });

        it('should register mutation function and use given function name', () => {
            api.registerMutationMock(myMutationMock, 'myMutation');

            expect(api.mutation.myMutation()).toBe('mutation mock');
        });
    });

    describe('query - fake data registration/usage', () => {
        it('should be able to store a function that generates fake data and is used while mocking', () => {
            api.registerQueryMock(myQueryMock);

            api.fakeData('myQueryMock', () => 'fake data');

            expect(api.query.myQueryMock()).toBe('fake data');
        });

        it('should restore fake data', () => {
            api.registerQueryMock(myQueryMock);

            api.fakeData('myQueryMock', () => 'fake data');
            api.restoreDataFake('myQueryMock');

            expect(api.query.myQueryMock()).toBe('query mock');
        });
    });

    describe('mutation - fake data registration/usage', () => {
        it('should be able to store a function that generates fake data and is used while mocking', () => {
            api.registerMutationMock(myMutationMock);

            api.fakeData('myMutationMock', () => 'fake data');

            expect(api.mutation.myMutationMock()).toBe('fake data');
        });

        it('should restore fake data', () => {
            api.registerMutationMock(myMutationMock);

            api.fakeData('myMutationMock', () => 'fake data');
            api.restoreDataFake('myMutationMock');

            expect(api.mutation.myMutationMock()).toBe('mutation mock');
        });
    });
});

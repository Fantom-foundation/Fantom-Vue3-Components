/**
 * Interface for api calls
 */
export class Api {
    #dataFakes = {};
    /** @type {ApiQueries} */
    query = {};
    /** @type {ApiMutations} */
    mutation = {};

    /**
     * @param {function} func
     * @param {string} funcName
     */
    registerQuery(func, funcName) {
        this.#registerFunction({ func, funcName, type: 'query' });
    }

    /**
     * @param {function} func
     * @param {string} funcName
     */
    registerQueryMock(func, funcName) {
        this.#registerFunctionMock({ func, funcName, type: 'query' });
    }

    /**
     * @param {function} func
     * @param {string} funcName
     */
    registerMutation(func, funcName) {
        this.#registerFunction({ func, funcName, type: 'mutation' });
    }

    /**
     * @param {function} func
     * @param {string} funcName
     */
    registerMutationMock(func, funcName) {
        this.#registerFunctionMock({ func, funcName, type: 'mutation' });
    }

    /**
     * Store function that returns data that will be used as a replacement of data used in api mocks
     *
     * @param {string} funcMockName Name of mock function
     * @param {function} dataFunc
     */
    fakeData(funcMockName, dataFunc) {
        this.#dataFakes[funcMockName] = dataFunc;
    }

    /**
     * @param {string} funcMockName
     */
    restoreDataFake(funcMockName) {
        delete this.#dataFakes[funcMockName];
    }

    restoreAllDataFakes() {
        this.#dataFakes = {};
    }

    _getFunctionMock(funcMock, funcMockName) {
        return funcMockName in this.#dataFakes ? this.#dataFakes[funcMockName] : funcMock;
    }

    #registerFunction({ func, funcName = '', type = 'query' }) {
        const fnName = funcName || func.name;

        if (typeof func === 'function' && fnName) {
            if (this[type][fnName] === undefined) {
                this[type][fnName] = func;
            } else {
                throw new Error(`${type === 'query' ? 'Query' : 'Mutation'} ${fnName} is already registered`);
            }
        }
    }

    #registerFunctionMock({ func, funcName = '', type = 'query' }) {
        const fnName = funcName || func.name;

        if (typeof func === 'function' && fnName) {
            this[type][fnName] = func;
        }
    }
}

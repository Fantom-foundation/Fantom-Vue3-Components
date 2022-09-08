/**
 * Interface for api calls
 */
export class Api {
    query = {};
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

export class GqlPagination {
    static #pageInfoAttrNames = {
        default: {
            startCursor: 'startCursor',
            endCursor: 'endCursor',
            hasNextPage: 'hasNextPage',
            hasPreviousPage: 'hasPreviousPage',
        },
    };

    static #queryVariableNames = {
        default: {
            first: 'first',
            last: 'last',
            after: 'after',
            before: 'before',
        },
    };

    /**
     * @param {FPaginationState} pagination
     * @param {Object} currPageInfo
     * @param {string} [attrNamesCode]
     * @param {string} [varNames]
     * @return {{}}
     */
    static getQueryVariables(pagination, currPageInfo = {}, attrNamesCode = 'default', varNames = 'default') {
        const vars = {};
        const pageInfoAttrNames = GqlPagination.getPageInfoAttrNames(attrNamesCode);
        const queryVarNames = GqlPagination.getQueryVariableNames(varNames);

        if (pagination.isFirstPage) {
            vars[queryVarNames.first] = pagination.perPage;
        } else if (pagination.isLastPage) {
            vars[queryVarNames.last] = pagination.totalItems
                ? pagination.totalItems % pagination.perPage
                : pagination.perPage;
        } else if (pagination.prevPage < pagination.currPage) {
            // next page
            vars[queryVarNames.first] = pagination.perPage;
            vars[queryVarNames.after] = currPageInfo[pageInfoAttrNames.endCursor] || null;
        } else {
            // previous page
            vars[queryVarNames.last] = pagination.perPage;
            vars[queryVarNames.before] = currPageInfo[pageInfoAttrNames.startCursor] || null;
        }

        return vars;
    }

    /**
     * @param {string} code
     * @param {Object} names
     */
    static setPageInfoAttrNames(code, names = {}) {
        GqlPagination.#pageInfoAttrNames[code] = names;
    }

    /**
     * @param {string} code
     * @return {Object}
     */
    static getPageInfoAttrNames(code) {
        const names = GqlPagination.#pageInfoAttrNames[code];

        if (!names) {
            throw new Error(`No page info attr names with code ${code} exist`);
        }

        return names;
    }

    /**
     * @param {string} code
     * @param {Object} names
     */
    static setQueryVariableNames(code, names = {}) {
        GqlPagination.#queryVariableNames[code] = names;
    }

    /**
     * @param {string} code
     * @return {Object}
     */
    static getQueryVariableNames(code) {
        const names = GqlPagination.#queryVariableNames[code];

        if (!names) {
            throw new Error(`No query variable names with code ${code} exist`);
        }

        return names;
    }
}

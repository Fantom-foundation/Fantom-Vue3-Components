import { GqlPagination } from '../../plugins/api/GqlApi/GqlPagination/GqlPagination.js';

export function useGridPagination() {
    let lastPageInfo = {};
    let lastTotalCount = 0;

    /**
     * @param {FPaginationState} pagination
     * @param {string} namesCode
     * @return {{}}
     */
    function getGqlPaginationVariables(pagination, namesCode) {
        return GqlPagination.getQueryVariables(pagination, lastPageInfo, namesCode, namesCode);
    }

    /**
     * @param {Object} pageInfo
     * @param {number} totalCount
     */
    function setGqlQueryInfo({ pageInfo = {}, totalCount = 0 }) {
        lastPageInfo = pageInfo;
        lastTotalCount = totalCount;
    }

    return {
        getGqlPaginationVariables,
        setGqlQueryInfo,
        lastPageInfo,
        lastTotalCount,
    };
}

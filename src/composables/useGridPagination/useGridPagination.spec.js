import { describe, it, expect } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useGridPagination } from './useGridPagination.js';
import { GqlPagination } from '@/plugins/api/GqlApi/GqlPagination/GqlPagination.js';

describe('useGridPagination', () => {
    describe('#getGqlPaginationVariables', () => {
        it('should return expected gql variables according to given pagination', () => {
            const { composableResult, app } = withSetup({ composable: () => useGridPagination({ pageInfo: {} }) });

            expect(
                composableResult.getGqlPaginationVariables({
                    totalItems: 9007199254740991,
                    perPage: 20,
                    currPage: 1,
                    prevPage: 1,
                    isFirstPage: true,
                    isLastPage: false,
                })
            ).toEqual({
                first: 20,
            });

            app.unmount();
        });

        it('should return expected gql variables according to given pagination and last pageInfo', () => {
            const { composableResult, app } = withSetup({ composable: () => useGridPagination({ pageInfo: {} }) });

            composableResult.setGqlQueryInfo({
                pageInfo: {
                    startCursor: 'a',
                    endCursor: 'b',
                    hasNextPage: true,
                },
                totalCount: 12345,
            });

            expect(
                composableResult.getGqlPaginationVariables({
                    perPage: 20,
                    currPage: 2,
                    prevPage: 1,
                })
            ).toEqual({
                first: 20,
                after: 'b',
            });

            app.unmount();
        });

        it('should return expected gql variables according to given pagination, last pageInfo and names code', () => {
            const { composableResult, app } = withSetup({ composable: () => useGridPagination({ pageInfo: {} }) });

            GqlPagination.setPageInfoAttrNames('myNamesCode', {
                startCursor: 'first',
                endCursor: 'last',
                hasNextPage: 'hasNext',
                hasPreviousPage: 'hasPrevious',
            });

            GqlPagination.setQueryVariableNames('myNamesCode', {
                first: 'count',
                last: 'last',
                after: 'cursor',
                before: 'before',
            });

            composableResult.setGqlQueryInfo({
                pageInfo: {
                    last: 'b',
                },
            });

            expect(
                composableResult.getGqlPaginationVariables(
                    {
                        perPage: 20,
                        currPage: 2,
                        prevPage: 1,
                    },
                    'myNamesCode'
                )
            ).toEqual({
                count: 20,
                cursor: 'b',
            });

            app.unmount();
            GqlPagination.setPageInfoAttrNames('myNamesCode', undefined);
            GqlPagination.setQueryVariableNames('myNamesCode', undefined);
        });
    });
});

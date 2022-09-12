import { describe, it, expect } from 'vitest';
import { GqlPagination } from './GqlPagination.js';

describe('GqlPagination', () => {
    it('should store page info attr names by given code', () => {
        const newAttrNames = {
            startCursor: 'first',
            endCursor: 'last',
            hasNextPage: 'hasNext',
            hasPreviousPage: 'hasPrevious',
        };

        GqlPagination.setPageInfoAttrNames('new_attr_names', newAttrNames);

        expect(GqlPagination.getPageInfoAttrNames('new_attr_names')).toEqual(newAttrNames);

        GqlPagination.setPageInfoAttrNames('new_attr_names', undefined);
    });

    it('should throw an error if no page info attr names exist with given code', () => {
        expect(() => {
            GqlPagination.getPageInfoAttrNames('foo');
        }).toThrowError();
    });

    it('should store query variable names by given code', () => {
        const newVarNames = {
            first: 'count',
            last: 'last',
            after: 'cursor',
            before: 'before',
        };

        GqlPagination.setQueryVariableNames('new_var_names', newVarNames);

        expect(GqlPagination.getQueryVariableNames('new_var_names')).toEqual(newVarNames);

        GqlPagination.setQueryVariableNames('new_var_names', undefined);
    });

    it('should throw an error if no page info attr names exist with given code', () => {
        expect(() => {
            GqlPagination.getQueryVariableNames('foo');
        }).toThrowError();
    });

    it('should get expected gql query variables for given pagination and page info', () => {
        expect(
            GqlPagination.getQueryVariables({
                isFirstPage: true,
                perPage: 20,
            })
        ).toEqual({
            first: 20,
        });

        expect(
            GqlPagination.getQueryVariables({
                isLastPage: true,
                perPage: 20,
            })
        ).toEqual({
            last: 20,
        });

        expect(
            GqlPagination.getQueryVariables({
                isLastPage: true,
                totalItems: 25,
                perPage: 20,
            })
        ).toEqual({
            last: 5,
        });

        expect(
            GqlPagination.getQueryVariables(
                {
                    prevPage: 1,
                    currPage: 2,
                    perPage: 20,
                },
                {
                    endCursor: 'b',
                }
            )
        ).toEqual({
            first: 20,
            after: 'b',
        });

        expect(
            GqlPagination.getQueryVariables(
                {
                    prevPage: 2,
                    currPage: 1,
                    perPage: 20,
                },
                {
                    startCursor: 'a',
                }
            )
        ).toEqual({
            last: 20,
            before: 'a',
        });
    });

    it('should return null if pageInfo cursor is not given', () => {
        expect(
            GqlPagination.getQueryVariables({
                prevPage: 1,
                currPage: 2,
                perPage: 20,
            })
        ).toEqual({
            first: 20,
            after: null,
        });
    });

    it('should get expected gql query variables if name codes are given', () => {
        GqlPagination.setPageInfoAttrNames('myPageInfoAttrNames', {
            startCursor: 'first',
            endCursor: 'last',
            hasNextPage: 'hasNext',
            hasPreviousPage: 'hasPrevious',
        });

        GqlPagination.setQueryVariableNames('myQueryVariableNames', {
            first: 'count',
            last: 'last',
            after: 'cursor',
            before: 'before',
        });

        expect(
            GqlPagination.getQueryVariables(
                {
                    prevPage: 1,
                    currPage: 2,
                    perPage: 20,
                },
                {
                    last: 'b',
                },
                'myPageInfoAttrNames',
                'myQueryVariableNames'
            )
        ).toEqual({
            count: 20,
            cursor: 'b',
        });

        GqlPagination.setPageInfoAttrNames('myPageInfoAttrNames', undefined);
        GqlPagination.setQueryVariableNames('myQueryVariableNames', undefined);
    });
});

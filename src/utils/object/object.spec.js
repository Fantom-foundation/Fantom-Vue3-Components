import { describe, it, expect } from 'vitest';
import { checkObjectProperties } from './object.js';

describe('utility functions related to Object', () => {
    describe('checkObjectProperties()', () => {
        const expected = {
            bool: 'boolean',
            num: 'number',
            str: 'string',
            obj: 'Object',
            arr: 'array',
        };

        it('should return an empty array (errors) if everything is ok', () => {
            expect(
                checkObjectProperties(
                    {
                        bool: false,
                        num: 1,
                        str: '',
                        obj: {},
                        arr: [],
                    },
                    expected
                )
            ).toHaveLength(0);
        });

        it('should return array of errors with the name of key and error type "missing" if property is missing', () => {
            expect(
                checkObjectProperties(
                    {
                        num: 1,
                        str: '',
                        obj: {},
                        arr: [],
                    },
                    expected
                )
            ).toEqual([
                {
                    key: 'bool',
                    errType: 'missing',
                },
            ]);
        });

        it('should return array of errors with the name of key and error type "bad_type" if property has a bad type', () => {
            expect(
                checkObjectProperties(
                    {
                        bool: 0,
                        num: '1',
                        str: 1,
                        obj: null,
                        arr: null,
                    },
                    expected
                )
            ).toEqual([
                {
                    key: 'bool',
                    errType: 'bad_type',
                },
                {
                    key: 'num',
                    errType: 'bad_type',
                },
                {
                    key: 'str',
                    errType: 'bad_type',
                },
                {
                    key: 'obj',
                    errType: 'bad_type',
                },
                {
                    key: 'arr',
                    errType: 'bad_type',
                },
            ]);
        });
    });
});

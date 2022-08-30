import { describe, it, expect } from 'vitest';
import { requiredValidator } from '@/utils/validators/validators.js';

const ERROR_MESSAGE = 'error message';

describe('validators', () => {
    describe('requiredValidator()', () => {
        it('should handle a string as a value correctly', () => {
            expect(requiredValidator('', ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
            expect(requiredValidator('foo', ERROR_MESSAGE)).toBe('');
        });

        it('should handle an array as a value correctly', () => {
            expect(requiredValidator([], ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
            expect(requiredValidator(['foo'], ERROR_MESSAGE)).toBe('');
        });

        it('should handle null as a value correctly', () => {
            expect(requiredValidator(null, ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
        });
    });
});

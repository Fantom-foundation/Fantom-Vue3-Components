import { describe, it, expect } from 'vitest';
import { fileTypeValidator, maxFileSizeValidator, requiredValidator } from '@/utils/validators/validators.js';

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

    describe('fileTypeValidator()', () => {
        it('should handle accept MIME type string, with no extensions, correctly', () => {
            expect(fileTypeValidator('text/html', 'text/html', ERROR_MESSAGE)).toBe('');
            expect(fileTypeValidator('text/html', 'application/pdf', ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
        });

        it('should handle accept types with case-insensitive filename extension, starting with a period, correctly', () => {
            expect(fileTypeValidator('image/png', '.png', ERROR_MESSAGE)).toBe('');
            expect(fileTypeValidator('image/png', '.JPG', ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
        });

        it('should handle accept types with asterix correctly', () => {
            expect(fileTypeValidator('image/jpeg', 'image/*', ERROR_MESSAGE)).toBe('');
            expect(fileTypeValidator('text/html', 'image/*', ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
        });

        it('should handle more than one type, separated by a comma, correctly', () => {
            expect(fileTypeValidator('image/jpeg', 'image/*,.pdf,text/html', ERROR_MESSAGE)).toBe('');
            expect(fileTypeValidator('application/pdf', 'image/*,.pdf,text/html', ERROR_MESSAGE)).toBe('');
            expect(fileTypeValidator('text/html', 'image/*,.pdf,text/html', ERROR_MESSAGE)).toBe('');

            expect(fileTypeValidator('video/x-msvideo', 'image/*,.pdf,text/html', ERROR_MESSAGE)).toBe(ERROR_MESSAGE);
        });
    });

    describe('maxFileSizeValidator()', () => {
        it('should return empty string (no error message) if arguments are not valid', () => {
            expect(maxFileSizeValidator()).toBe('');
        });

        it('should check if size of a file does not exceed given size limit', () => {
            expect(maxFileSizeValidator(1000000, [{ size: 1000 }, { size: 1000000 }], ERROR_MESSAGE)).toBe('');
            expect(maxFileSizeValidator(1000000, [{ size: 1000 }, { size: 1000001 }], ERROR_MESSAGE)).toBe(
                ERROR_MESSAGE
            );
        });
    });
});

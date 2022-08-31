import { translations } from '../../mixins/translations.js';
import { isArray } from '../index.js';

/**
 * @param {*} value
 * @param {string} [errorMessage]
 * @return {string} Error message -> non-empty string, if validation fails
 */
export function requiredValidator(value, errorMessage = translations.translate('requiredField')) {
    let isValid = true;

    if (typeof value === 'string') {
        isValid = !!value.trim();
    } else if (isArray(value)) {
        isValid = value.length > 0;
    } else if (value === null) {
        isValid = false;
    }

    return isValid ? '' : errorMessage;
}

/**
 * @param {string} mimeType
 * @param {string} accept Mime type to be accepted
 * @return {boolean}
 */
function validateFileType(mimeType, accept) {
    const mimeTypeSplitted = mimeType.split('/');
    const acceptSplitted = accept.split('/');
    let isValid = true;

    if (accept.startsWith('.')) {
        isValid = mimeTypeSplitted[1] && mimeTypeSplitted[1].indexOf(accept.slice(1)) > -1;
    } else if (acceptSplitted[1] === '*') {
        isValid = mimeTypeSplitted[0] === acceptSplitted[0];
    } else if (mimeType !== accept) {
        isValid = false;
    }

    return isValid;
}

/**
 * @param {string} mimeType
 * @param {string} accept Mime type(s) to be accepted
 * @param {string} [errorMessage]
 * @return {string} Error message -> non-empty string, if validation fails
 */
export function fileTypeValidator(mimeType, accept, errorMessage = translations.translate('validators.badFileType')) {
    const type = mimeType.trim().toLowerCase();
    const acceptTypes = accept
        .toLowerCase()
        .split(',')
        .map((type) => type.trim());
    let isValid = true;

    if (type && acceptTypes.length > 0) {
        for (let i = 0, len = acceptTypes.length; i < len; i++) {
            isValid = validateFileType(type, acceptTypes[i]);

            if (isValid) {
                break;
            }
        }
    }

    return isValid ? '' : errorMessage;
}

export function maxFileSizeValidator(
    maxSize = 0,
    files = [],
    errorMessage = translations.translate('validators.fileSizeLimitExceed')
) {
    let isValid = true;

    if (maxSize > 0 && files.length > 0) {
        for (let i = 0, len = files.length; i < len; i++) {
            if (files[i].size > maxSize) {
                isValid = false;
                break;
            }
        }
    }

    return isValid ? '' : errorMessage;
}

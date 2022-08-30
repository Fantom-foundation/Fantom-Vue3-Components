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
 * @param {string} accept Mime type(s) to be accepted
 * @param {string} [errorMessage]
 * @return {string} Error message -> non-empty string, if validation fails
 */
export function fileTypeValidator(mimeType, accept, errorMessage = 'Bad file type') {
    const type = mimeType.trim().toLowerCase();
    const acceptTypes = accept
        .toLowerCase()
        .split(',')
        .map((type) => type.trim());
    let acceptS = '';
    let typeSplitted = [];
    let acceptSplitted = [];
    let isValid = true;

    if (type && acceptTypes.length > 0) {
        for (let i = 0, len = acceptTypes.length; i < len; i++) {
            acceptS = acceptTypes[i];

            isValid = true;
            typeSplitted = type.split('/');
            acceptSplitted = acceptS.split('/');

            if (acceptS.startsWith('.')) {
                if (typeSplitted.length !== 2 || typeSplitted[1].indexOf(acceptS.slice(1)) === -1) {
                    isValid = false;
                }
            } else if (acceptSplitted[1] === '*') {
                if (typeSplitted[0] !== acceptSplitted[0]) {
                    isValid = false;
                }
            } else if (type !== acceptS) {
                isValid = false;
            }

            if (isValid) {
                break;
            }
        }
    }

    return isValid ? '' : errorMessage;
}

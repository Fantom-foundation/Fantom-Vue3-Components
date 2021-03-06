import { translations } from '../mixins/translations.js';
import { isArray } from '../utils/index.js';

export function requiredValidator(value, errMessage = translations.translate('requiredField')) {
    if (typeof value === 'string') {
        return !value.trim() ? errMessage : '';
    } else if (isArray(value)) {
        return value.length === 0 ? errMessage : '';
    } else if (value === null) {
        return errMessage;
    }

    return '';
}

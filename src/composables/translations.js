import { getNestedProp } from '../utils';
import { ref } from 'vue';

class Translations {
    constructor() {
        /** Keys are language codes, values are tranlsation objects */
        this.translations = {};
        /** Current locale */
        this.locale = {
            code: '',
        };
    }

    /**
     * Add new translations
     *
     * @param {string} _locale
     * @param {object} _translations
     */
    add(_locale, _translations) {
        this.translations[_locale] = _translations;
    }

    /**
     * @param {string} [_locale]
     */
    setLocale(_locale = 'en') {
        if (_locale in this.translations) {
            this.locale.code = _locale;
        }
    }

    /**
     * Get translation by code
     *
     * @param {string} _tCode
     * @return {string}
     */
    translate(_tCode) {
        const translations = this.translations[this.locale.code];
        const translation = translations ? getNestedProp(translations, _tCode) : '';

        if (!translation) {
            console.warn(`No translation for '${_tCode}' and for locale ${this.locale.code} exists.`);
        }

        return translation || _tCode;
    }
}

export const translations = new Translations();

export function useTranslations() {
    let _locale_ = ref(translations.locale);

    function translate(_tCode) {
        return translations.translate(_tCode);
    }

    return {
        _locale_,
        translate,
    };
}

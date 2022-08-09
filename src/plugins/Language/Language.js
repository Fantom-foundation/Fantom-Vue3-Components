import { ref } from 'vue';
import { getLanguageCode } from '../../utils/index.js';

export class Language {
    #languages = [];
    #defaultLanguage = '';
    #language = ref('en');
    // i18n plugin
    #i18n = null;
    // fantom vue3 components translations
    #translations = null;

    /**
     * @param {array} languages
     * @param {Ref} [languageRef]
     * @param {VueI18n} [i18n]
     * @param {Translations} [translations]
     * @param {string} [defaultLanguage]
     */
    setup({ languages = [], languageRef = null, i18n = null, translations = null, defaultLanguage = 'en' }) {
        this.#languages = languages;
        this.#defaultLanguage = defaultLanguage;
        this.#i18n = i18n;
        this.#translations = translations;

        if (languageRef) {
            this.#language = languageRef;
        }
    }

    /**
     * @param {string} languageCode
     * @param {boolean} [reloadPage]
     */
    setLanguage(languageCode = '', reloadPage = false) {
        let langCode = languageCode || this.#language.value || getLanguageCode();

        if (!this.#findLanguageByCode(langCode)) {
            langCode = this.#defaultLanguage;
        }

        if (this.#translations) {
            this.#translations.setLocale(langCode);
        }

        if (this.#i18n) {
            this.#i18n.setLanguage(langCode, reloadPage);
        }

        this.#setDirAttribute(langCode);

        this.#language.value = langCode;
    }

    /**
     * @return {*[]}
     */
    get languages() {
        return this.#languages;
    }

    /**
     * @return {UnwrapRef<string>}
     */
    get language() {
        return this.#language.value;
    }

    #setDirAttribute(langCode = '') {
        const lang = this.#findLanguageByCode(langCode);

        if (lang) {
            if (lang.rtl) {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = '';
            }
        }
    }

    /**
     * @param {string} languageCode
     * @return {*}
     */
    #findLanguageByCode(languageCode) {
        return this.#languages.find((language) => language.value === languageCode);
    }
}

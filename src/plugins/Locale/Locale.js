import { ref } from 'vue';
import { getLanguageCode } from '../../utils/index.js';

export class Locale {
    #locales = [];
    #tag = ref('en');
    #defaultLanguage = '';
    #rtlDirection = ref(false);
    /** @type {VueI18n} */
    #i18n = null;
    /** @type {Translations} */
    #translations = null;
    /** @type {Formatters} */
    #formatters = null;

    /**
     * @param {{tag: string, label: string: options: Object}[]} locales
     * @param languageRef
     * @param rtlDirectionRef
     * @param {string} defaultLanguage
     * @param {VueI18n} i18n
     * @param {Translations} translations
     * @param {Formatters} formatters
     */
    setup({
        locales = [],
        languageRef = null,
        rtlDirectionRef = null,
        defaultLanguage = 'en',
        i18n = null,
        translations = null,
        formatters = null,
    }) {
        this.#locales = locales;
        this.#defaultLanguage = defaultLanguage;
        this.#i18n = i18n;
        this.#translations = translations;
        this.#formatters = formatters;

        if (languageRef) {
            this.#tag = languageRef;
        }

        if (rtlDirectionRef) {
            this.#rtlDirection = rtlDirectionRef;
        }
    }

    /**
     * @param {string} tag
     * @param {boolean} [reloadPage]
     */
    async setLocale(tag = '', reloadPage = false) {
        let localeTag = tag || this.#tag.value || getLanguageCode();

        if (!this.#findLocaleByTag(localeTag)) {
            localeTag = this.#defaultLanguage;
        }

        if (this.#translations) {
            this.#translations.setLocale(localeTag);
        }

        if (this.#formatters) {
            this.#formatters.setLocale(localeTag);
        }

        this.#setDirAttribute(localeTag);

        this.#tag.value = localeTag;

        if (this.#i18n) {
            await this.#i18n.setLanguage(localeTag, reloadPage);
        }
    }

    /**
     * @param {'rtl'|'ltr'} [direction]
     */
    setTextDirection(direction = '') {
        const dir = direction || (this.#rtlDirection.value ? 'rtl' : 'ltr');

        if (dir === 'rtl') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.removeAttribute('dir');
        }

        this.#rtlDirection.value = dir === 'rtl';
    }

    /**
     * @return {{label: string, value: string}[]}
     */
    get languages() {
        return this.#locales.map((locale) => ({
            label: locale.label,
            value: locale.tag,
        }));
    }

    /**
     * @return {UnwrapRef<string>}
     */
    get tag() {
        return this.#tag.value;
    }

    /**
     * @return {UnwrapRef<boolean>}
     */
    get rtlDirection() {
        return this.#rtlDirection.value;
    }

    #setDirAttribute(localeTag = '') {
        const locale = this.#findLocaleByTag(localeTag);

        if (locale) {
            this.setTextDirection(locale?.options?.rtl ? 'rtl' : '');
        }
    }

    /**
     * @param {string} localeTag
     * @return {*}
     */
    #findLocaleByTag(localeTag) {
        return this.#locales.find((locale) => locale.tag === localeTag);
    }
}

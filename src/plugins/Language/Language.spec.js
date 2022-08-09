import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Language } from './Language.js';
import { spyNavigatorLanguages } from '@/test/mocks/language.js';
import { ref } from 'vue';

class I18nMock {
    setLanguage() {}
}

class TranslationsMock {
    setLocale() {}
}

let language = null;
const LANGUAGES = [
    { label: 'English', value: 'en' },
    { label: 'Cesky', value: 'cs' },
    { label: 'دری', value: 'fa', rtl: true },
];
const i18n = new I18nMock();
const translations = new TranslationsMock();

function createLanguage({ languages = LANGUAGES, languageRef = ref('en') } = {}) {
    language = new Language();
    language.setup({
        languages,
        languageRef,
        i18n,
        translations,
    });
}

function destroyLanguage() {
    language = null;
}

beforeEach(() => {
    createLanguage();
});

afterEach(() => {
    destroyLanguage();
});

describe('Language', () => {
    it('should return an array of languages', () => {
        expect(language.languages).toEqual(LANGUAGES);
    });

    it('should get currently selected language', () => {
        expect(language.language).toBe('en');
    });

    it('should set language from the browser if no language code or value from the app store is given', () => {
        destroyLanguage();
        createLanguage({ languageRef: ref('') });
        spyNavigatorLanguages(['cs-CZ', 'cs']);

        language.setLanguage();

        expect(language.language).toBe('cs');
    });

    it('should set language by given code', () => {
        language.setLanguage('cs');

        expect(language.language).toBe('cs');
    });

    it('should set language of i18n plugin as well', () => {
        const spySetLanguage = vi.spyOn(i18n, 'setLanguage');

        language.setLanguage('cs');

        expect(spySetLanguage).toBeCalledWith('cs', false);
    });

    it('should set language of fantom vue3 components as well', () => {
        const spySetLocale = vi.spyOn(translations, 'setLocale');

        language.setLanguage('cs');

        expect(spySetLocale).toBeCalledWith('cs');
    });

    it('should set default language as currently selected language if given language is not found in languages list', () => {
        language.setLanguage('es');

        expect(language.language).toBe('en');
    });

    it('should set rtl direction if selected language has `rtl` atrribute', () => {
        language.setLanguage('fa');

        expect(document.documentElement.dir).toBe('rtl');
    });
});

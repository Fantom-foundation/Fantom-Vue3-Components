import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref } from 'vue';
import { Locale } from './Locale.js';
import { spyNavigatorLanguages } from '@/test/mocks/language.js';

class I18nMock {
    async setLanguage() {}
}

class TranslationsMock {
    setLocale() {}
}

class FormattersMock {
    setLocale() {}
}

let locale = null;
const LOCALES = [
    { tag: 'en', label: 'English' },
    { tag: 'cs', label: 'Česky' },
    { tag: 'fa', label: 'دری', options: { rtl: true } },
];
const i18n = new I18nMock();
const translations = new TranslationsMock();
const formatters = new FormattersMock();

function createLocale({ locales = LOCALES, languageRef = ref('en'), rtlDirectionRef = null } = {}) {
    locale = new Locale();
    locale.setup({
        locales,
        languageRef,
        rtlDirectionRef,
        i18n,
        translations,
        formatters,
    });
}

function destroyLocale() {
    locale = null;
}

beforeEach(() => {
    createLocale();
});

afterEach(() => {
    destroyLocale();
});

describe('Locale', () => {
    it('should get currently selected locale', () => {
        expect(locale.tag).toBe('en');
    });

    it('should return an array of languages', () => {
        expect(locale.languages).toEqual([
            { label: 'English', value: 'en' },
            { label: 'Česky', value: 'cs' },
            { label: 'دری', value: 'fa' },
        ]);
    });

    it('should get info whether text direction is rtl or not', () => {
        expect(locale.rtlDirection).toBe(false);
    });

    it('should set language from the browser if no language code or value from the app store is given', async () => {
        destroyLocale();
        createLocale({ languageRef: ref('') });
        spyNavigatorLanguages(['cs-CZ', 'cs']);

        await locale.setLocale();

        expect(locale.tag).toBe('cs');
    });

    it('should set locale by given tag', async () => {
        await locale.setLocale('cs');

        expect(locale.tag).toBe('cs');
    });

    it('should set language of i18n plugin as well', async () => {
        const spySetLanguage = vi.spyOn(i18n, 'setLanguage');

        await locale.setLocale('cs');

        expect(spySetLanguage).toBeCalledWith('cs', false);
    });

    it('should set locale of fantom vue3 components as well', async () => {
        const spySetLocale = vi.spyOn(translations, 'setLocale');

        locale.setLocale('cs');

        expect(spySetLocale).toBeCalledWith('cs');
    });

    it('should set locale of Formatters as well', async () => {
        const spySetLocale = vi.spyOn(formatters, 'setLocale');

        await locale.setLocale('cs');

        expect(spySetLocale).toBeCalledWith('cs');
    });

    it('should set default locale as currently selected locale if given locale is not found in locale list', async () => {
        await locale.setLocale('es');

        expect(locale.tag).toBe('en');
    });

    it('should set rtl direction', () => {
        locale.setTextDirection('rtl');

        expect(document.documentElement.dir).toBe('rtl');
    });

    it('should set rtl direction from the ref if no direction is given', () => {
        const rtlDirectionRef = ref(true);
        destroyLocale();
        createLocale({ rtlDirectionRef });
        locale.setTextDirection();

        expect(document.documentElement.dir).toBe('rtl');
    });

    it('should set rtl direction ref if text direction is set to rtl', () => {
        const rtlDirectionRef = ref(false);
        destroyLocale();
        createLocale({ rtlDirectionRef });

        locale.setTextDirection('rtl');

        expect(rtlDirectionRef.value).toBe(true);
    });

    it('should set rtl direction if selected locale has `rtl` atrribute', async () => {
        await locale.setLocale('fa');

        expect(document.documentElement.dir).toBe('rtl');
    });
});

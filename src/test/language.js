export function TEST_LANGUAGES() {
    return [
        { label: 'English', value: 'en' },
        { label: 'Cesky', value: 'cs' },
        { label: 'دری', value: 'fa', rtl: true },
    ];
}

export function TEST_TRANSLATIONS() {
    return {
        en: {
            hello: 'Hello',
        },
        cs: {
            hello: 'Ahoj',
        },
    };
}

export function mockI18n(_i18n) {
    return {
        i18n: {
            setLanguage(langCode) {
                _i18n.setLanguage(langCode);
            },
        },
    };
}

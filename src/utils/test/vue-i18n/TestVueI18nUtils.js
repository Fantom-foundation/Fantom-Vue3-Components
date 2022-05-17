export class TestVueI18nUtils {
    /**
     * @param {VueI18n} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
    }

    /**
     * @param {Object} options
     * @return {Object}
     */
    addVueI18nPlugin(options) {
        if (!options.global) {
            options.global = {};
        }

        if (!options.global.mocks) {
            options.global.mocks = {};
        }

        if (!Array.isArray(options.global.plugins)) {
            options.global.plugins = [];
        }

        options.global.plugins.push(this.i18n);
        options.global.mocks.$t = this.i18n.global.t;

        return options;
    }
}

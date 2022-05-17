import { vi } from 'vitest';

export class TestPiniaUtils {
    /**
     * @param {function} createTestingPinia
     */
    constructor(createTestingPinia) {
        this.createTestingPinia = createTestingPinia;
    }

    /**
     * @param {Object} options
     * @param {Object} piniaOptions
     * @return {{}}
     */
    addPiniaPlugin(options = {}, piniaOptions = {}) {
        if (!options.global) {
            options.global = {};
        }

        if (!Array.isArray(options.global.plugins)) {
            options.global.plugins = [];
        }

        options.global.plugins.push(this.createTestingPiniaPlugin(piniaOptions));

        return options;
    }

    /**
     * @param {Object} options
     * @return {*}
     */
    createTestingPiniaPlugin(options = { createSpy: vi.fn }) {
        return this.createTestingPinia(options);
    }
}

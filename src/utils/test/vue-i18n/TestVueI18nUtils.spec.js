import { describe, it, expect, beforeEach } from 'vitest';
import { TestVueI18nUtils } from './TestVueI18nUtils.js';

let i18n;
let testVueI18nUtils;

class VueI18nMock {
    constructor() {
        this.global = {
            $t: () => {},
        };
    }
}

beforeEach(() => {
    i18n = new VueI18nMock();
    testVueI18nUtils = new TestVueI18nUtils(i18n);
});

describe('TestVueI18nUtils', () => {
    describe('#addVueI18nPlugin', () => {
        it('should add vue i18n plugin to empty object', () => {
            let options = {};

            const result = testVueI18nUtils.addVueI18nPlugin(options);

            expect(result).toEqual({
                global: {
                    plugins: [i18n],
                    mocks: {
                        $t: i18n.global.t,
                    },
                },
            });
        });

        it('should add vue i18n plugin to object with `global` property', () => {
            let options = {
                global: {
                    foo: 'foo',
                },
            };

            const result = testVueI18nUtils.addVueI18nPlugin(options);

            expect(result).toEqual({
                global: {
                    foo: 'foo',
                    plugins: [i18n],
                    mocks: {
                        $t: i18n.global.t,
                    },
                },
            });
        });

        it('should add vue i18n plugin to object with another plugin and mock', () => {
            let options = {
                global: {
                    plugins: ['foo'],
                    mocks: {
                        foo: 'foo',
                    },
                },
            };

            const result = testVueI18nUtils.addVueI18nPlugin(options);

            expect(result).toEqual({
                global: {
                    plugins: ['foo', i18n],
                    mocks: {
                        foo: 'foo',
                        $t: i18n.global.t,
                    },
                },
            });
        });
    });
});

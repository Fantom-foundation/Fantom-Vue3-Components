import { describe, it, expect, beforeEach } from 'vitest';
import { TestPiniaUtils } from './TestPiniaUtils.js';

let pinia;
let testPiniaUtils;

beforeEach(() => {
    testPiniaUtils = new TestPiniaUtils(() => {});
    pinia = testPiniaUtils.createTestingPiniaPlugin();
});

describe('TestPiniaUtils', () => {
    it('should add pinia plugin to empty object', () => {
        let options = {};

        const result = testPiniaUtils.addPiniaPlugin(options);

        expect(JSON.stringify(result)).toEqual(
            JSON.stringify({
                global: {
                    plugins: [pinia],
                },
            })
        );
    });

    it('should add pinia plugin to object with `global` property', () => {
        let options = {
            global: {
                foo: 'foo',
            },
        };

        const result = testPiniaUtils.addPiniaPlugin(options);

        expect(JSON.stringify(result)).toEqual(
            JSON.stringify({
                global: {
                    foo: 'foo',
                    plugins: [pinia],
                },
            })
        );
    });

    it.skip('should add pinia plugin to object with another plugin', () => {
        let options = {
            global: {
                plugins: ['foo'],
            },
        };

        const result = testPiniaUtils.addPiniaPlugin(options);

        expect(JSON.stringify(result)).toEqual(
            JSON.stringify({
                global: {
                    plugins: ['foo', pinia],
                },
            })
        );
    });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { TestRouterUtils } from './TestRouterUtils.js';
import { vi } from 'vitest';

class RouterMock {
    push() {}
    async isReady() {}
}

let router;
let testRouterUtils;

beforeEach(() => {
    router = new RouterMock();
    testRouterUtils = new TestRouterUtils(router);
});

describe('TestRouterUtils', () => {
    describe('#push', () => {
        it('should call "push" method on the given router', () => {
            const pushSpy = vi.spyOn(router, 'push');

            testRouterUtils.push('/');

            expect(pushSpy).toHaveBeenCalledWith('/');
        });
    });

    describe('#addRouterPlugin', () => {
        it('should add router plugin to empty object', () => {
            let options = {};

            const result = testRouterUtils.addRouterPlugin(options);

            expect(result).toEqual({
                global: {
                    plugins: [router],
                },
            });
        });

        it('should add router plugin to object with `global` property', () => {
            let options = {
                global: {
                    foo: 'foo',
                },
            };

            const result = testRouterUtils.addRouterPlugin(options);

            expect(result).toEqual({
                global: {
                    foo: 'foo',
                    plugins: [router],
                },
            });
        });

        it('should add router plugin to object with another plugin', () => {
            let options = {
                global: {
                    plugins: ['foo'],
                },
            };

            const result = testRouterUtils.addRouterPlugin(options);

            expect(result).toEqual({
                global: {
                    plugins: ['foo', router],
                },
            });
        });
    });
});

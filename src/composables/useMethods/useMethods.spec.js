import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useMethods } from './useMethods.js';

const ID = 'testid';
let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useMethods(ID, true) });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useMethods', () => {
    it('should return `getMethods` function that returns object with stored methods for given id', () => {
        const testMethod = () => {};

        composableResult.registerMethods({
            testMethod,
        });

        const { testMethod: testMethodRet } = useMethods(ID, false, true).getMethods();

        expect(testMethodRet).toEqual(testMethod);
    });

    it('should return function `registerMethods` that registers methods of a component by its id', () => {
        const testMethodSpy = vi.fn(() => {});
        composableResult.registerMethods({
            testMethod: testMethodSpy,
        });

        const { testMethod } = useMethods(ID, false, true).getMethods();
        testMethod();

        expect(testMethodSpy).toHaveBeenCalled();
    });

    it('should return function `unregisterMethods` that unregisters methods of a component by its id', () => {
        const testMethodSpy = vi.fn(() => {});
        composableResult.registerMethods({
            testMethod: testMethodSpy,
        });

        composableResult.unregisterMethods(ID);

        const { testMethod } = useMethods(ID, false, true).getMethods();

        expect(testMethod).toBeUndefined();
    });

    it('should delete registered methods on `onUnmounted` hook', () => {
        composableResult.registerMethods({
            testMethod: () => {},
        });

        app.unmount();

        const { testMethod } = useMethods(ID, false, true).getMethods();
        expect(testMethod).toBeUndefined();
    });
});

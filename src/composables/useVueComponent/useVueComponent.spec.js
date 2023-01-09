import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useVueComponent } from './useVueComponent.js';
import { useMethods } from '@/composables/index.js';

const ID = 'testid';
let testMethodSpy = null;

const testMethod = (num) => {
    return num + 1;
};

beforeEach(() => {
    const { registerMethods } = useMethods(ID);
    testMethodSpy = vi.fn(testMethod);

    registerMethods({ testMethod: testMethodSpy });
});

afterEach(() => {
    const { unregisterMethods } = useMethods(ID);

    unregisterMethods(ID);
    vi.restoreAllMocks();
    testMethodSpy = null;
});

describe('useVueComponent', () => {
    it('should be able to call registered method on returned proxy', () => {
        const component = useVueComponent(ID);

        component.testMethod(1, 'abc');

        expect(testMethodSpy).toBeCalledWith(1, 'abc');
        expect(testMethodSpy).toReturnWith(2);
    });

    it('should throw an error if called method does not exists', () => {
        const component = useVueComponent(ID);

        expect(() => {
            component.foo();
        }).toThrowError(new Error(`Method 'foo' doesn't exists for the component with the id '${ID}'`));
    });
});

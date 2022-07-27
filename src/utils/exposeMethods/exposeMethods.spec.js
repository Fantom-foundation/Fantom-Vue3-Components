import { describe, it, expect, vi } from 'vitest';
import { exposeMethods } from '@/utils/exposeMethods/exposeMethods.js';
import { ref } from 'vue';

describe('exposeMethods', () => {
    it('should return object where keys are given method names and values are functions', () => {
        const component = ref({
            method: () => {},
        });

        const value = exposeMethods(component, ['method']);

        expect(typeof value.method === 'function').toBe(true);
    });

    it("should call given component's methods", () => {
        const method1 = vi.fn(() => {});
        const method2 = vi.fn(() => {
            return 'foo';
        });
        const method3 = vi.fn(() => {});
        const component = ref({
            method1,
            method2,
        });

        const value = exposeMethods(component, ['method1', 'method2', 'method3']);

        value.method1();
        value.method2('foo');

        expect(method1).toHaveBeenCalled();
        expect(method2).toHaveBeenCalledWith('foo');
        expect(method3).not.toHaveBeenCalled();
        expect(value.method2()).toBe('foo');
    });
});

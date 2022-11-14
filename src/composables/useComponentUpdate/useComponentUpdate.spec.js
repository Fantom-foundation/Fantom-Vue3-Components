import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useComponentUpdate } from './useComponentUpdate.js';

let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useComponentUpdate() });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useComponentUpdate', () => {
    it('should register functions and call them if `udpateComponents` is called', () => {
        const testFunc1 = vi.fn();
        const testFunc2 = vi.fn();

        composableResult.onComponentUpdate('componentId1', testFunc1);
        composableResult.onComponentUpdate('componentId2', testFunc2);

        const { updateComponents } = useComponentUpdate();
        updateComponents(['componentId1', 'componentId2']);

        expect(testFunc1).toHaveBeenCalled();
        expect(testFunc2).toHaveBeenCalled();
    });

    it('should unregister registered functions when compoent is unmounted', () => {
        const testFunc1 = vi.fn();

        composableResult.onComponentUpdate('componentId1', testFunc1);

        app.unmount();

        const { updateComponents } = useComponentUpdate();
        updateComponents(['componentId1']);

        expect(testFunc1).toHaveBeenCalledTimes(0);
    });
});

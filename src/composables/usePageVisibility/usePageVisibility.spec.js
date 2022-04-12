import { test, beforeEach, afterEach, expect, vi } from 'vitest';
import { usePageVisibility } from './usePageVisibility.js';
import { withSetup } from '../../test/utils.js';
import { setPageVisibility, spyPageVisibility } from '../../test/mocks/page-visibility.js';

let eventListener = null;

beforeEach(() => {
    eventListener = spyPageVisibility().eventListener;
});

afterEach(() => {
    vi.restoreAllMocks();
});

test('usePageVisibility', () => {
    const { composableResult, app } = withSetup({
        composable: usePageVisibility,
    });
    const isPageVisible = composableResult.isPageVisible;

    expect(isPageVisible.value).toBe(true);

    setPageVisibility('hidden', eventListener);

    expect(isPageVisible.value).toBe(false);

    app.unmount();
});

import { test, beforeEach, afterEach, expect, vi } from 'vitest';
import { usePageVisibility } from './page-visibility.js';
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
    const { composableResult } = withSetup(usePageVisibility);

    expect(composableResult.isPageVisible.value).toBe(true);

    setPageVisibility('hidden', eventListener);

    expect(composableResult.isPageVisible.value).toBe(false);
});

import { describe, it, beforeEach, afterEach, beforeAll, afterAll, expect, vi } from 'vitest';
// import { usePageVisibility } from './usePageVisibility.js';
import { withSetup } from '../../test/utils.js';
import { Interval } from '../../utils/interval/Interval.js';
import { useInterval } from './useInterval.js';
import { setPageVisibility, spyPageVisibility } from '../../test/mocks/page-visibility.js';
import { nextTick } from 'vue';

let eventListener = null;

let fn = null;

beforeAll(() => {
    eventListener = spyPageVisibility().eventListener;
});

afterAll(() => {
    eventListener = spyPageVisibility().eventListener;
    vi.restoreAllMocks();
});

beforeEach(() => {
    vi.useFakeTimers();
    fn = vi.fn();
});

afterEach(() => {
    fn.mockRestore();
    fn = null;
});

describe('useInterval', () => {
    it('should return instance of Interval class', () => {
        const { composableResult, app } = withSetup({ composable: useInterval });

        expect(composableResult.interval instanceof Interval).toBe(true);

        app.unmount();
    });

    it('should pause all intervals if page is not visible and argument `pauseWhenPageIsHidden` is set to `true`', async () => {
        const { composableResult, app } = withSetup({ composable: () => useInterval(true) });
        const interval = composableResult.interval;

        interval.start('code', fn, 100);
        vi.advanceTimersByTime(200);

        setPageVisibility('hidden', eventListener);
        await nextTick();
        vi.advanceTimersByTime(200);
        expect(fn).toBeCalledTimes(2);

        app.unmount();
    });

    it('should resume all paused intervals if page is visible again and argument  `pauseWhenPageIsHidden` is set to `true`', async () => {
        const { composableResult, app } = withSetup({ composable: () => useInterval(true) });
        const interval = composableResult.interval;

        setPageVisibility('hidden', eventListener);
        await nextTick();

        interval.start('code', fn, 100);
        vi.advanceTimersByTime(200);
        expect(fn).toBeCalledTimes(0);

        setPageVisibility('visible', eventListener);
        await nextTick();
        vi.advanceTimersByTime(200);
        expect(fn).toBeCalledTimes(2);

        app.unmount();
    });
});

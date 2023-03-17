import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Interval } from './Interval.js';

let interval = null;
let fn = null;

function destroyInterval() {
    if (interval) {
        interval.destroy();
        interval = null;
    }
}

beforeEach(() => {
    vi.useFakeTimers();
    fn = vi.fn();
    interval = new Interval();
});

afterEach(() => {
    destroyInterval();

    vi.useRealTimers();
    vi.restoreAllMocks();
    fn = null;
});

describe('Interval', () => {
    it('should be able to start calling given function repeatedly', () => {
        interval.start('code', fn, 100);

        vi.advanceTimersByTime(200);

        expect(fn).toBeCalledTimes(2);
    });

    it('should throw an exception if interval is started and given function is not a function', () => {
        expect(() => {
            interval.start('code');
        }).toThrow();
    });

    it('should be able to start calling given function repeatedly by default amount of milliseconds, if `interval` argument is not given', () => {
        destroyInterval();

        interval = new Interval({
            interval: 100,
        });

        interval.start('code', fn);

        vi.advanceTimersByTime(200);

        expect(fn).toBeCalledTimes(2);
    });

    it('should call given function immediately if `immediate` arg is true', () => {
        destroyInterval();
        interval = new Interval();

        interval.start('code', fn, 100, true);

        expect(fn).toBeCalledTimes(1);
    });

    it('should be able to stop calling function by given code', () => {
        interval.start('code', fn, 100);

        vi.advanceTimersByTime(200);

        interval.stop('code');

        vi.advanceTimersByTime(200);

        expect(fn).toBeCalledTimes(2);
    });

    it('should be able to pause calling function by given code', () => {
        interval.start('code', fn, 100);

        vi.advanceTimersByTime(200);

        interval.pause('code');

        vi.advanceTimersByTime(200);

        expect(fn).toBeCalledTimes(2);
    });

    it('should be able to resume calling function by given code', () => {
        interval.start('code', fn, 100);

        vi.advanceTimersByTime(200);

        interval.pause('code');

        vi.advanceTimersByTime(500);

        interval.resume('code');

        vi.advanceTimersByTime(100);

        expect(fn).toBeCalledTimes(3);
    });

    it('should properly handle multiple intervals', () => {
        const fn2 = vi.fn();

        interval.start('code1', fn, 100);
        interval.start('code2', fn2, 200);

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);

        interval.pause('code1');
        interval.pause('code2');

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);

        interval.resume('code1');
        interval.resume('code2');

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(8);
        expect(fn2).toBeCalledTimes(4);

        interval.stop('code1');
        interval.stop('code2');

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(8);
        expect(fn2).toBeCalledTimes(4);
    });

    it('should stop all intervals by calling `stopAll` method', () => {
        const fn2 = vi.fn();

        interval.start('code1', fn, 100);
        interval.start('code2', fn2, 200);

        vi.advanceTimersByTime(400);

        interval.stopAll();

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);
    });

    it('should pause all intervals by calling `pauseAll` method', () => {
        const fn2 = vi.fn();

        interval.start('code1', fn, 100);
        interval.start('code2', fn2, 200);

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);

        interval.pauseAll();

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);
    });

    it('should pause all intervals when `pauseAll` method was called before intervals were started', () => {
        const fn2 = vi.fn();

        interval.pauseAll();

        interval.start('code1', fn, 100);
        interval.start('code2', fn2, 200);

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(0);
        expect(fn2).toBeCalledTimes(0);
    });

    it('should resume all intervals by calling `resumeAll` method', () => {
        const fn2 = vi.fn();

        interval.start('code1', fn, 100);
        interval.start('code2', fn2, 200);

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);

        interval.pauseAll();

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(4);
        expect(fn2).toBeCalledTimes(2);

        interval.resumeAll();

        vi.advanceTimersByTime(400);

        expect(fn).toBeCalledTimes(8);
        expect(fn2).toBeCalledTimes(4);
    });
});

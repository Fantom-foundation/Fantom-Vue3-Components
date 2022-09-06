/**
 * Utility functions related to Function
 */

import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { debounce, delay, isFunction, throttle } from './function.js';
import { callFunctionNTimes } from '@/test/utils.js';

beforeAll(() => {
    vi.useFakeTimers();
});

afterAll(() => {
    vi.useRealTimers();
});

describe('Function utilities', () => {
    describe('#isFunction', () => {
        it('should return true if given argument is a function', () => {
            expect(isFunction(() => {})).to.be.true;
        });

        it('should return false if given argument is not a function', () => {
            expect(isFunction()).to.be.false;
            expect(isFunction('string')).to.be.false;
            expect(isFunction(1)).to.be.false;
            expect(isFunction(null)).to.be.false;
        });
    });

    describe('#delay', () => {
        const wait = 50;

        it('should throw an exception if passed argument is not a positive integer', () => {
            const errMessage = 'Passed argument is not a positive integer';

            expect(() => {
                delay('50');
            }).to.throw(errMessage);

            expect(() => {
                delay({});
            }).to.throw(errMessage);
        });

        it('should return a Promise', () => {
            const p = delay(wait);

            vi.runAllTimers();

            expect(p).to.be.a('promise');
        });

        it('should wait `n` milliseconds', () => {
            const t = Date.now();

            delay(wait);
            vi.advanceTimersByTime(wait + 10);

            expect(Date.now() - t).to.be.greaterThan(wait);
        });
    });

    describe('#debounce', () => {
        const wait = 50;
        let spyFunc = null;

        beforeEach(() => {
            spyFunc = vi.fn(() => {});
        });

        it('should throw an exception if no `func` function is given', () => {
            expect(debounce).to.throw('Argument `func` is not a function');
        });

        it('should throw an exception if `wait` argument is not a positive integer', () => {
            const errMessage = 'Argument `wait` is not a positive integer';

            expect(() => {
                debounce(spyFunc, -12);
            }).to.throw(errMessage);
        });

        it('should throw an exception if `maxWait` argument is not a positive integer', () => {
            const errMessage = 'Argument `maxWait` is not a positive integer';

            expect(() => {
                debounce(spyFunc, 0, false, false, -12);
            }).to.throw(errMessage);
        });

        it('should return a function that, when called, calls the `func` function and pass given arguments to it', () => {
            const func = debounce(spyFunc, 0, false);

            func('arg1', 'arg2');

            expect(func).to.be.a('function');
            expect(spyFunc).toHaveBeenCalledWith('arg1', 'arg2');
        });

        // `.` = returned function call, `x` = `func` function call
        // ...x ...x
        it('should return a function that, when called, calls the `func` function after `wait` milliseconds if the returned function was not called before `wait` milliseconds when the `trailing` parameter is set to `true`', () => {
            const func = debounce(spyFunc, wait, true);

            callFunctionNTimes(func, 4, wait / 3);
            vi.advanceTimersByTime(1000);
            callFunctionNTimes(func, 4, wait / 3);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(2);
        });

        // x... x...
        it('should return a function that, when called, calls the `func` function immediately and then it calls `func` only if returned function was called after `wait` milliseconds when the `leading` parameter is set to `true`', () => {
            const func = debounce(spyFunc, wait, false, true);

            callFunctionNTimes(func, 4, wait / 3);
            vi.advanceTimersByTime(1000);
            callFunctionNTimes(func, 4, wait / 3);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(2);
        });

        // x...x x...x
        it('should return a function that, when called, calls the `func` function immediately and then it calls `func` only if returned function was not called before `wait` milliseconds when `leading` and `trailing` parameters are both set to `true`', () => {
            const func = debounce(spyFunc, wait, true, true);

            callFunctionNTimes(func, 4, wait / 3);
            vi.advanceTimersByTime(1000);
            callFunctionNTimes(func, 4, wait / 3);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(4);
        });

        // .x.x
        it('should return a function that, when called repeatedly and time span between two calls is less than `wait` milliseconds, calls the `func` function when time from previous call is greater or equal to `maxWait` milliseconds', () => {
            const func = debounce(spyFunc, wait, false, false, 2 * wait);

            callFunctionNTimes(func, 12, wait / 2);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(2);
        });

        // .x.x..x
        it('should return a function that, when called repeatedly and time span between two calls is less than `wait` milliseconds, calls the `func` function when time from previous call is greater or equal to `maxWait` milliseconds and is also called at the end when returned function is no longer being called - `traling` paramter is set to `true`', () => {
            const func = debounce(spyFunc, wait, true, false, 2 * wait);

            callFunctionNTimes(func, 12, wait / 2);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(3);
        });

        // x.x.x.
        it('should return a function that, when called repeatedly and time span between two calls is less than `wait` milliseconds, calls the `func` function when time from previous call is greater or equal to `maxWait` milliseconds and is also called at the start - `leading` paramter is set to `true`', () => {
            const func = debounce(spyFunc, wait, false, true, 2 * wait);

            callFunctionNTimes(func, 12, wait / 2);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(3);
        });

        // x.x.x..x
        it('should return a function that, when called repeatedly and time span between two calls is less than `wait` milliseconds, calls the `func` function when time from previous call is greater or equal to `maxWait` milliseconds and is also called at the start and at the end when returned function is no longer being called - `leading` and `trailing` paramters are both set to `true`', () => {
            const func = debounce(spyFunc, wait, true, true, 2 * wait);

            callFunctionNTimes(func, 12, wait / 2);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(4);
        });
    });

    describe('#throttle', () => {
        const wait = 50;
        let spyFunc = null;

        beforeEach(() => {
            spyFunc = vi.fn(() => {});
        });

        // .x.x..x
        it('should return a function that, when called repeatedly and time span between two calls is less than `interval` milliseconds, calls the `func` function when time from previous call is greater or equal to `interval` milliseconds and is also called at the end when returned function is no longer being called', () => {
            const func = throttle(spyFunc, wait);

            callFunctionNTimes(func, 8, (wait - 5) / 2);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(3);
        });

        // x.x.x..x
        it('should return a function that, when called repeatedly and time span between two calls is less than `interval` milliseconds, calls the `func` function when time from previous call is greater or equal to `interval` milliseconds and is also called at the start and at the end when returned function is no longer being called', () => {
            const func = throttle(spyFunc, wait, true);

            callFunctionNTimes(func, 8, (wait - 5) / 2);
            vi.advanceTimersByTime(1000);

            expect(spyFunc).toHaveBeenCalledTimes(4);
        });
    });
});

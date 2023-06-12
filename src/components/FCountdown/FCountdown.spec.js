/* eslint-disable no-undef */

import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { spyDateNow } from '@/test/mocks/dateNow.js';
import { mount } from '@vue/test-utils';
import { destroyWrapper, disableErrorMessages } from '@/test/utils.js';
import FCountdown from '@/components/FCountdown/FCountdown.vue';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const NOW = new Date('2021-11-5 8:00').valueOf();
let now = NOW;

let wrapper = null;

// jest.useFakeTimers();

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(FCountdown, {
        propsData,
        slots,
    });
}

/**
 * @param {Object} wrapper
 * @param {string} value
 * @return {number}
 */
function getTimePart(wrapper, value) {
    const el = wrapper.findByTestId(value);
    let val = -1;

    if (el.exists()) {
        val = parseInt(el.text());

        if (isNaN(val)) {
            val = -1;
        }
    }

    return val;
}

/**
 * Returns array of displayed time
 *
 * @param {Object} wrapper
 * @return {array} [days, hours, minutes, seconds]
 */
function getTime(wrapper) {
    const time = [];

    time.push(getTimePart(wrapper, 'days'));
    time.push(getTimePart(wrapper, 'hours'));
    time.push(getTimePart(wrapper, 'minutes'));
    time.push(getTimePart(wrapper, 'seconds'));

    return time;
}

beforeAll(() => {
    vi.useFakeTimers();
    spyDateNow(() => now);
});

afterAll(() => {
    vi.restoreAllMocks();
});

beforeEach(() => {
    now = NOW;
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FCountdown', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should throw an error if given date is not valid', () => {
        disableErrorMessages(function () {
            expect(() => {
                wrapper = createWrapper({ propsData: {} });
            }).toThrow();

            expect(() => {
                wrapper = createWrapper({ propsData: { date: 'foo' } });
            }).toThrow();
        });
    });

    it('should show days, hours, minutes and seconds left', async () => {
        wrapper = createWrapper({ propsData: { date: NOW + HOUR } });
        expect(getTime(wrapper)).toEqual([0, 1, 0, 0]);

        await wrapper.setProps({ date: NOW + 3 * HOUR + 10 * MINUTE });
        expect(getTime(wrapper)).toEqual([0, 3, 10, 0]);

        await wrapper.setProps({ date: NOW + 2 * DAY + 6 * HOUR + 5 * MINUTE });
        expect(getTime(wrapper)).toEqual([2, 6, 5, 0]);

        await wrapper.setProps({ date: NOW + 6 * HOUR + 55 * MINUTE + 21 * SECOND });
        expect(getTime(wrapper)).toEqual([0, 6, 55, 21]);
    });

    it('should show remaining time with zeros if given date is lower than now', () => {
        wrapper = createWrapper({ propsData: { date: NOW - HOUR } });

        expect(getTime(wrapper)).toEqual([0, 0, 0, 0]);
    });

    it('should show days, hours, minutes and seconds left according to `show` prop when it is given and contains characters "d", "h", "m" or "s"', async () => {
        wrapper = createWrapper({
            propsData: {
                date: NOW + 2 * DAY + 6 * HOUR + 55 * MINUTE + 21 * SECOND,
                show: 'hms',
            },
        });
        expect(getTime(wrapper)).toEqual([-1, 6, 55, 21]);

        await wrapper.setProps({ show: 'dhm' });
        expect(getTime(wrapper)).toEqual([2, 6, 55, -1]);

        await wrapper.setProps({ show: 'hm' });
        expect(getTime(wrapper)).toEqual([-1, 6, 55, -1]);

        await wrapper.setProps({ show: 'ms' });
        expect(getTime(wrapper)).toEqual([-1, -1, 55, 21]);
    });

    it('should show time labels when `withLabels` prop is set', async () => {
        wrapper = createWrapper({
            propsData: {
                date: NOW + HOUR,
            },
        });

        expect(wrapper.findByTestId('days_label').exists()).toBeFalsy();
        expect(wrapper.findByTestId('hours_label').exists()).toBeFalsy();
        expect(wrapper.findByTestId('minutes_label').exists()).toBeFalsy();
        expect(wrapper.findByTestId('seconds_label').exists()).toBeFalsy();

        await wrapper.setProps({ withLabels: true });

        expect(wrapper.findByTestId('days_label').text()).toBe('Days');
        expect(wrapper.findByTestId('hours_label').text()).toBe('Hours');
        expect(wrapper.findByTestId('minutes_label').text()).toBe('Minutes');
        expect(wrapper.findByTestId('seconds_label').text()).toBe('Seconds');
    });

    it('should has slots for labels', () => {
        wrapper = createWrapper({
            propsData: {
                withLabels: true,
                date: NOW + HOUR,
            },
            slots: {
                days: 'D',
                hours: 'H',
                minutes: 'M',
                seconds: 'S',
            },
        });

        expect(wrapper.findByTestId('days_label').text()).toBe('D');
        expect(wrapper.findByTestId('hours_label').text()).toBe('H');
        expect(wrapper.findByTestId('minutes_label').text()).toBe('M');
        expect(wrapper.findByTestId('seconds_label').text()).toBe('S');
    });

    it('should display numbers with two digits when `useTwoDigitNumbers` prop is set', async () => {
        wrapper = createWrapper({
            propsData: {
                useTwoDigitNumbers: true,
                date: NOW + DAY + HOUR + MINUTE + SECOND,
            },
        });

        expect(wrapper.findByTestId('days').text()).toBe('01');
        expect(wrapper.findByTestId('hours').text()).toBe('01');
        expect(wrapper.findByTestId('minutes').text()).toBe('01');
        expect(wrapper.findByTestId('seconds').text()).toBe('01');
    });

    it('should update countdown after `updateSpeed` milliseconds', async () => {
        wrapper = createWrapper({
            propsData: {
                updateSpeed: SECOND / 2,
                date: NOW + HOUR,
            },
        });

        const spyUpdate = vi.spyOn(wrapper.vm, 'update');

        expect(getTime(wrapper)).toEqual([0, 1, 0, 0]);

        now += 2 * SECOND;
        vi.advanceTimersByTime(2 * SECOND);
        await wrapper.vm.$nextTick();

        expect(spyUpdate).toBeCalled();
        expect(spyUpdate).toHaveBeenCalledTimes(4);
        expect(getTime(wrapper)).toEqual([0, 0, 59, 58]);

        spyUpdate.mockRestore();
    });

    it('should sort given `cssClasses` array by time property in ascending order', async () => {
        wrapper = createWrapper({
            propsData: {
                cssClasses: [
                    { time: 2 * SECOND, cssClass: 'foo2' },
                    { time: 4 * SECOND, cssClass: 'foo4' },
                    { time: 3 * SECOND, cssClass: 'foo3' },
                    { time: SECOND, cssClass: 'foo1' },
                ],
                date: NOW + HOUR,
            },
        });

        expect(wrapper.vm.cCssClasses).toEqual([
            { time: SECOND, cssClass: 'foo1' },
            { time: 2 * SECOND, cssClass: 'foo2' },
            { time: 3 * SECOND, cssClass: 'foo3' },
            { time: 4 * SECOND, cssClass: 'foo4' },
        ]);
    });

    it('should add proper css class(es) to the container at given times when prop `cssClasses` is given', async () => {
        wrapper = createWrapper({
            propsData: {
                cssClasses: [
                    { time: 4 * SECOND, cssClass: 'foo' },
                    { time: 2 * SECOND, cssClass: 'foo2' },
                ],
                date: NOW + 6 * SECOND,
            },
        });

        now += 2 * SECOND;
        vi.advanceTimersByTime(2 * SECOND);
        await wrapper.vm.$nextTick();

        expect(wrapper.classes()).toContain('foo');

        now += 2 * SECOND;
        vi.advanceTimersByTime(2 * SECOND);
        await wrapper.vm.$nextTick();

        expect(wrapper.classes()).toContain('foo2');
    });

    it('should stop countdown when time is up', async () => {
        wrapper = createWrapper({
            propsData: {
                date: NOW + SECOND,
            },
        });

        const spyUpdate = vi.spyOn(wrapper.vm, 'update');

        now += SECOND;
        vi.advanceTimersByTime(3 * SECOND);
        await wrapper.vm.$nextTick();

        expect(spyUpdate).toBeCalled();
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(getTime(wrapper)).toEqual([0, 0, 0, 0]);

        spyUpdate.mockRestore();
    });

    it('should emit event `time-up` when time is up', () => {
        wrapper = createWrapper({
            propsData: {
                date: NOW + SECOND,
            },
        });

        now += SECOND;
        vi.advanceTimersByTime(3 * SECOND);

        const emitted = wrapper.emitted('time-up');

        expect(emitted).toBeTruthy();
    });
});

/* eslint-enable no-undef */

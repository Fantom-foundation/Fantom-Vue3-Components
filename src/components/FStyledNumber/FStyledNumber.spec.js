import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FStyledNumber from './FStyledNumber.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FStyledNumber, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FStyledNumber', () => {
    it('should split number to integer, delimiter and fraction parts', () => {
        wrapper = createWrapper({
            props: {
                value: 0.123,
            },
        });

        expect(wrapper.findByTestId('int').text()).toBe('0');
        expect(wrapper.findByTestId('dlm').text()).toBe('.');
        expect(wrapper.findByTestId('frac').text()).toBe('123');
    });

    it('should properly handle value with no fraction part', () => {
        wrapper = createWrapper({
            props: {
                value: 123,
            },
        });

        expect(wrapper.findByTestId('int').text()).toBe('123');
        expect(wrapper.findByTestId('dlm').exists()).toBe(false);
        expect(wrapper.findByTestId('frac').exists()).toBe(false);
    });

    it('should properly handle string values', () => {
        wrapper = createWrapper({
            props: {
                value: '123 456,789',
            },
        });

        expect(wrapper.findByTestId('int').text()).toBe('123 456');
        expect(wrapper.findByTestId('dlm').text()).toBe(',');
        expect(wrapper.findByTestId('frac').text()).toBe('789');
    });

    it('should properly handle string values with commas', () => {
        wrapper = createWrapper({
            props: {
                value: '123,456,789.123',
            },
        });

        expect(wrapper.findByTestId('int').text()).toBe('123,456,789');
        expect(wrapper.findByTestId('dlm').text()).toBe('.');
        expect(wrapper.findByTestId('frac').text()).toBe('123');
    });
});

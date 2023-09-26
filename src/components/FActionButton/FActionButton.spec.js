import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FActionButton from './FActionButton.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FActionButton, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FActionButton', () => {
    it('should emit "update:value" event with given value when button is clicked', async () => {
        wrapper = createWrapper({
            props: {
                value: 'foo',
            },
        });

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:value')[0]).toEqual(['foo']);
        expect(wrapper.attributes('aria-pressed')).toBe(undefined);
    });

    it('should emit "update:value" event with given value and toggle state when button is clicked and has prop `toggle` set to true', async () => {
        wrapper = createWrapper({
            props: {
                toggle: true,
            },
        });

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:value')[0]).toEqual([true]);
        expect(wrapper.attributes('aria-pressed')).toBe('true');
        expect(wrapper.findComponent({ name: 'FButton' }).props('hovered')).toBe(true);
    });

    it('should be in toggle state if `value` prop is set to true', () => {
        wrapper = createWrapper({
            props: {
                value: true,
                toggle: true,
                name: 'foo',
            },
        });

        expect(wrapper.attributes('aria-pressed')).toBe('true');
        expect(wrapper.findComponent({ name: 'FButton' }).props('hovered')).toBe(true);
    });

    it('should return `name` as a value if `name` prop is set and `value` is not', () => {
        wrapper = createWrapper({
            props: {
                name: 'foo',
            },
        });

        expect(wrapper.attributes('value')).toBe('foo');
    });
});

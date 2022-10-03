import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FViewTransition from './FViewTransition.vue';
import { nextTick } from 'vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FViewTransition, {
        // attachTo: document.body,
        ...options,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FViewTransition', () => {
    it('should have default slot', () => {
        wrapper = createWrapper({
            slots: {
                default: 'Slot content',
            },
        });

        expect(wrapper.text()).toContain('Slot content');
    });

    it('should be able to run "forward" transition', async () => {
        wrapper = createWrapper({
            props: {
                forwardTransition: 'forward-transition',
            },
        });

        wrapper.vm.forward();
        await nextTick();

        expect(wrapper.attributes('data-test-transition-name')).toBe('forward-transition');
    });

    it('should be able to run "backward" transition', async () => {
        wrapper = createWrapper({
            props: {
                backwardTransition: 'backward-transition',
            },
        });

        wrapper.vm.backward();
        await nextTick();

        expect(wrapper.attributes('data-test-transition-name')).toBe('backward-transition');
    });

    it('should be able to disable transitions', async () => {
        wrapper = createWrapper({
            props: {
                disabled: true,
                forwardTransition: 'forward-transition',
                backwardTransition: 'backward-transition',
            },
        });

        wrapper.vm.forward();
        await nextTick();

        expect(wrapper.attributes('data-test-transition-name')).toBe('');

        wrapper.vm.backward();
        await nextTick();

        expect(wrapper.attributes('data-test-transition-name')).toBe('');
    });

    it('should be able to enable disabled transitions', async () => {
        wrapper = createWrapper({
            props: {
                forwardTransition: 'forward-transition',
            },
        });

        wrapper.vm.forward();
        await wrapper.setProps({ disabled: true });

        expect(wrapper.attributes('data-test-transition-name')).toBe('');

        await wrapper.setProps({ disabled: false });

        expect(wrapper.attributes('data-test-transition-name')).toBe('forward-transition');
    });
});

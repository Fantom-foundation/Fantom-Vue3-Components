import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import { delay } from '@/utils/index.js';
import FPopover from './FPopover.vue';
import FOverlay from '../FOverlay/FOverlay.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FPopover, {
        attachTo: document.body,
        ...options,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FPopover', () => {
    describe('`withOverlay` prop', () => {
        it('should have `withOverlay` set to false by default', () => {
            wrapper = createWrapper();

            expect(wrapper.vm.withOverlay).toBe(false);
        });

        it('should not render FOverlay by default when popover is shown', async () => {
            wrapper = createWrapper();

            await wrapper.showWindow();

            expect(wrapper.findComponent(FOverlay).exists()).toBe(false);
        });

        it('should render FOverlay when `withOverlay` is true and popover is shown', async () => {
            wrapper = createWrapper({
                props: {
                    withOverlay: true,
                },
            });

            await wrapper.showWindow();

            expect(wrapper.findComponent(FOverlay).exists()).toBe(true);
        });

        it('should pass `overlayClass` to FOverlay', async () => {
            wrapper = createWrapper({
                props: {
                    withOverlay: true,
                    overlayClass: 'custom-popover-overlay',
                },
            });

            await wrapper.showWindow();

            const overlay = wrapper.findComponent(FOverlay);
            expect(overlay.exists()).toBe(true);
            expect(overlay.classes()).toContain('custom-popover-overlay');
        });

        it('should hide popover when overlay is clicked', async () => {
            wrapper = createWrapper({
                props: {
                    withOverlay: true,
                },
            });

            await wrapper.showWindow();
            expect(wrapper.vm.isWindowVisible()).toBe(true);

            const overlay = wrapper.findComponent(FOverlay);
            expect(overlay.exists()).toBe(true);

            await overlay.find('.foverlay').trigger('click');
            await delay(50);
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.isWindowVisible()).toBe(false);
        });

        it('should toggle overlay when `withOverlay` prop changes dynamically', async () => {
            wrapper = createWrapper({
                props: {
                    withOverlay: false,
                },
            });

            await wrapper.showWindow();
            expect(wrapper.findComponent(FOverlay).exists()).toBe(false);

            await wrapper.setProps({ withOverlay: true });
            await wrapper.vm.$nextTick();

            expect(wrapper.findComponent(FOverlay).exists()).toBe(true);

            await wrapper.setProps({ withOverlay: false });
            await wrapper.vm.$nextTick();

            expect(wrapper.findComponent(FOverlay).exists()).toBe(false);
        });
    });
});

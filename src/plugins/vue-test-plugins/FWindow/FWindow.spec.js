import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import FWindow from '@/components/FWindow/FWindow.vue';

let wrapper = null;

const list = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
];

function createWrapper(options = { props: { data: list }, attachTo: document.body }) {
    return mount(FWindow, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FWindow vue test plugins', () => {
    describe('#showWindow', () => {
        it('should show window', async () => {
            wrapper = createWrapper();

            await wrapper.showWindow();

            expect(wrapper.vm.isVisible).toBe(true);
        });
    });

    describe('#hideWindow', () => {
        it('should hide window', async () => {
            wrapper = createWrapper();

            await wrapper.showWindow();
            await wrapper.hideWindow();

            expect(wrapper.vm.isVisible).toBe(false);
        });
    });
});

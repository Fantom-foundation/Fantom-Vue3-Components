import { describe, it, afterEach, expect } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { useFPopover } from './useFPopover.js';
import { FPopover } from '@/components/index.js';
import { delay } from '@/utils/index.js';
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';

let wrapper = null;
const POPOVER_ID = 'popover-id';

const ComponentWithFPopover = {
    template: `<FPopover ref="popover" :hide-on-document-mousedown="hideOnDocumentMousedown" />`,
    components: { FPopover },
    setup(props, { expose }) {
        const popover = ref(null);

        const { exposeFPopoverMethods, hideOnDocumentMousedown } = useFPopover(POPOVER_ID, popover);

        expose(exposeFPopoverMethods());

        return {
            popover,
            hideOnDocumentMousedown,
        };
    },
};

const Wrapper = {
    template: '<ComponentWithFPopover ref="popover" />',
    components: { ComponentWithFPopover },
    setup() {
        const popover = ref(null);

        return {
            popover,
        };
    },
};

function createWrapper(options = { attachTo: document.body }) {
    return mount(Wrapper, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('useFPopover', () => {
    it('should expose some popover methods', () => {
        wrapper = createWrapper();

        expect(wrapper.vm.popover.show).toBeDefined();
        expect(wrapper.vm.popover.hide).toBeDefined();
        expect(wrapper.vm.popover.toggle).toBeDefined();
        expect(wrapper.vm.popover.isWindowVisible).toBeDefined();
    });

    it('should expose function for hiding popover from outside', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();

        const { hide } = useFPopover(POPOVER_ID);
        if (hide) {
            hide();
        }

        await delay(0);

        expect(wrapper.vm.popover.isWindowVisible()).toBe(false);
    });

    it('should expose function for showing popover from outside', async () => {
        wrapper = createWrapper();

        const { show } = useFPopover(POPOVER_ID);
        if (show) {
            show();
        }

        await delay(0);

        expect(wrapper.vm.popover.isWindowVisible()).toBe(true);
    });

    it('should expose function for prevent hiding popover on mousedown', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();

        const { disablePopoverHiding } = useFPopover(POPOVER_ID);
        if (disablePopoverHiding) {
            disablePopoverHiding();
            await nextTick();
        }

        await wrapper.trigger('mousedown');
        await delay(0);

        expect(wrapper.vm.popover.isWindowVisible()).toBe(true);
    });

    it('should expose function for enabling hiding popover on mousedown if hiding on mousedown was disabled', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();

        const { disablePopoverHiding, enablePopoverHiding } = useFPopover(POPOVER_ID);
        if (disablePopoverHiding) {
            disablePopoverHiding();
            await nextTick();
        }

        if (enablePopoverHiding) {
            enablePopoverHiding();
            await nextTick();
        }

        await wrapper.trigger('mousedown');
        await delay(0);

        expect(wrapper.vm.popover.isWindowVisible()).toBe(false);
    });

    it('should expose function for enabling hiding popover and hide popover if hiding on mousedown was disabled', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();

        const { disablePopoverHiding, enablePopoverHiding } = useFPopover(POPOVER_ID);
        if (disablePopoverHiding) {
            disablePopoverHiding();
            await nextTick();
        }

        if (enablePopoverHiding) {
            enablePopoverHiding(true);
            await nextTick();
        }

        await delay(0);

        expect(wrapper.vm.popover.isWindowVisible()).toBe(false);
    });
});

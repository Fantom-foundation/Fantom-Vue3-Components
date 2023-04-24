import { describe, it, afterEach, expect } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { useFWindow } from './useFWindow.js';
import { FWindow } from '@/components/index.js';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { delay } from '@/utils/index.js';

let wrapper = null;
const WINDOW_ID = 'window-id';

const ComponentWithFWindow = {
    template: `<FWindow ref="window" :title="title">{{ backButtonComponentId }}</FWindow>`,
    components: { FWindow },
    setup(props, { expose }) {
        const window = ref(null);

        const { exposeFWindowMethods, title, backButtonComponentId } = useFWindow(WINDOW_ID, window);

        expose(exposeFWindowMethods());

        return {
            window,
            title,
            backButtonComponentId,
        };
    },
};

const Wrapper = {
    template: '<ComponentWithFWindow ref="window" />',
    components: { ComponentWithFWindow },
    setup() {
        const window = ref(null);

        return {
            window,
        };
    },
};

function createWrapper(options = { attachTo: document.body }) {
    return mount(Wrapper, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('useFWindow', () => {
    it('should expose some FWindow methods', () => {
        wrapper = createWrapper();

        expect(wrapper.vm.window.show).toBeDefined();
        expect(wrapper.vm.window.hide).toBeDefined();
        expect(wrapper.vm.window.toggle).toBeDefined();
        expect(wrapper.vm.window.isWindowVisible).toBeDefined();
    });

    it('should expose function for setting window title', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();
        const window = wrapper.findComponent(FWindow);

        const { setTitle } = useFWindow(WINDOW_ID);
        setTitle('foo');
        await nextTick();

        expect(window.vm.title).toBe('foo');
    });

    it('should expose function for setting back button component prop', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();
        const window = wrapper.findComponent(FWindow);

        const { setBackButtonComponentId } = useFWindow(WINDOW_ID);
        setBackButtonComponentId('backButtonComponentId');
        await nextTick();

        expect(window.text()).toContain('backButtonComponentId');
    });

    it('should expose function for showing the window', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();
        const window = wrapper.findComponent(FWindow);

        const { show } = useFWindow(WINDOW_ID);
        show();
        await nextTick();

        expect(window.vm.isWindowVisible()).toBe(true);
    });

    it('should expose function for hiding the window', async () => {
        wrapper = createWrapper();
        await wrapper.showWindow();
        const window = wrapper.findComponent(FWindow);

        const { hide } = useFWindow(WINDOW_ID);
        hide();
        await delay(0);

        expect(window.vm.isWindowVisible()).toBe(false);
    });
});

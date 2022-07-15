/**
 * Vue test utils plugins related to FWindow component
 */

export function showWindowPlugin(wrapper) {
    async function showWindow() {
        const fWindow = wrapper.findComponent({ name: 'FWindow' });
        const { vm } = fWindow;

        vm.show();
        await vm.$nextTick();
        await vm.$nextTick();
    }

    return {
        showWindow,
    };
}

export function hideWindowPlugin(wrapper) {
    async function hideWindow() {
        const fWindow = wrapper.findComponent({ name: 'FWindow' });
        const { vm } = fWindow;

        vm.hide();
        await vm.$nextTick();
        await vm.$nextTick();
    }

    return {
        hideWindow,
    };
}

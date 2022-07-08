/**
 * Vue test utils plugins related to FWindow component
 */

export function showWindowPlugin(fWindow) {
    async function showWindow() {
        const { vm } = fWindow;

        vm.show();
        await vm.$nextTick();
        await vm.$nextTick();
    }

    return {
        showWindow,
    };
}

export function hideWindowPlugin(fWindow) {
    async function hideWindow() {
        const { vm } = fWindow;

        vm.hide();
        await vm.$nextTick();
        await vm.$nextTick();
    }

    return {
        hideWindow,
    };
}

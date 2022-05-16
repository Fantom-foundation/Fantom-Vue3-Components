/**
 * Vue test utils plugins related to FCombobox component
 */

export function openComboboxPlugin(fCombobox) {
    async function openCombobox() {
        const { vm } = fCombobox;

        let elem = fCombobox.find('[data-testcode="fcombobox-button"]');

        if (!elem.exists()) {
            elem = fCombobox.find('input');
        }

        if (elem.exists()) {
            await elem.trigger('click');
            await vm.$nextTick();
            await vm.$nextTick();
        }
    }

    return {
        openCombobox,
    };
}

export function selectComboboxItemPlugin(fCombobox) {
    async function selectComboboxItem(itemIndex = 1) {
        await fCombobox.openCombobox();

        const fPopover = fCombobox.findComponent({ name: 'FPopover' });
        const lis = fPopover.find('ul').findAll('li');

        if (itemIndex < 1 || itemIndex > lis.length) {
            throw new Error(`Bad item index ${itemIndex}`);
        }

        await lis[itemIndex - 1].trigger('click');
        await fCombobox.vm.$nextTick();

        return lis[itemIndex - 1];
    }
    ``;
    return {
        selectComboboxItem,
    };
}

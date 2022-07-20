export function selectListboxItemPlugin(wrapper) {
    async function selectListboxItem(itemIndex = 1) {
        const lis = wrapper.find('ul').findAll('li');

        if (isNaN(itemIndex) || itemIndex < 1 || itemIndex > lis.length) {
            throw new Error(`Bad item index ${itemIndex}`);
        }

        await lis[itemIndex - 1].trigger('click');
        await wrapper.vm.$nextTick();

        return lis[itemIndex - 1];
    }

    async function selectListboxItemByValue(value) {
        const fListbox = wrapper.findComponent({ name: 'FListbox' });
        const { data } = fListbox ? fListbox.vm : {};
        let index = -1;

        if (data) {
            index = data.findIndex((item) => item.value === value);
        }

        return index > -1 ? selectListboxItem(index + 1) : null;
    }

    return {
        selectListboxItem,
        selectListboxItemByValue,
    };
}

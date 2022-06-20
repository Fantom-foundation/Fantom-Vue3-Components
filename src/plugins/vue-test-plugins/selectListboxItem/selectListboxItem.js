export function selectListboxItemPlugin(wrapper) {
    async function selectListboxItem(itemIndex = 1) {
        const lis = wrapper.find('ul').findAll('li');

        if (itemIndex < 1 || itemIndex > lis.length) {
            throw new Error(`Bad item index ${itemIndex}`);
        }

        await lis[itemIndex - 1].trigger('click');
        await wrapper.vm.$nextTick();

        return lis[itemIndex - 1];
    }
    ``;
    return {
        selectListboxItem,
    };
}

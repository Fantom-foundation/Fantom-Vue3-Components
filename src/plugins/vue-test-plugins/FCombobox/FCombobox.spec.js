import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import FComboBox from '@/components/FComboBox/FComboBox.vue';

let wrapper = null;

const list = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
];

function createWrapper(options = { props: { data: list }, attachTo: document.body }) {
    return mount(FComboBox, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FCombobox vue test plugins', () => {
    describe('#openCombobox', () => {
        it('should open combobox list', async () => {
            wrapper = createWrapper();

            await wrapper.openCombobox();

            expect(document.body.innerHTML).toMatch(new RegExp(`${list[0].label}.*${list[1].label}`));
        });
    });

    describe('#selectComboboxItem', () => {
        it('should select an item from the list', async () => {
            wrapper = createWrapper();

            await wrapper.selectComboboxItem(2);

            const emitted = wrapper.emitted('update:value');

            expect(emitted[0]).toEqual([list[1].value]);
        });

        it('should throw an error if bad item index is given', async () => {
            wrapper = createWrapper();

            await expect(async () => {
                await wrapper.selectComboboxItem(0);
            }).rejects.toBeInstanceOf(Error);

            await expect(async () => {
                await wrapper.selectComboboxItem(3);
            }).rejects.toBeInstanceOf(Error);
        });
    });
});

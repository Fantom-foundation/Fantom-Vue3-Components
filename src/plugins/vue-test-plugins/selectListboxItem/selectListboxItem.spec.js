import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { FListbox } from '@/components/index.js';
import { mount } from '@vue/test-utils';

let wrapper = null;

const list = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
];

function createWrapper(options = { props: { data: list }, attachTo: document.body }) {
    return mount(FListbox, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('selectListboxItem vue test utils plugin', () => {
    it('should select list item', async () => {
        wrapper = createWrapper();

        await wrapper.selectListboxItem(2);

        const emitted = wrapper.emitted('update:value');

        expect(emitted[0]).toEqual([list[1].value]);
    });
});

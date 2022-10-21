import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';

const Playground = {
    template: `
        <form method="post" @submit="onSubmit">
            <input type="text" name="textInput" />
        </form>
    `,
    methods: {
        onSubmit(event) {
            event.preventDefault();
        },
    },
};

let wrapper = null;

function createWrapper(options = {}) {
    return mount(Playground, { ...options, attachTo: document.body });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('setFormElement vue test plugin', () => {
    it('should set form element value by its name', async () => {
        wrapper = createWrapper();

        await wrapper.setFormElement('textInput', 'foo');

        expect(wrapper.find('input[name=textInput]').element.value).toBe('foo');
    });

    it('should throw an error if form element is not found', async () => {
        wrapper = createWrapper();

        await expect(async () => {
            await wrapper.setFormElement('wrongInputName', 'foo');
        }).rejects.toBeInstanceOf(Error);
    });
});

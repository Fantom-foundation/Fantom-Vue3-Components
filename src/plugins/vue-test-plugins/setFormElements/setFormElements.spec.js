import { describe, it, expect, afterEach } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

const Playground = {
    template: `
        <form method="post" @submit="onSubmit">
            <input type="text" name="textInput1" />
            <input type="text" name="textInput2" />
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

describe('setFormElements vue test plugin', () => {
    it('should set form element value by its name', async () => {
        wrapper = createWrapper();

        await wrapper.setFormElements({
            textInput1: 'foo1',
            textInput2: 'foo2',
        });

        expect(wrapper.find('input[name=textInput1]').element.value).toBe('foo1');
        expect(wrapper.find('input[name=textInput2]').element.value).toBe('foo2');
    });

    it('should throw an error if form element is not found', async () => {
        wrapper = createWrapper();

        await expect(async () => {
            await wrapper.setFormElements({ wrongInputName: 'foo' });
        }).rejects.toBeInstanceOf(Error);
    });

    it('should not set form element value if value is `null` and `notNullValue` arg is true', async () => {
        wrapper = createWrapper();
        const findSpy = vi.spyOn(wrapper, 'setFormElement');

        await wrapper.setFormElements(
            {
                textInput1: null,
                textInput2: 'foo2',
            },
            true
        );

        expect(findSpy).toHaveBeenNthCalledWith(1, 'textInput2', 'foo2');
    });
});

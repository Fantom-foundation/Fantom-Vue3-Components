import { describe, it, expect, vi } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';

const Playground = {
    template: `
        <form method="post" @submit="onSubmit">
            <input type="submit" />
            <button type="submit" name="submit-btn" />
        </form>
    `,
    methods: {
        onSubmit(event) {
            event.preventDefault();
        },
    },
};

describe('submitForm vue test plugin', () => {
    it('should find a button or input of type "submit" and perform click', async () => {
        const onSubmitSpy = vi.fn(() => {});
        const wrapper = mount(Playground, {
            attachTo: document.body,
            attrs: {
                onsubmit: onSubmitSpy,
            },
        });

        await wrapper.submitForm();

        expect(onSubmitSpy).toHaveBeenCalled();

        destroyWrapper(wrapper);
    });

    it('should find a button or input of type "submit" with given name and perform click', async () => {
        const onSubmitSpy = vi.fn(() => {});
        const wrapper = mount(Playground, {
            attachTo: document.body,
            attrs: {
                onsubmit: onSubmitSpy,
            },
        });

        await wrapper.submitForm('submit-btn');

        expect(onSubmitSpy).toHaveBeenCalled();

        destroyWrapper(wrapper);
    });
});

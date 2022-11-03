import { describe, it, expect, vi } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import { FForm, FFormInput } from '@/components/index.js';

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

const FFormPlayground = {
    components: { FForm, FFormInput },
    emits: ['submit'],
    template: `
        <FForm @submit="$emit('submit', $event)">
            <FFormInput name="text" type="text" :validator="asyncValidator" />
            <button type="submit" />
        </FForm>
    `,
    methods: {
        asyncValidator() {
            return new Promise((_resolve) =>
                setTimeout(() => {
                    _resolve('');
                }, 100)
            );
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

    it('should handle async submit in FForm properly', async () => {
        const wrapper = mount(FFormPlayground, { attachTo: document.body });

        await wrapper.submitForm();

        expect(wrapper.emitted('submit')[0][0].values).toEqual({ text: '' });

        destroyWrapper(wrapper);
    });
});

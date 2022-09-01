import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import { FUploadArea } from '@/components/index.js';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FUploadArea, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FUploadArea', () => {
    it('should display input of type "file" with given name', () => {
        wrapper = createWrapper({
            props: {
                name: 'testfile',
            },
        });

        expect(wrapper.find(`input[type="file"][name="testfile"]`).exists()).toBe(true);
    });

    it('should display a text in a default slot', () => {
        wrapper = createWrapper({
            slots: {
                default: 'Lorem ipsum',
            },
        });

        expect(wrapper.text()).toMatch(/.*Lorem ipsum.*/);
    });

    it('should display names of picked files in the `files` slot by default', async () => {
        wrapper = createWrapper();
        const fileInput = wrapper.find('input[type="file"]');
        const files = [{ name: 'File 1' }, { name: 'File 2' }];

        await fileInput.trigger('change', { files });

        expect(wrapper.text()).toContain('File 1File 2');
    });

    it('should accept multiple files', () => {
        wrapper = createWrapper({
            props: {
                multiple: true,
            },
        });

        expect(wrapper.find('input[type="file"][multiple]').exists()).toBe(true);
    });

    it('should emit `change` event with the files when files are picked', async () => {
        wrapper = createWrapper();
        const fileInput = wrapper.find('input[type="file"]');
        const files = [{ type: 'image/png' }];

        await fileInput.trigger('change', { files });

        expect(wrapper.emitted('change')[0][0].files).toEqual(files);
    });

    it('should accept only given file types if `accept` prop is given', async () => {
        wrapper = createWrapper({
            props: {
                accept: 'image/*,.pdf,application/json',
            },
        });
        const fileInput = wrapper.find('input[type="file"][accept="image/*,.pdf,application/json"]');
        const files = [{ type: 'image/png' }, { type: 'application/pdf' }, { type: 'application/json' }];

        await fileInput.trigger('change', { files });

        expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('should emit `invalid` event if `accept` prop is given and file types does not match', async () => {
        wrapper = createWrapper({
            props: {
                accept: 'image/*,.pdf,application/json',
            },
        });
        const fileInput = wrapper.find('input[type="file"]');

        await fileInput.trigger('change', { files: [{ type: 'text/html' }] });

        expect(wrapper.emitted('invalid')).toBeTruthy();
        expect(wrapper.emitted('change')).not.toBeTruthy();
    });

    it('should check max file size', async () => {
        wrapper = createWrapper({
            props: {
                maxFileSize: 10,
            },
        });
        const fileInput = wrapper.find('input[type="file"]');

        await fileInput.trigger('change', { files: [{ size: 100 }] });

        expect(wrapper.emitted('invalid')).toBeTruthy();
    });

    it('should use custom files validator to validate picked files', async () => {
        wrapper = createWrapper({
            props: {
                filesValidator(files) {
                    return [`Bad files ${files.map((file) => file.name).join(', ')}`];
                },
            },
        });
        const fileInput = wrapper.find('input[type="file"]');

        await fileInput.trigger('change', { files: [{ name: 'Foo' }, { name: 'Foo2' }] });

        expect(wrapper.emitted('invalid')[0]).toEqual([['Bad files Foo, Foo2']]);
    });

    it('should add `invalid` attr to the input if component is in invalid state', async () => {
        wrapper = createWrapper({
            props: {
                invalid: true,
                accept: 'image/*',
            },
        });
        const fileInput = wrapper.find('input[type="file"]');

        expect(fileInput.attributes('aria-invalid')).toBe('true');

        await wrapper.setProps({ invalid: false });
        await fileInput.trigger('change', { files: [{ type: 'text/html' }] });

        expect(fileInput.attributes('aria-invalid')).toBe('true');
    });

    // it.todo('should be able to clear picked files by clicking on `remove` button', () => {});
});

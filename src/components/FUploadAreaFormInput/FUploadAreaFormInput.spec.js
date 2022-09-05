import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FUploadAreaFormInput from './FUploadAreaFormInput.vue';
import { delay } from '@/utils/index.js';
import { FUploadArea } from '@/components/index.js';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FUploadAreaFormInput, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FUploadAreaFormInput', () => {
    it('should wrap FUploadArea component', async () => {
        wrapper = createWrapper({
            slots: {
                default: 'Lorem ipsum',
            },
        });
        const fileInput = wrapper.find('input[type="file"]');
        const files = [{ name: 'File 1' }, { name: 'File 2' }];

        expect(wrapper.text()).toMatch(/.*Lorem ipsum.*/);

        await fileInput.trigger('change', { files });

        expect(wrapper.text()).toContain('File 1File 2');
    });

    it('should show info text', () => {
        wrapper = createWrapper({
            props: {
                infoText: 'Info text',
            },
        });

        expect(wrapper.text()).toContain('Info text');
    });

    it('should show error messages when a validation fails', async () => {
        wrapper = createWrapper({
            props: {
                validator(files) {
                    return [`Bad files ${files.map((file) => file.name).join(', ')}`];
                },
            },
        });
        const fileInput = wrapper.find('input[type="file"]');

        await fileInput.trigger('change', { files: [{ name: 'Foo' }, { name: 'Foo2' }] });
        await delay(0);

        expect(wrapper.text()).toContain('Bad files Foo, Foo2');
    });

    it('should emit "validation-state" event on change and invalid events', () => {
        wrapper = createWrapper();
        const fUploadArea = wrapper.findComponent(FUploadArea);

        fUploadArea.vm.$emit('change');

        expect(wrapper.emitted('validation-state')).toHaveLength(1);

        fUploadArea.vm.$emit('invalid');

        expect(wrapper.emitted('validation-state')).toHaveLength(2);
    });

    it('should emit "update:value" event on change and invalid events', () => {
        wrapper = createWrapper();
        const fUploadArea = wrapper.findComponent(FUploadArea);

        fUploadArea.vm.$emit('change');

        expect(wrapper.emitted('update:value')).toHaveLength(1);

        fUploadArea.vm.$emit('invalid');

        expect(wrapper.emitted('update:value')).toHaveLength(2);
    });
});

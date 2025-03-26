import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FToolbar from './FToolbar.vue';
import { FComboBox } from '@/components/index.js';
import { nextTick, shallowRef } from 'vue';
import { delay } from '@/utils/index.js';

let wrapper = null;

function createWrapper(
    options = {
        props: {
            items: [
                {
                    type: 'button',
                    name: 'bold',
                    label: 'Bold',
                    icon: 'bold',
                    props: {},
                },
                {
                    type: 'button',
                    name: 'italic',
                    label: 'Italic',
                },
            ],
        },
    }
) {
    return mount(FToolbar, { ...options, attachTo: document.body });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FToolbar', () => {
    it('should render buttons', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        name: 'bold',
                    },
                    {
                        type: 'button',
                        name: 'italic',
                    },
                ],
            },
        });

        const buttons = wrapper.findAll('button');
        expect(buttons[0].attributes('value')).toBe('bold');
        expect(buttons[1].attributes('value')).toBe('italic');
    });

    it('should set default button type', () => {
        wrapper = createWrapper({
            props: {
                defaultBtnType: 'secondary',
                items: [
                    {
                        name: 'bold',
                    },
                ],
            },
        });

        expect(wrapper.findComponent({ name: 'FButton' }).props('btnType')).toBe('secondary');
    });

    it('should render separator', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        type: 'separator',
                    },
                ],
            },
        });

        expect(wrapper.find('.ftoolbar_separator').exists()).toBe(true);
    });

    it('should accept a component in the `type` prop', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        type: shallowRef(FComboBox),
                        name: 'combobox',
                    },
                ],
            },
        });

        expect(wrapper.findComponent(FComboBox).exists()).toBe(true);
    });

    it('should pass labels to components', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        label: 'Bold',
                        name: 'bold',
                    },
                    {
                        type: shallowRef(FComboBox),
                        label: 'Combobox',
                        name: 'combobox',
                    },
                ],
            },
        });

        const text = wrapper.text();
        expect(text).toContain('Bold');
        expect(text).toContain('Combobox');
    });

    it('should pass props to components', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        props: {
                            label: 'Bold',
                        },
                        name: 'bold',
                    },
                    {
                        type: shallowRef(FComboBox),
                        props: {
                            label: 'Combobox',
                        },
                        name: 'combobox',
                    },
                ],
            },
        });

        const text = wrapper.text();
        expect(text).toContain('Bold');
        expect(text).toContain('Combobox');
    });

    it('should pass names to components', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        name: 'bold',
                    },
                    {
                        type: shallowRef(FComboBox),
                        name: 'combobox',
                    },
                ],
            },
        });

        expect(wrapper.find('[name="bold"]').exists()).toBe(true);
        expect(wrapper.find('[name="combobox"]').exists()).toBe(true);
    });

    it('should pass values to components', () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        name: 'bold',
                        value: 'foo',
                    },
                    {
                        type: shallowRef(FComboBox),
                        name: 'combobox',
                        value: 'opt2',
                        props: {
                            data: [
                                { label: 'Option 1', value: 'opt1' },
                                { label: 'Option 2', value: 'opt2' },
                            ],
                        },
                    },
                ],
            },
        });

        expect(wrapper.find('[name="bold"]').attributes('value')).toBe('foo');
        expect(wrapper.findComponent(FComboBox).vm.inputValue).toBe('opt2');
    });

    it('should update value of a toolbar item by name', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        name: 'bold',
                        value: 'foo',
                    },
                    {
                        type: shallowRef(FComboBox),
                        name: 'combobox',
                        props: {
                            data: [
                                { label: 'Option 1', value: 'opt1' },
                                { label: 'Option 2', value: 'opt2' },
                            ],
                        },
                    },
                ],
            },
        });

        wrapper.vm.$parent.$refs.VTU_COMPONENT.setValueByName('bold', 'new value');
        wrapper.vm.$parent.$refs.VTU_COMPONENT.setValueByName('combobox', 'opt2');
        await nextTick();

        expect(wrapper.find('[name="bold"]').attributes('value')).toBe('new value');
        expect(wrapper.findComponent(FComboBox).vm.inputValue).toBe('opt2');
    });

    it('should emit "toolbar-action" event with item value and name', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    {
                        name: 'bold',
                        props: { toggle: true },
                    },
                    {
                        type: shallowRef(FComboBox),
                        name: 'combobox',
                        props: {
                            data: [
                                { label: 'Option 1', value: 'opt1' },
                                { label: 'Option 2', value: 'opt2' },
                            ],
                        },
                    },
                ],
            },
        });

        await delay();
        await wrapper.find('button').trigger('click');
        await wrapper.findComponent(FComboBox).selectComboboxItem(2);

        expect(wrapper.emitted('toolbar-action')[0][0]).toEqual({ value: true, name: 'bold' });
        expect(wrapper.emitted('toolbar-action')[1][0]).toEqual({ value: 'opt2', name: 'combobox' });
    });

    it('should has first non-disabled item focusable', async () => {
        wrapper = createWrapper({
            props: {
                items: [{ name: 'bold', props: { disabled: true } }, { name: 'italic' }],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');

        expect(buttons[0].attributes('tabindex')).toBe('-1');
        expect(buttons[1].attributes('tabindex')).toBe('0');
    });

    it('should focus next non-disabled element if ArrowRight key is pressed', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    { name: 'bold' },
                    { type: 'separator' },
                    { name: 'italic', props: { disabled: true } },
                    { name: 'underline' },
                ],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');

        await buttons[0].trigger('keydown', { key: 'ArrowRight' });

        expect(buttons[2].element).toBe(document.activeElement);
        expect(buttons[2].attributes('tabindex')).toBe('0');
    });

    it('should focus previous non-disabled element if ArrowLeft key is pressed', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    { name: 'bold' },
                    { type: 'separator' },
                    { name: 'italic', props: { disabled: true } },
                    { name: 'underline' },
                ],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');
        // move focus to the last button
        await buttons[0].trigger('keydown', { key: 'ArrowRight' });

        await buttons[2].trigger('keydown', { key: 'ArrowLeft' });

        expect(buttons[0].element).toBe(document.activeElement);
        expect(buttons[0].attributes('tabindex')).toBe('0');
    });

    it('should focus a first non-disabled element if ArrowRight key is pressed and focus is on the last non-disabled element', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    { name: 'bold', props: { disabled: true } },
                    { type: 'separator' },
                    { name: 'italic' },
                    { name: 'underline' },
                ],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');
        // move focus to the last button
        await buttons[1].trigger('keydown', { key: 'ArrowRight' });

        await buttons[2].trigger('keydown', { key: 'ArrowRight' });

        expect(buttons[1].element).toBe(document.activeElement);
        expect(buttons[1].attributes('tabindex')).toBe('0');
    });

    it('should focus a first non-disabled element if Home key is pressed and focus is on the last non-disabled element', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    { name: 'bold', props: { disabled: true } },
                    { type: 'separator' },
                    { name: 'italic' },
                    { name: 'underline' },
                ],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');
        // move focus to the last button
        await buttons[1].trigger('keydown', { key: 'ArrowRight' });

        await buttons[2].trigger('keydown', { key: 'Home' });

        expect(buttons[1].element).toBe(document.activeElement);
        expect(buttons[1].attributes('tabindex')).toBe('0');
    });

    it('should focus last non-disabled element if ArrowLeft key is pressed and focus is on the first non-disabled element', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    { name: 'bold', props: { disabled: true } },
                    { type: 'separator' },
                    { name: 'italic' },
                    { name: 'underline' },
                ],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');
        buttons[1].element.focus();

        await buttons[1].trigger('keydown', { key: 'ArrowLeft' });

        expect(buttons[2].element).toBe(document.activeElement);
        expect(buttons[2].attributes('tabindex')).toBe('0');
    });

    it('should focus last non-disabled element if End key is pressed and focus is on the first non-disabled element', async () => {
        wrapper = createWrapper({
            props: {
                items: [
                    { name: 'bold', props: { disabled: true } },
                    { type: 'separator' },
                    { name: 'italic' },
                    { name: 'underline' },
                    { name: 'foo', props: { disabled: true } },
                ],
            },
        });

        await delay();
        const buttons = wrapper.findAll('button');
        buttons[1].element.focus();

        await buttons[1].trigger('keydown', { key: 'End' });

        expect(buttons[2].element).toBe(document.activeElement);
        expect(buttons[2].attributes('tabindex')).toBe('0');
    });
});

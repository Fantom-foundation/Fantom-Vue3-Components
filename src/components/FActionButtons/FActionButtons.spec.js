import { describe, it, afterEach, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FActionButtons from './FActionButtons.vue';
import { FButton } from '@/components/index.js';

let wrapper = null;
const BUTTONS = [
    {
        action: 'action1',
        label: 'button 1',
        size: 'large',
    },
    {
        action: 'action2',
        label: 'button 2',
        secondary: true,
        size: 'large',
    },
];

function createWrapper(
    options = {
        props: {
            buttons: BUTTONS,
        },
    }
) {
    return mount(FActionButtons, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FActionButtons', () => {
    it('should display given buttons', () => {
        wrapper = createWrapper();

        expect(wrapper.text()).toContain('button 1button 2');
    });

    it('should emit "button-action" event with proper action as an argument by clicking on a button', async () => {
        wrapper = createWrapper();
        const button = wrapper.findComponent(FButton);

        await button.trigger('click');

        expect(wrapper.emitted('button-action')[0]).toEqual(['action1']);
    });

    it('should disable all buttons if `disabled` prop is `true`', async () => {
        wrapper = createWrapper({
            props: {
                disabled: true,
                buttons: BUTTONS,
            },
        });
        const buttons = wrapper.findAll('button');

        expect(buttons[0].element.disabled).toBe(true);
        expect(buttons[1].element.disabled).toBe(true);
    });
});

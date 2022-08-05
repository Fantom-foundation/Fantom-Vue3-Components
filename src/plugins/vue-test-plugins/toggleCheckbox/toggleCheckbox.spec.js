import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';

const Playground = {
    template: `
        <div>
            <input type="checkbox" />
            <input type="checkbox" name="checkbox2" />
            <input type="checkbox" checked name="checkbox3" />
        </div>
    `,
};

let wrapper = null;

beforeEach(() => {
    wrapper = mount(Playground);
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('toggleCheckbox vue test plugin', () => {
    it('should check first found checkbox', async () => {
        wrapper.toggleCheckbox();

        expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true);
    });

    it('should check checkbox by name', async () => {
        wrapper.toggleCheckbox('checkbox2');

        expect(wrapper.find('input[type="checkbox"][name="checkbox2"]').element.checked).toBe(true);
    });

    it('should uncheck checked checkbox', async () => {
        wrapper.toggleCheckbox('checkbox3');

        expect(wrapper.find('input[type="checkbox"][name="checkbox3"]').element.checked).toBe(false);
    });
});

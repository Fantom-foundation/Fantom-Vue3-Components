import { describe, it, expect } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';
import { FOption } from '@/components/index.js';

const Playground = {
    template: `
        <div>
            <input type="radio" name="radio" value="10" />
            <input type="radio" name="radio" value="20" />
        </div>
    `,
};

const PlaygroundFOption = {
    template: `
        <div>
            <FOption type="radio" name="radio" value="10" />
            <FOption type="radio" name="radio" value="20" />
        </div>
    `,
    components: { FOption },
};

describe('checkRadioOption vue test plugin', () => {
    it('should check radio option by option index', async () => {
        const wrapper = mount(Playground);

        await wrapper.checkRadioOption(2);

        const radio = wrapper.find('input[name="radio"]:checked');

        expect(radio.element.value).toBe('20');

        destroyWrapper(wrapper);
    });

    it('should check radio option by option value', async () => {
        const wrapper = mount(Playground);

        await wrapper.checkRadioOptionByValue('20');

        const radio = wrapper.find('input[name="radio"]:checked');

        expect(radio.element.value).toBe('20');

        destroyWrapper(wrapper);
    });

    it('should check FOption by option index', async () => {
        const wrapper = mount(PlaygroundFOption);

        await wrapper.checkRadioOption(2);

        const radio = wrapper.find('input[name="radio"]:checked');

        expect(radio.element.value).toBe('20');

        destroyWrapper(wrapper);
    });

    it('should check FOption by option value', async () => {
        const wrapper = mount(PlaygroundFOption);

        await wrapper.checkRadioOptionByValue('20');

        const radio = wrapper.find('input[name="radio"]:checked');

        expect(radio.element.value).toBe('20');

        destroyWrapper(wrapper);
    });
});

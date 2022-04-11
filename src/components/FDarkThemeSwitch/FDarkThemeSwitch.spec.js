import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FDarkThemeSwitch from '@/components/FDarkThemeSwitch/FDarkThemeSwitch.vue';

let wrapper = null;

function createWrapper({ propsData = {} } = {}) {
    wrapper = mount(FDarkThemeSwitch, {
        propsData,
    });
}

describe('FDarkThemeSwitch', () => {
    it('should render correctly', () => {
        createWrapper({ propsData: { id: 'foo' } });

        expect(wrapper.element).toMatchSnapshot();
    });
});

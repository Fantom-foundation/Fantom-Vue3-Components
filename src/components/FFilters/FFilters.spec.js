import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FFilters from '@/components/FFilters/FFilters.vue';
import FForm from '@/components/FForm/FForm.vue';

let wrapper = null;

function createWrapper(options = {}) {
    wrapper = mount(FFilters, options);
}

beforeEach(() => {
    createWrapper();
});

afterEach(() => {
    wrapper = null;
});

describe('FFilters', () => {
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass attributes to the FForm component', () => {
        createWrapper({
            propsData: {
                values: {
                    foo: 'foo',
                },
            },
        });

        const fForm = wrapper.findComponent(FForm);

        expect(fForm.exists()).toBeTruthy();
        expect(fForm.props('values')).toEqual({ foo: 'foo' });
    });

    it('should cointain methods from FForm', () => {
        expect(typeof wrapper.vm.getLastChangedElement).toBe('function');
    });
});

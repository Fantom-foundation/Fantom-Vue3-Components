import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FSteps from '@/components/FSteps/FSteps.vue';
import { destroyWrapper } from '@/test/utils.js';

let wrapper = null;

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(FSteps, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FSteps', () => {
    it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should draw steps if `count` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                count: 3,
            },
        });

        expect(wrapper.findAll('.fsteps_step').length).toBe(3);
    });

    it('should draw active steps if `active` prop is given', async () => {
        const activeClass = 'fsteps_step-active';

        wrapper = createWrapper({
            propsData: {
                count: 3,
                active: 2,
            },
        });

        const steps = wrapper.findAll('.fsteps_step');

        expect(steps[0].classes(activeClass)).toBeTruthy();
        expect(steps[1].classes(activeClass)).toBeTruthy();
        expect(steps[2].classes(activeClass)).toBeFalsy();
    });

    it('should draw labels if `labels` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                count: 2,
                labels: ['step 1', 'step 2'],
            },
        });

        const labels = wrapper.findAll('.fsteps_label');

        expect(labels[0].text()).toBe('step 1');
        expect(labels[1].text()).toBe('step 2');
    });
});

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FEllipsis from '@/components/FEllipsis/FEllipsis.vue';
import { destroyWrapper } from '@/test/utils.js';

let wrapper = null;

function createWrapper() {
    wrapper = mount(FEllipsis, {
        propsData: {
            text: '123456789',
            overflow: 'middle',
            fixedCharsPos: 'start',
        },
    });
}

beforeEach(() => {
    createWrapper();
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FEllipsis', () => {
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should return correct left part of the text', () => {
        expect(wrapper.vm.leftChars).toBe('12345');
    });

    it('should return correct right part of the text', () => {
        expect(wrapper.vm.rightChars).toBe('6789');
    });
});

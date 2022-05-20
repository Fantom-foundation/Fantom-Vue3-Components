import { describe, it, expect } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';

const Playground = {
    template: `
        <div>
            <span data-testcode="elem">Elem 1</span>
            <span data-testcode="elem">Elem 2</span>
        </div>
    `,
};

describe('setInnerHTML vue test plugin', () => {
    it('should find and remove all attributes by given attribute name', () => {
        const wrapper = mount(Playground);

        wrapper.setInnerHTML('[data-testcode="elem"]', 'New content');

        const elems = wrapper.findByTestCode('elem');

        expect(elems[0].text()).toBe('New content');
        expect(elems[1].text()).toBe('New content');

        destroyWrapper(wrapper);
    });
});

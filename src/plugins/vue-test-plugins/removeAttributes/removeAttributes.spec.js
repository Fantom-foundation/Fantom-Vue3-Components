import { describe, it, expect } from 'vitest';
import { destroyWrapper } from '@/test/utils.js';
import { mount } from '@vue/test-utils';

const Playground = {
    template: `
        <div>
            <span id="id1" data-testcode="elem">Elem 1</span>
            <span id="id2" data-testcode="elem">Elem 2</span>
        </div>
    `,
};

describe('removeAttributes vue test plugin', () => {
    it('should find and remove all attributes by given attribute name', () => {
        const wrapper = mount(Playground);

        wrapper.removeAttributes('id');

        const elems = wrapper.findByTestCode('elem');

        expect(elems[0].attributes().id).not.toBeDefined();
        expect(elems[1].attributes().id).not.toBeDefined();

        destroyWrapper(wrapper);
    });
});

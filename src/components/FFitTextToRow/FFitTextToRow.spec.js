import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FFitTextToRow from './FFitTextToRow.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FFitTextToRow, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FFitTextToRow', () => {
    it('should display given text', () => {
        wrapper = createWrapper({
            props: {
                text: 'foo',
            },
        });

        expect(wrapper.text()).toContain('foo');
    });

    it('should display given content in the default slot', () => {
        wrapper = createWrapper({
            slots: {
                default: 'content',
            },
        });

        expect(wrapper.text()).toContain('content');
    });
});

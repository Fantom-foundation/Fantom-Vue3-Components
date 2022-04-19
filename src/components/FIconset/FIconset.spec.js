import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FIconset from '@/components/FIconset/FIconset.vue';
import FSvgIcon from '@/components/FSvgIcon/FSvgIcon.vue';
import { destroyWrapper } from '@/test/utils.js';

let wrapper = null;

function createWrapper({ propsData = { icon: 'fantom' }, attachTo } = {}) {
    return mount(FIconset, {
        propsData,
        attachTo,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FIconset', () => {
    it('should render correctly', () => {
        wrapper = createWrapper({
            propsData: {
                icon: 'fantom',
            },
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass attributes to the FSvgIcon component', () => {
        wrapper = createWrapper({
            propsData: {
                icon: 'fantom',
                size: '32px',
            },
        });

        const fSvgIcon = wrapper.findComponent(FSvgIcon);

        expect(fSvgIcon.exists()).toBeTruthy();
        expect(fSvgIcon.props('size')).toBe('32px');
    });

    it("should use icon component name in form 'icon-' + icon (prop)", () => {
        wrapper = createWrapper({
            propsData: {
                icon: 'fantom',
            },
        });

        expect(wrapper.vm.componentName).toBe('icon-fantom');
    });
});

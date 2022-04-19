import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FNavigationNode from '@/components/FNavigationNode/FNavigationNode.vue';
import { ref } from 'vue';
import { destroyWrapper } from '@/test/utils.js';

let wrapper = null;

function createWrapper({ propsData } = {}) {
    wrapper = mount(FNavigationNode, {
        propsData,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FNavigationNode', () => {
    it('should render link element if `node.url` is non-empty string', () => {
        createWrapper({
            propsData: {
                node: { url: '#foo' },
            },
        });

        expect(wrapper.find('a').exists()).toBe(true);
    });

    it('should render button element if `node.url` is not defined', () => {
        createWrapper();

        expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should render child elements if child nodes (`node._c`) exists and `node.expanded` is true', () => {
        createWrapper({
            propsData: {
                node: {
                    expanded: true,
                    _c: [{}, {}],
                },
            },
        });

        expect(wrapper.findAllComponents(FNavigationNode).length).toBeGreaterThan(1);
    });

    it('should render an icon if child nodes exist', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });

        expect(wrapper.findComponent({ name: 'f-svg-icon' }).exists()).toBe(true);
    });

    it('should expand/collapse child nodes if `expanded` property on the node prop is true/false', async () => {
        const node = ref({
            _c: [{}],
        });

        createWrapper({
            propsData: {
                node,
            },
        });

        node.value.expanded = true;

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.expanded).toBe(true);
    });

    it('should activate/deactivate (highlight/background) child nodes if `active` property on the node prop is true/false', async () => {
        const node = ref({
            _c: [{}],
        });

        createWrapper({
            propsData: {
                node,
            },
        });

        node.value.active = true;

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.active).toBe(true);
    });

    it('should pass `level` greater by one to child nodes', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });
        const child = wrapper.findAllComponents(FNavigationNode)[0];

        expect(child.props('level')).toBe(wrapper.vm.level + 1);
    });

    it('should add correct start (left) padding to each node', () => {
        createWrapper({
            propsData: {
                node: {
                    _c: [{}],
                },
            },
        });

        const child = wrapper.findAllComponents(FNavigationNode)[0];

        expect(wrapper.vm.itemStyle).toEqual({ paddingInlineStart: 'calc(1 * 18px)' });
        expect(child.vm.itemStyle).toEqual({ paddingInlineStart: 'calc(2 * 18px)' });
    });
});

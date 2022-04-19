import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import FAccordionNavigation from '@/components/FAccordionNavigation/FAccordionNavigation.vue';
import { clone } from '@/utils';
import FIconset from '@/components/FIconset/FIconset.vue';
import { findNodeBy } from '@/utils/simple-tree.js';
import { destroyWrapper } from '@/test/utils.js';

let wrapper = null;

const navigation = [
    {
        id: 'node1',
        label: 'Item 1',
        _c: [
            { id: 'node21', label: 'Item 2.1' },
            {
                id: 'node22',
                label: 'Item 2.2',
                _c: [
                    { id: 'foo-route', label: 'Item 3.1', route: `foo-route` },
                    { id: 'node32', label: 'Item 3.2', url: `#url32` },
                    { id: 'node33', label: 'Item 3.3', url: `#url33` },
                ],
            },
        ],
    },
    { id: 'node2', icon: 'fantom', label: 'Item 2', url: `#url2` },
    { id: 'node3', dontRender: true, label: 'Item 3', url: `#url3` },
];

function createWrapper() {
    wrapper = null;

    wrapper = mount(FAccordionNavigation, {
        propsData: {
            navigation: clone(navigation),
            iconsetComponent: 'f-iconset',
        },
        /*stubs: {
            RouterLink: RouterLinkStub,
        },*/
        global: {
            components: {
                FIconset: FIconset,
                RouterLink: RouterLinkStub,
            },
        },
    });
}

beforeEach(() => {
    createWrapper();
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FAccordionNavigation', () => {
    it('should render `router-link` component if `node.route` is defined', () => {
        createWrapper();

        expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    });

    it('should render an icon', () => {
        expect(wrapper.find('[data-node-id=node2] svg').exists()).toBe(true);
    });

    it('should highlight path by route name', async () => {
        const { node, parents } = findNodeBy(wrapper.vm.navigation, 'foo-route');

        wrapper.vm.highlightPathByRouteName({ name: 'foo-route' });
        await wrapper.vm.$nextTick();

        expect(node.active).toBe(true);
        parents.forEach((parent) => {
            expect(parent.active).toBe(true);
        });
    });
});

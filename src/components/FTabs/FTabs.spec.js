/* eslint-disable no-undef */

import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FTabs from '@/components/FTabs/FTabs.vue';
import FTab from '@/components/FTabs/FTab.vue';
import { destroyWrapper } from '@/test/utils.js';
import { delay } from '@/utils/index.js';

let wrapper = null;

const Playground = {
    components: { FTabs, FTab },
    template: `
        <FTabs :strategy="strategy" aria-label="Default tabs">
            <FTab :strategy="tabStrategy1" title="Tab 1" data-testid="tab1">
                <span id="tab1_content">Tab 1</span>
            </FTab>
            <FTab :strategy="tabStrategy2" title="Tab 2" data-testid="tab2">
                <span id="tab2_content">Tab 2</span>
            </FTab>
        </FTabs>
    `,
    props: {
        strategy: {
            type: String,
            default: undefined,
        },
        tabStrategy1: {
            type: String,
            default: undefined,
        },
        tabStrategy2: {
            type: String,
            default: undefined,
        },
    },
};

async function createWrapper({ propsData = {} } = {}) {
    const wrapper = mount(Playground, {
        propsData,
    });

    await delay();

    return wrapper;
}

function getContentElement(id) {
    return wrapper.find(`#${id}`);
}

async function activateTabByIndex(index = 0) {
    await wrapper.findAll('li')[index].trigger('click');
    await delay();
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FTabs', () => {
    it('should render content by default', async () => {
        wrapper = await createWrapper();

        expect(getContentElement('tab1_content').exists()).toBe(true);
        expect(getContentElement('tab2_content').exists()).toBe(true);
    });

    it('should render content only after the first tab activation if strategy is "create"', async () => {
        wrapper = await createWrapper({ propsData: { tabStrategy2: 'create' } });

        expect(getContentElement('tab2_content').exists()).toBe(false);
        expect(getContentElement('tab1_content').exists()).toBe(true);

        await activateTabByIndex(1);

        expect(getContentElement('tab2_content').exists()).toBe(true);
    });

    it('should render content only after the first tab activation if strategy is "create" on the default tab', async () => {
        wrapper = await createWrapper({ propsData: { tabStrategy1: 'create' } });

        expect(getContentElement('tab1_content').exists()).toBe(true);
    });

    it('should render content only on tab activation and should destroy content on tab deactivation if strategy is "create-destroy"', async () => {
        wrapper = await createWrapper({ propsData: { tabStrategy2: 'create-destroy' } });

        expect(getContentElement('tab2_content').exists()).toBe(false);
        expect(getContentElement('tab1_content').exists()).toBe(true);

        await activateTabByIndex(1);

        expect(getContentElement('tab2_content').exists()).toBe(true);

        await activateTabByIndex(0);

        expect(getContentElement('tab2_content').exists()).toBe(false);
    });
});

/* eslint-enable no-undef */

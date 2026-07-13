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
        <FTabs :strategy="strategy" :disabled="disabled" aria-label="Default tabs">
            <FTab :strategy="tabStrategy1" title="Tab 1" data-testid="tab1" id="tabpanel1">
                <span id="tab1_content">Tab 1</span>
            </FTab>
            <FTab :strategy="tabStrategy2" title="Tab 2" data-testid="tab2" id="tabpanel2">
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
        disabled: {
            type: Boolean,
            default: false,
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

function getTabElement(index) {
    return wrapper.findAll('li')[index];
}

function getFTabs(wrapper) {
    return wrapper.findComponent(FTabs);
}

async function activateTabByIndex(index = 0) {
    await wrapper.findAll('li')[index].trigger('click');
    await delay();
}

afterEach(() => {
    destroyWrapper(wrapper);
    window.location.hash = '';
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

    it('should disable all tabs', async () => {
        wrapper = await createWrapper({ propsData: { disabled: true, tabStrategy2: 'create-destroy' } });

        await activateTabByIndex(1);

        expect(getTabElement(0).attributes('aria-disabled')).toBe('true');
        expect(getTabElement(1).attributes('aria-disabled')).toBe('true');
        expect(getContentElement('tab1_content').exists()).toBe(true);
        expect(getContentElement('tab2_content').exists()).toBe(false);
    });

    it('should disable tabs given by ids', async () => {
        wrapper = await createWrapper({ propsData: { tabStrategy2: 'create-destroy' } });

        await activateTabByIndex(1);

        await getFTabs(wrapper).vm.disableTabs(['tabpanel2']);

        expect(getTabElement(1).attributes('aria-disabled')).toBe('true');
        expect(getTabElement(1).attributes('aria-selected')).toBe('false');
        expect(getTabElement(0).attributes('aria-selected')).toBe('true');
    });

    it('should activate nearest non-disabled tab to the right when activating a disabled tab', async () => {
        const DisabledTabPlayground = {
            components: { FTabs, FTab },
            template: `
                <FTabs>
                    <FTab title="Tab 1" id="tabpanel1">Tab 1</FTab>
                    <FTab title="Tab 2" id="tabpanel2" disabled>Tab 2</FTab>
                    <FTab title="Tab 3" id="tabpanel3" disabled>Tab 3</FTab>
                    <FTab title="Tab 4" id="tabpanel4">Tab 4</FTab>
                </FTabs>
            `,
        };
        wrapper = mount(DisabledTabPlayground);
        await delay();

        expect(wrapper.findAll('li')[0].attributes('aria-selected')).toBe('true');

        await wrapper.findAll('li')[1].trigger('click');
        await delay();

        expect(wrapper.findAll('li')[0].attributes('aria-selected')).toBe('false');
        expect(wrapper.findAll('li')[1].attributes('aria-selected')).toBe('false');
        expect(wrapper.findAll('li')[2].attributes('aria-selected')).toBe('false');
        expect(wrapper.findAll('li')[3].attributes('aria-selected')).toBe('true');
    });

    describe('urlHash prop logic', () => {
        const HashPlayground = {
            components: { FTabs, FTab },
            template: `
                <FTabs aria-label="Hash tabs">
                    <FTab title="Tab 1" id="tabpanel1" url-hash="hash1">
                        <span id="tab1_content">Tab 1</span>
                    </FTab>
                    <FTab title="Tab 2" id="tabpanel2" url-hash="hash2">
                        <span id="tab2_content">Tab 2</span>
                    </FTab>
                    <FTab title="Tab 3" id="tabpanel3">
                        <span id="tab3_content">Tab 3</span>
                    </FTab>
                </FTabs>
            `,
        };

        async function createHashWrapper() {
            wrapper = mount(HashPlayground);
            await delay();
            return wrapper;
        }

        it('should activate the tab corresponding to the URL hash on mount', async () => {
            window.location.hash = 'hash2';
            wrapper = await createHashWrapper();

            const tab1 = wrapper.findAll('li')[0];
            const tab2 = wrapper.findAll('li')[1];

            expect(tab2.attributes('aria-selected')).toBe('true');
            expect(tab1.attributes('aria-selected')).toBe('false');
        });

        it('should update the browser URL hash when a tab with urlHash is activated', async () => {
            wrapper = await createHashWrapper();

            expect(window.location.hash).toBe('#hash1');

            await wrapper.findAll('li')[1].trigger('click');
            await delay();

            expect(window.location.hash).toBe('#hash2');
        });

        it('should not update the browser URL hash when a tab without urlHash is activated', async () => {
            wrapper = await createHashWrapper();

            expect(window.location.hash).toBe('#hash1');

            await wrapper.findAll('li')[2].trigger('click');
            await delay();

            expect(window.location.hash).toBe('#hash1');
        });
    });
});

/* eslint-enable no-undef */

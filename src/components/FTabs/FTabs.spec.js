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

function getTabElements() {
    return wrapper.findAll('li');
}

function getTabElement(index) {
    return getTabElements()[index];
}

function getFTabs(wrapper) {
    return wrapper.findComponent(FTabs);
}

async function activateTabByIndex(index = 0) {
    await getTabElement(index).trigger('click');
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

        const tabElems = getTabElements();
        expect(tabElems[0].attributes('aria-disabled')).toBe('true');
        expect(tabElems[1].attributes('aria-disabled')).toBe('true');
        expect(getContentElement('tab1_content').exists()).toBe(true);
        expect(getContentElement('tab2_content').exists()).toBe(false);
    });

    it('should disable tabs given by ids', async () => {
        wrapper = await createWrapper({ propsData: { tabStrategy2: 'create-destroy' } });

        await activateTabByIndex(1);

        await getFTabs(wrapper).vm.disableTabs(['tabpanel2']);

        const tabElems = getTabElements();
        expect(tabElems[1].attributes('aria-disabled')).toBe('true');
        expect(tabElems[1].attributes('aria-selected')).toBe('false');
        expect(tabElems[0].attributes('aria-selected')).toBe('true');
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

        let tabElems = getTabElements();
        expect(tabElems[0].attributes('aria-selected')).toBe('true');

        await tabElems[1].trigger('click');
        await delay();

        tabElems = getTabElements();
        expect(tabElems[0].attributes('aria-selected')).toBe('false');
        expect(tabElems[1].attributes('aria-selected')).toBe('false');
        expect(tabElems[2].attributes('aria-selected')).toBe('false');
        expect(tabElems[3].attributes('aria-selected')).toBe('true');
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

            const tabElems = getTabElements();
            expect(tabElems[1].attributes('aria-selected')).toBe('true');
            expect(tabElems[0].attributes('aria-selected')).toBe('false');
        });

        it('should update the browser URL hash when a tab with urlHash is activated', async () => {
            wrapper = await createHashWrapper();

            expect(window.location.hash).toBe('#hash1');

            const tabElems = getTabElements();
            await tabElems[1].trigger('click');
            await delay();

            expect(window.location.hash).toBe('#hash2');
        });

        it('should clear the browser URL hash when a tab without urlHash is activated, if another tab has urlHash', async () => {
            wrapper = await createHashWrapper();

            expect(window.location.hash).toBe('#hash1');

            const tabElems = getTabElements();
            await tabElems[2].trigger('click');
            await delay();

            expect(window.location.hash).toBe('');
        });

        it('should not clear or modify the browser URL hash when a tab is activated, if no tabs have urlHash prop set', async () => {
            const NoHashPlayground = {
                components: { FTabs, FTab },
                template: `
                    <FTabs>
                        <FTab title="Tab 1" id="tabpanel1">Tab 1</FTab>
                        <FTab title="Tab 2" id="tabpanel2">Tab 2</FTab>
                    </FTabs>
                `,
            };
            window.location.hash = 'some-random-hash';
            wrapper = mount(NoHashPlayground);
            await delay();

            const tabElems = getTabElements();
            await tabElems[1].trigger('click');
            await delay();

            expect(window.location.hash).toBe('#some-random-hash');
        });
    });

    describe('hiding and showing tabs dynamically', () => {
        const HideShowPlayground = {
            components: { FTabs, FTab },
            template: `
                <FTabs>
                    <FTab title="Tab 1" id="tabpanel1">Tab 1</FTab>
                    <FTab title="Tab 2" id="tabpanel2">Tab 2</FTab>
                    <FTab title="Tab 3" id="tabpanel3">Tab 3</FTab>
                </FTabs>
            `,
        };

        async function createHideShowWrapper() {
            wrapper = mount(HideShowPlayground);
            await delay();
            return wrapper;
        }

        it('should hide tabs using hideTabs or hideTab method and switch active tab if active tab is hidden', async () => {
            wrapper = await createHideShowWrapper();

            let tabElems = getTabElements();
            expect(tabElems[0].attributes('aria-selected')).toBe('true');

            await getFTabs(wrapper).vm.hideTabs(['tabpanel1']);
            await delay();

            tabElems = getTabElements();
            expect(tabElems[0].element.style.display).toBe('none');
            expect(tabElems[1].attributes('aria-selected')).toBe('true');
        });

        it('should show tabs using showTabs or showTab method', async () => {
            wrapper = await createHideShowWrapper();

            await getFTabs(wrapper).vm.hideTab('tabpanel2');
            await delay();

            let tabElems = getTabElements();
            expect(tabElems[1].element.style.display).toBe('none');

            await getFTabs(wrapper).vm.showTab('tabpanel2');
            await delay();

            tabElems = getTabElements();
            expect(tabElems[1].element.style.display).not.toBe('none');
        });

        it('should support showOthers in hideTabs and hideOthers in showTabs', async () => {
            wrapper = await createHideShowWrapper();

            await getFTabs(wrapper).vm.showTabs(['tabpanel3'], true);
            await delay();

            let tabElems = getTabElements();
            expect(tabElems[0].element.style.display).toBe('none');
            expect(tabElems[1].element.style.display).toBe('none');
            expect(tabElems[2].element.style.display).not.toBe('none');
            expect(tabElems[2].attributes('aria-selected')).toBe('true');

            await getFTabs(wrapper).vm.hideTabs(['tabpanel3'], true);
            await delay();

            tabElems = getTabElements();
            expect(tabElems[0].element.style.display).not.toBe('none');
            expect(tabElems[1].element.style.display).not.toBe('none');
            expect(tabElems[2].element.style.display).toBe('none');
            expect(tabElems[0].attributes('aria-selected')).toBe('true');
        });

        it('should support hiding tab initially on mount via hidden prop', async () => {
            const HiddenPropPlayground = {
                components: { FTabs, FTab },
                template: `
                    <FTabs>
                        <FTab title="Tab 1" id="tabpanel1" active hidden>Tab 1</FTab>
                        <FTab title="Tab 2" id="tabpanel2">Tab 2</FTab>
                    </FTabs>
                `,
            };
            wrapper = mount(HiddenPropPlayground);
            await delay();

            const tabElems = getTabElements();
            expect(tabElems[0].element.style.display).toBe('none');
            expect(tabElems[1].attributes('aria-selected')).toBe('true');
        });
    });
});

/* eslint-enable no-undef */

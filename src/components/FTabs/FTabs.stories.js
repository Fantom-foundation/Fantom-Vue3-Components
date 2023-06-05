// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import FTabs from './FTabs.vue';
import FTab from './FTab.vue';

export default {
    title: 'FTabs',
    component: FTabs,
};

export const Default = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <FTabs aria-label="Default tabs">
                <FTab title="Tab 1">
                    First tab is active by default.
                </FTab>
                <FTab title="Tab 2">
                    Tab 2 content
                </FTab>
                <FTab title="Tab 3">
                    Tab 3 content
                </FTab>
            </FTabs>
        </div>
    `,
});

export const ActiveTab = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <FTabs aria-label="Default tabs">
                <FTab title="Tab 1">
                    Tab 1 content
                </FTab>
                <FTab title="Tab 2" active>
                    Tab 2 content
                </FTab>
                <FTab title="Tab 3">
                    Tab 3 content
                </FTab>
            </FTabs>
        </div>
    `,
});

export const DisabledTab = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <FTabs aria-label="Default tabs">
                <FTab title="Tab 1">
                    Tab 1 content
                </FTab>
                <FTab title="Tab 2" active>
                    Tab 2 content
                </FTab>
                <FTab title="Tab 3" disabled>
                    Tab 3 content
                </FTab>
            </FTabs>
        </div>
    `,
});

export const TitleSlot = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <FTabs aria-label="Default tabs">
                <template #tab1-title><b>Bold</b></template>
                <template #tab2-title><i>Italic</i></template>
                <template #tab3-title><span>&#9742; With icon</span></template>

                <FTab title-slot="tab1-title">
                    Tab 1 content
                </FTab>
                <FTab title-slot="tab2-title">
                    Tab 2 content
                </FTab>
                <FTab title-slot="tab3-title">
                    Tab 3 content
                </FTab>
                <FTab title="Tab 4">
                    Tab 4 content
                </FTab>
            </FTabs>
        </div>
    `,
});

export const ALotOfTabs = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <FTabs aria-label="Default tabs">
                <FTab title="Tab 1">
                    Tab 1 content
                </FTab>
                <FTab title="Tab 2">
                    Tab 2 content
                </FTab>
                <FTab title="Tab 3">
                    Tab 3 content
                </FTab>
                <FTab title="Tab 4">
                    Tab 4 content
                </FTab>
                <FTab title="Tab 5">
                    Tab 5 content
                </FTab>
                <FTab title="Tab 6">
                    Tab 6 content
                </FTab>
                <FTab title="Tab 7">
                    Tab 7 content
                </FTab>
                <FTab title="Tab Loooooooooooooooong">
                    Tab 8 content
                </FTab>
            </FTabs>
        </div>
    `,
});

export const Strategy = () => ({
    components: { FTabs, FTab },
    template: `
        <div>
            <h3><code>render</code></h3>
            <FTabs aria-label="Render strategy">
                <FTab title="Tab 1">
                    Tab 1 content
                </FTab>
                <FTab title="Tab 2">
                    Tab 2 content
                </FTab>
            </FTabs>
            <h3><code>create</code></h3>
            <FTabs aria-label="Render strategy">
                <FTab title="Tab 1">
                    Tab 1 content
                </FTab>
                <FTab strategy="create" title="Tab 2">
                    Tab 2 content
                </FTab>
            </FTabs>
            <h3><code>create-destroy</code></h3>
            <FTabs aria-label="Render strategy">
                <FTab title="Tab 1">
                    Tab 1 content
                </FTab>
                <FTab strategy="create-destroy" title="Tab 2">
                    Tab 2 content
                </FTab>
            </FTabs>
        </div>
    `,
});

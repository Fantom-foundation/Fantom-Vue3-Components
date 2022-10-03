import { FViewSwitcher, FButton } from '../index.js';
import { markRaw } from 'vue';

export default {
    title: 'FViewSwitcher',
    component: FViewSwitcher,
};

const Component1 = {
    template: `<b>Component 1</b>`,
};

const Component2 = {
    template: `<b>Component 2</b>`,
};

export const Default = () => ({
    components: { FViewSwitcher, Component1 },
    template: `
        <div>
            <FViewSwitcher :id="id" :components="{Component1}" />
        </div>
    `,
    data() {
        return {
            id: 'id123',
            Component1: markRaw(Component1),
        };
    },
});

export const SwitchTo = () => ({
    components: { FViewSwitcher, FButton, Component1, Component2 },
    template: `
        <div>
            <FViewSwitcher ref="switcher" :id="id" :components="{Component1, Component2}" /><br />
            switch to: <FButton label="Component 1" @click="switchTo('Component1')" />
            <FButton label="Component 2" @click="switchTo('Component2')" />
        </div>
    `,
    data() {
        return {
            id: 'id123',
            Component1: markRaw(Component1),
            Component2: markRaw(Component2),
        };
    },
    methods: {
        switchTo(componentName) {
            this.$refs.switcher.switchTo(componentName);
        },
    },
});

export const GoBack = () => ({
    components: { FViewSwitcher, FButton, Component1, Component2 },
    template: `
        <div>
            <FViewSwitcher
                ref="switcher"
                :id="id"
                :components="{Component1, Component2}"
                :app-structure="[
                    {
                        id: 'Component1',
                        type: 'component',
                        _c: [
                            {
                                id: 'Component2',
                                type: 'component',
                            },
                        ],
                    },
                ]"
            /><br />
            <FButton label="Go back" @click="goBack()" />
            <FButton label="Component 2" @click="switchTo('Component2')" />
        </div>
    `,
    data() {
        return {
            id: 'id123',
            Component1: markRaw(Component1),
            Component2: markRaw(Component2),
        };
    },
    methods: {
        goBack() {
            this.$refs.switcher.goBack();
        },
        switchTo(componentName) {
            this.$refs.switcher.switchTo(componentName);
        },
    },
});

export const Transitions = () => ({
    components: { FViewSwitcher, FButton, Component1, Component2 },
    template: `
        <div class="fviewtransition-absolutechildren">
            <FButton label="Go back" @click="goBack()" />
            <FButton label="Component 2" @click="switchTo('Component2')" />
            <br />
            <FViewSwitcher
                ref="switcher"
                enable-transitions
                forward-transition="slide-left"
                backward-transition="slide-right"
                :id="id"
                :components="{Component1, Component2}"
                :app-structure="[
                    {
                        id: 'Component1',
                        type: 'component',
                        _c: [
                            {
                                id: 'Component2',
                                type: 'component',
                            },
                        ],
                    },
                ]"
            />
        </div>
    `,
    data() {
        return {
            id: 'id123',
            Component1: markRaw(Component1),
            Component2: markRaw(Component2),
        };
    },
    methods: {
        goBack() {
            this.$refs.switcher.goBack();
        },
        switchTo(componentName) {
            this.$refs.switcher.switchTo(componentName);
        },
    },
});

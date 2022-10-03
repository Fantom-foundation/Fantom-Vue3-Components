import { FViewTransition, FButton } from '../index.js';
import { markRaw } from 'vue';

export default {
    title: 'FViewTransition',
    component: FViewTransition,
};

const Component1 = {
    template: `<b>Component 1</b>`,
};

const Component2 = {
    template: `<b>Component 2</b>`,
};

export const Default = () => ({
    components: { FViewTransition, FButton, Component1, Component2 },
    template: `
        <div>
        <FButton label="<" secondary size="small" @click="backward()" />
        <FButton label=">" secondary size="small" @click="forward()" />
        <FButton label="Disable" secondary size="small" @click="disable()" />
        <FButton label="Enable" secondary size="small" @click="enable()" />
        <FViewTransition ref="transition" :disabled="disabled" forward-transition="slide-left" backward-transition="slide-right" class="fviewtransition-absolutechildren">
            <Component :is="component" />
        </FViewTransition>
        </div>
    `,
    data() {
        return {
            component: 'Component1',
            disabled: false,
            Component1: markRaw(Component1),
            Component2: markRaw(Component2),
        };
    },
    methods: {
        forward() {
            this.component = 'Component2';
            this.$refs.transition.forward();
        },

        backward() {
            this.component = 'Component1';
            this.$refs.transition.backward();
        },

        disable() {
            this.disabled = true;
        },

        enable() {
            this.disabled = false;
        },
    },
});

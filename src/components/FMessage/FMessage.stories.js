// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import FMessage from './FMessage.vue';

export default {
    title: 'FMessage',
    component: FMessage,
};

function validator(_value) {
    return _value === 'yes';
}

export const Default = () => ({
    components: { FMessage },
    template: `
        <div>
            <FMessage type="success"><b>Success</b> message</FMessage>
            <FMessage type="error"><b>Error</b> message</FMessage>
            <FMessage type="info"><b>Info</b> message</FMessage>
            <FMessage type="warning"><b>Warning</b> message</FMessage>
        </div>
    `,
    methods: { validator },
});

export const Animate = () => ({
    components: { FMessage },
    template: `
        <div>
            <FMessage animate hide-on-click type="success"><b>Success</b> message</FMessage>
            <FMessage animate hide-on-click animation-in="slide-right-enter-active" animation-out="slide-left-leave-active" type="error"><b>Error</b> message</FMessage>
            <FMessage animate hide-on-click animation-in="scale-center-enter-active" animation-out="scale-center-leave-active" type="info"><b>Info</b> message</FMessage>
            <FMessage animate hide-on-click animation-in="slide-left-enter-active" animation-out="slide-right-leave-active" type="warning"><b>Warning</b> message</FMessage>
        </div>
    `,
    methods: { validator },
});

export const Hide = () => ({
    components: { FMessage },
    template: `
        <div>
            <h3>Hide on message click</h3>
            <FMessage hide-on-click animate type="success"><b>Success</b> message</FMessage>
            <FMessage hide-on-click animate animation-in="slide-right-enter-active" animation-out="slide-left-leave-active" type="error"><b>Error</b> message</FMessage>
            <FMessage hide-on-click animate animation-in="scale-center-enter-active" animation-out="scale-center-leave-active" type="info"><b>Info</b> message</FMessage>
            <FMessage hide-on-click animate animation-in="slide-left-enter-active" animation-out="slide-right-leave-active" type="warning"><b>Warning</b> message</FMessage>

            <h3>Hide on 'close' button click</h3>
            <FMessage hide-on-close-button animate type="success"><b>Success</b> message</FMessage>
            <FMessage hide-on-close-button animate animation-in="slide-right-enter-active" animation-out="slide-left-leave-active" type="error"><b>Error</b> message</FMessage>
            <FMessage hide-on-close-button animate animation-in="scale-center-enter-active" animation-out="scale-center-leave-active" type="info"><b>Info</b> message</FMessage>
            <FMessage hide-on-close-button animate animation-in="slide-left-enter-active" animation-out="slide-right-leave-active" type="warning"><b>Warning</b> message</FMessage>

            <h3>Hide after 3 seconds</h3>
            <FMessage :hide-after="3000" animate type="success"><b>Success</b> message</FMessage>
            <FMessage :hide-after="3000" animate animation-in="slide-right-enter-active" animation-out="slide-left-leave-active" type="error"><b>Error</b> message</FMessage>
            <FMessage :hide-after="3000" animate animation-in="scale-center-enter-active" animation-out="scale-center-leave-active" type="info"><b>Info</b> message</FMessage>
            <FMessage :hide-after="3000" animate animation-in="slide-left-enter-active" animation-out="slide-right-leave-active" type="warning"><b>Warning</b> message</FMessage>
        </div>
    `,
    methods: { validator },
});

export const Slots = () => ({
    components: { FMessage },
    template: `
        <div>
            <FMessage type="success" with-icon>
                <template #prefix><span>prefix</span></template>
                <b>Success</b> message
                <template #suffix><span>suffix</span></template>
            </FMessage>
        </div>
    `,
    methods: { validator },
});

export const WithIcon = () => ({
    components: { FMessage },
    template: `
        <div>
            <FMessage type="success" with-icon><b>Success</b> message</FMessage>
            <FMessage type="error" with-icon><b>Error</b> message</FMessage>
            <FMessage type="info" with-icon><b>Info</b> message</FMessage>
            <FMessage type="warning" with-icon><b>Warning</b> message</FMessage>
        </div>
    `,
    methods: { validator },
});

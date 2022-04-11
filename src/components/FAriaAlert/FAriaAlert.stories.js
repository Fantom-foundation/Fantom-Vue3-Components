// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import FAriaAlert from './FAriaAlert.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FAriaAlert',
    component: FAriaAlert,
};

export const Default = () => ({
    components: { FAriaAlert, FButton },
    template: `
        <div>
            <!-- main contnent -->
            <div>
                <FButton label="Append message" @click.native="onAppend" />
                <FButton label="Replace messages" @click.native="onReplace" />
                <FButton label="Clear messages" @click.native="onClear" />
            </div>

            <FAriaAlert />
        </div>
    `,
    data() {
        return {
            msgsCount: 1,
        };
    },
    methods: {
        onAppend() {
            FAriaAlert.append(`Message <b>${this.msgsCount++}</b>`);
        },
        onReplace() {
            FAriaAlert.replace('Replace message');
        },
        onClear() {
            FAriaAlert.clear();
        },
    },
});

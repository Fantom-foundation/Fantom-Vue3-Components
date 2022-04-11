import FNetworkStatus from './FNetworkStatus.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

export default {
    title: 'FNetworkStatus',
    component: FNetworkStatus,
};

export const Default = () => ({
    components: { FNetworkStatus, FButton, FAriaAlert },
    template: `
        <div>
            <FButton label="offline" @click.native="offline()" />
            <FButton label="online" @click.native="online()" />
            <FNetworkStatus />
            <FAriaAlert />
        </div>
    `,
    methods: {
        offline() {
            FNetworkStatus.offline();
        },

        online() {
            FNetworkStatus.online();
        },
    },
});

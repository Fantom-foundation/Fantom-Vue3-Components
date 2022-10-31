import FActionButtons from './FActionButtons.vue';

export default {
    title: 'FActionButtons',
    component: FActionButtons,
};

export const Default = () => ({
    components: { FActionButtons },
    //language=HTML
    template: `
        <div>
            <FActionButtons :buttons="buttons" @button-action="action = $event" />
            <p>
                action: {{ action }}
            </p>
        </div>
    `,
    data() {
        return {
            buttons: [
                {
                    action: 'action',
                    label: 'Action',
                },
                {
                    action: 'cancel',
                    label: 'Cancel',
                    secondary: true,
                },
            ],
            action: '',
        };
    },
});

export const Disabled = () => ({
    components: { FActionButtons },
    //language=HTML
    template: `
        <div>
            <FActionButtons disabled :buttons="buttons" @button-action="action = $event" />
            <p>
                action: {{ action }}
            </p>
        </div>
    `,
    data() {
        return {
            buttons: [
                {
                    action: 'action',
                    label: 'Action',
                },
                {
                    action: 'cancel',
                    label: 'Cancel',
                    secondary: true,
                },
            ],
            action: '',
        };
    },
});

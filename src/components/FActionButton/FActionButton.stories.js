import FActionButton from './FActionButton.vue';

export default {
    title: 'FActionButton',
    component: FActionButton,
};

export const Default = () => ({
    components: { FActionButton },
    template: `
        <div>
            <FActionButton value="foo" label="action button" @update:value="onUpdate" />
            <p>
                update:value <b>{{ value }}</b>
            </p>
        </div>
    `,
    data() {
        return {
            value: '',
        };
    },
    methods: {
        onUpdate(value) {
            this.value = value;
        },
    },
});

export const Toggle = () => ({
    components: { FActionButton },
    template: `
        <div>
        <FActionButton toggle value="foo" label="action button" @update:value="onUpdate" />
        <p>
            update:value <b>{{ value }}</b>
        </p>
        </div>
    `,
    data() {
        return {
            value: '',
        };
    },
    methods: {
        onUpdate(value) {
            this.value = value;
        },
    },
});

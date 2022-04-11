// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import FPasswordField from './FPasswordField.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FPasswordField',
    component: FPasswordField,
};

export const Default = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <FPasswordField label="Large" field-size="large" name="pwd1" />
            <FPasswordField label="Default" name="pwd2" />
            <FPasswordField label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <FPasswordField disabled label="Large" field-size="large" name="pwd1" />
            <FPasswordField disabled label="Default" name="pwd2" />
            <FPasswordField disabled label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <FPasswordField invalid label="Large" field-size="large" name="pwd1" />
            <FPasswordField invalid label="Default" name="pwd2" />
            <FPasswordField invalid label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Required = () => ({
    components: { FPasswordField, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit" novalidate>
                <FPasswordField
                    ref="passwordfield"
                    required
                    validate-on-input
                    label="Validation"
                    name="pwd1"
                />
                <br /><br />
                <FButton type="submit" size="small">Submit</FButton>
            </form>
        </div>
    `,
    methods: {
        onSubmit(_event) {
            this.$refs.passwordfield.validate();

            _event.preventDefault();
        },
    },
});

export const Validation = () => ({
    components: { FPasswordField, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit" novalidate>
                <FPasswordField
                    ref="passwordfield"
                    :validator="validator"
                    required
                    validate-on-change
                    label="Validation"
                    name="pwd1"
                />
                <br /><br />
                <FButton type="submit" size="small">Submit</FButton>
            </form>
        </div>
    `,
    methods: {
        validator(_value) {
            return _value.length < 9 ? 'Password must be at least 8 characters long' : '';
        },
        onSubmit(_event) {
            this.$refs.passwordfield.validate();

            _event.preventDefault();
        },
    },
});

export const Slots = () => ({
    components: { FPasswordField, FButton },
    template: `
        <div>
            <FPasswordField label="Slot 'button'" name="pwd1">
                <template #button="slotProps">
                    <FButton secondary :size="slotProps.buttonSize">
                        <span v-if="slotProps.type === 'password'">show</span>
                        <span v-else-if="slotProps.type === 'text'">hide</span>
                    </FButton>
                </template>
            </FPasswordField>
            <FPasswordField label="Slot 'icon'" name="pwd1">
                <template #icon="{ type }">
                    <span v-if="type === 'password'">show</span>
                    <span v-else-if="type === 'text'">hide</span>
                </template>
            </FPasswordField>
        </div>
    `,
});

export const InfoText = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <FPasswordField info-text="Enter a password please" label="Password" name="pwd2" />
        </div>
    `,
});

import FSearchField from './FSearchField.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';

export default {
    title: 'FSearchField',
    component: FSearchField,
};

export const Default = () => ({
    components: { FSearchField },
    template: `
        <div>
            <FSearchField label="Large" field-size="large" name="pwd1" />
            <FSearchField label="Default" name="pwd2" value="initial text" />
            <FSearchField label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FSearchField },
    template: `
        <div>
            <FSearchField disabled label="Large" field-size="large" name="pwd1" />
            <FSearchField disabled label="Default" name="pwd2" value="initial text" />
            <FSearchField disabled label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FSearchField },
    template: `
        <div>
            <FSearchField invalid label="Large" field-size="large" name="pwd1" />
            <FSearchField invalid label="Default" name="pwd2" value="initial text" />
            <FSearchField invalid label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

/*
export const Validation = () => ({
    components: { FSearchField, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <FSearchField
                    ref="passwordfield"
                    :validator="validator"
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
*/

export const Slots = () => ({
    components: { FSearchField, FButton, FSvgIcon, IconAngleLeft },
    template: `
        <div>
            <FSearchField label="Slot 'button'" name="pwd1">
                <template #button="slotProps">
                    <FButton secondary :size="slotProps.buttonSize" :style="{ visibility: slotProps.value ? 'visible' : 'hidden' }">
                        clear
                    </FButton>
                </template>
            </FSearchField>
            <FSearchField label="Slot 'icon'" name="pwd1">
                <template #icon>
                    <FSvgIcon size="1.2em" rotate="180deg"><IconAngleLeft /></FSvgIcon>
                </template>
            </FSearchField>
            <FSearchField label="Slot 'magnifier'" name="pwd1">
                <template #magnifier>
                    <FSvgIcon size="1.2em" rotate="180deg"><IconAngleLeft /></FSvgIcon>
                </template>
            </FSearchField>
        </div>
    `,
});

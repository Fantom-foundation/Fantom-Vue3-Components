import FDatetimeField from './FDatetimeField.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FDatetimeField',
    components: FDatetimeField,
};

export const Default = () => ({
    components: { FDatetimeField },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <FDatetimeField field-size="large" label="Large" />
            <FDatetimeField label="Default" />
            <FDatetimeField field-size="small" label="Small" />
            <FDatetimeField field-size="mini" label="Mini" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FDatetimeField },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <FDatetimeField disabled field-size="large" label="Large" />
            <FDatetimeField disabled label="Default" />
            <FDatetimeField disabled field-size="small" label="Small" />
            <FDatetimeField disabled field-size="mini" label="Mini" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FDatetimeField },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <FDatetimeField invalid field-size="large" label="Large" />
            <FDatetimeField invalid label="Default" />
            <FDatetimeField invalid field-size="small" label="Small" />
            <FDatetimeField invalid field-size="mini" label="Mini" />
        </div>
    `,
});

export const Validation = () => ({
    components: { FDatetimeField, FButton },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <form action="" @submit="onSubmit">
                <FDatetimeField
                    :validator="validator"
                    error-message="Input 1 is required."
                    info-text="hint: foo"
                    ref="inp1"
                    label="Validate on submit"
                />
                <FDatetimeField
                    :validator="validator"
                    validate-on-change
                    error-message="Input 2 is required."
                    info-text="hint: foo"
                    ref="inp2"
                    label="Validate on change"
                />
                <FDatetimeField
                    :validator="validator"
                    validate-on-change
                    validate-on-input
                    error-message="Input 3 is required."
                    info-text="hint: foo"
                    ref="inp3"
                    label="Validate on change and input"
                />
                <br /><br />
                <FButton type="submit" size="small">Submit</FButton>
            </form>
        </div>
    `,
    methods: {
        validator(value) {
            console.log('validator', value);
            return value === '';
        },
        onSubmit(event) {
            this.$refs.inp1.validate();
            this.$refs.inp2.validate();
            this.$refs.inp3.validate();

            event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FDatetimeField, FButton },
    template: `
        <div>
            <FDatetimeField v-model:value="value" />
            <FButton secondary @click.native="onButtonClick">set value to '2021-10-31T14:10'</FButton>
            <span>value: {{ value }}</span>
        </div>
    `,
    data() {
        return { value: '2021-10-31T14:16' };
    },
    methods: {
        onButtonClick() {
            this.value = '2021-10-31T14:10';
        },
    },
});

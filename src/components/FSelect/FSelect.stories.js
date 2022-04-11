import FSelect from './FSelect.vue';
// import FMessage from '../FMessage/FMessage.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

/*
function validator(_value) {
    return _value === '2';
}
*/

const data = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
];

const data2 = [
    { label: 'Select an option', value: null, disabled: true },
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
];

const data3 = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2, selected: true },
    { label: 'Option 3', value: 3 },
];

export default {
    title: 'FSelect',
    component: FSelect,
};

export const Default = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect label="Large" select-size="large" :data="data2" />
            <FSelect label="Default" :data="data" />
            <FSelect label="Small" select-size="small" :data="data" />
            <FSelect label="Mini" select-size="mini" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
            data2: [...data2],
        };
    },
});

export const Disabled = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect disabled label="Large" select-size="large" :data="data2" />
            <FSelect disabled label="Default" :data="data" />
            <FSelect disabled label="Small" select-size="small" :data="data" />
            <FSelect disabled label="Mini" select-size="mini" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
            data2: [...data2],
        };
    },
});

export const Invalid = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect invalid label="Large" select-size="large" :data="data2" />
            <FSelect invalid label="Default" :data="data" />
            <FSelect invalid label="Small" select-size="small" :data="data" />
            <FSelect invalid label="Mini" select-size="mini" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
            data2: [...data2],
        };
    },
});

export const SelectedItem = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect :data="data" label="Select" />
        </div>
    `,
    data() {
        return {
            data: [...data3],
        };
    },
});

export const Value = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect value="3" :data="data" label="Select" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

export const Required = () => ({
    components: { FSelect, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit" novalidate>
                <FSelect
                    required
                    validate-on-change
                    error-message="Select an option"
                    ref="select"
                    label="Select"
                    :data="[
                        {label: '---', value: ''},
                        {label: 'Option 1', value: 1},
                        {label: 'Option 2', value: 2},
                        {label: 'Option 3', value: 3}
                    ]"
                />
                <br /><br />
                <FButton type="submit" size="small">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    methods: {
        onSubmit(_event) {
            this.$refs.select.validate();

            _event.preventDefault();
        },
    },
});

export const Validation = () => ({
    components: { FSelect, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <FSelect
                    :validator="_value => !_value"
                    validate-on-change
                    error-message="Select an option"
                    ref="select1"
                    label="Select 1"
                    :data="[
                        {label: '---', value: ''},
                        {label: 'Option 1', value: 1},
                        {label: 'Option 2', value: 2},
                        {label: 'Option 3', value: 3}
                    ]"
                />
                <FSelect
                    :validator="validator"
                    validate-on-change
                    error-message__="Option 2 must be selected"
                    ref="select2"
                    label="Select 2"
                    value="1"
                    :data="[{label: 'Option 1', value: 1}, {label: 'Option 2', value: 2}, {label: 'Option 3', value: 3}]"
                />
                <br /><br />
                <FButton type="submit" size="small">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    methods: {
        validator(_value) {
            if (_value !== '2') {
                return 'Option 2 must be selected';
            }

            return '';
        },
        onSubmit(_event) {
            this.$refs.select1.validate();
            this.$refs.select2.validate();

            _event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FSelect, FButton },
    template: `
        <div>
            <FSelect
                name="bla"
                v-model:value="sel"
                :data="data"
                aria-label="Select"
            />
            Selected: {{ sel }}
            <FButton secondary size="small" @click.native="sel = '1'">Set value to '1'</FButton>
        </div>
    `,
    data() {
        return {
            sel: '3',
            data: [...data3],
        };
    },
});

export const Slots = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect value="3" :data="data" aria-label="Select">
                <template #top>Top</template>
                <template #bottom>Bottom</template>
            </FSelect>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

export const InfoText = () => ({
    components: { FSelect },
    template: `
        <div>
            <FSelect info-text="Info text" label="Label" value="3" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

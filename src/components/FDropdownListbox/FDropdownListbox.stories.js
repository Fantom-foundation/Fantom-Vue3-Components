import FDropdownListbox from './FDropdownListbox.vue';
import FButton from '../FButton/FButton.vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';
import { clone } from '../../utils';

const data = [
    { label: 'item 1', value: '10' },
    { label: 'item 2', id: 'myid', value: '20' },
    { label: 'item 3 Lorem ipsum', value: '30' },
    { label: 'item 4', value: '40' },
    { label: 'item 5', value: '50' },
    { label: 'item 6', value: '60' },
];

const data2 = [];

for (let i = 1; i < 200; i++) {
    data2.push({
        label: i === 8 ? `Loooooooooooooooooooooooooooooooooooooong` : `item ${i}`,
        value: `${i * 10}`,
    });
}

const data3 = [
    { label: 'item 1', value: '10' },
    { label: 'item 2 Looooooooooooooooong', id: 'myid', value: '20' },
];

export default {
    title: 'FDropdownListbox',
    component: FDropdownListbox,
};

export const Default = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            <FDropdownListbox />
        </div>
    `,
});

export const Data = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data" @component-change="onListboxItemSelected" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {
        onListboxItemSelected(_item) {
            this.selectedItem = _item.label;
        },
    },
});

export const SelectedItem = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data" />
            <button @click="data = [...newData]">new data</button>
        </div>
    `,
    data() {
        return {
            data: data.map((_item, _idx) => (_idx === 3 ? { ..._item, selected: true } : _item)),
            newData: [...data3],
        };
    },
    methods: {},
});

export const Value = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox value="20" :data="data" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const LotOfItems = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data" labeled-by="fllbl1" />
        </div>
    `,
    data() {
        return {
            data: [...data2],
        };
    },
    methods: {},
});

export const Searchable = () => ({
    components: { FDropdownListbox, FSvgIcon, IconAngleLeft },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox searchable :data="data" labeled-by="fllbl1">
                <template #icon>
                    <FSvgIcon size="1.2em" rotate="180deg"><IconAngleLeft /></FSvgIcon>
                </template>
            </FDropdownListbox>
        </div>
    `,
    data() {
        return {
            data: [...data2],
        };
    },
    methods: {},
});

export const Disabled = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox disabled :data="data" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {},
});

export const DisabledItems = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data" />
        </div>
    `,
    data() {
        return {
            data: data.map((_item, _idx) =>
                _idx === 0 || _idx === 3 || _idx === 4 ? { ..._item, disabled: true } : _item
            ),
        };
    },
    methods: {},
});

export const SelectOnMainAction = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Select an item only by pressing the 'Enter' key or by clicking on the item.
            <FDropdownListbox v-model:value="selectedItem" select-on-main-action :data="data" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {},
});

export const VariableWidth = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Width of the component will not be automatically adjusted according to the longest item.
            <FDropdownListbox v-model:value="selectedItem" variable-width :data="data" />
            <br />
            Selected: {{ selectedItem }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItem: '',
        };
    },
    methods: {},
});

export const CustomButtonLabelSlot = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data">
                <template v-slot:button-label="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
            </FDropdownListbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const CustomItemSlot = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data">
                <template v-slot:item="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
            </FDropdownListbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const CustomButtonLabelAndItemSlot = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data">
                <template v-slot:button-label="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
                <template v-slot:item="{ item }">
                    &#9733; <b>{{ item.label }}</b>
                </template>
            </FDropdownListbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
    methods: {},
});

export const Text = () => ({
    components: { FDropdownListbox, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate?</div><div>Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias?</div><div>Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit?</div><div>Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate.</div>
            <FDropdownListbox v-model:value="value" :focus-item-on-focus="true" :data="data" />
            <FButton secondary size="small" @click.native="onButtonClick">Set value to '30'</FButton>
            <br />
            Selected: {{ value }}
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cumque ipsum iusto voluptatum? Consectetur cumque cupiditate debitis dicta dolore enim exercitationem facilis fuga impedit, laboriosam laborum obcaecati odit praesentium reiciendis.</div><div>Ab commodi dolor, harum incidunt ipsa ipsam odio provident veniam? Eaque eum laudantium totam! A, aliquam aperiam, beatae, debitis delectus eaque fuga modi numquam perspiciatis possimus quo quos! Quasi, voluptate!</div><div>Ab aliquam autem corporis eligendi ex, harum incidunt libero maiores molestias necessitatibus neque perferendis possimus quae quasi repudiandae. Asperiores, deleniti dolores ipsam mollitia nulla omnis reprehenderit. Delectus dicta illo maiores?</div><div>At blanditiis delectus dolorem explicabo ipsum maiores officiis repellat. Alias aperiam architecto aut, consectetur deleniti earum ex exercitationem hic illum in labore laborum laudantium molestias quos recusandae tenetur voluptate! Distinctio.</div><div>A aliquam aliquid animi aspernatur aut autem dolores doloribus exercitationem explicabo facilis hic laboriosam laborum maiores minima necessitatibus nemo non omnis praesentium, rem suscipit temporibus voluptatem voluptates. Nesciunt, provident, vero?</div>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
    },
});

export const Required = () => ({
    components: { FDropdownListbox, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <FDropdownListbox
                    required
                    validate-on-change
                    @validation-state="_state => submitDisabled = _state.invalid "
                    ref="dropdownlistbox"
                    :focus-item-on-focus="true"
                    :data="data"
                />
                <br /><br />
                <FButton type="submit" size="small" :disabled="submitDisabled">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    data() {
        return {
            data: [{ label: '---', value: '' }, ...clone(data)],
            submitDisabled: false,
        };
    },
    methods: {
        onSubmit(_event) {
            this.$refs.dropdownlistbox.validate();

            _event.preventDefault();
        },
    },
});

export const Validation = () => ({
    components: { FDropdownListbox, FButton, FAriaAlert },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <FDropdownListbox
                    :validator="validator"
                    validate-on-change
                    @validation-state="_state => submitDisabled = _state.invalid "
                    ref="dropdownlistbox"
                    :focus-item-on-focus="true"
                    :data="data"
                />
                <br /><br />
                <FButton type="submit" size="small" :disabled="submitDisabled">Submit</FButton>
            </form>

            <FAriaAlert />
        </div>
    `,
    data() {
        return {
            data: [{ label: '---', value: '' }, ...clone(data)],
            submitDisabled: false,
        };
    },
    methods: {
        validator(_value) {
            if (!_value) {
                return 'Select an option';
            } else if (_value === '20') {
                return 'Select another option';
            }

            return '';
        },
        onSubmit(_event) {
            this.$refs.dropdownlistbox.validate();

            _event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FDropdownListbox, FButton },
    template: `
        <div>
            <FDropdownListbox v-model:value="value" :focus-item-on-focus="true" :data="data" />
            <FButton secondary size="small" @click.native="onButtonClick">Set value to '30'</FButton>
            <br />
            Selected: {{ value }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: '40',
        };
    },
    methods: {
        onButtonClick() {
            this.value = '30';
        },
    },
});

export const Slots = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data">
                <template #top>Top</template>
                <template #bottom>Bottom</template>
            </FDropdownListbox>
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

export const InfoText = () => ({
    components: { FDropdownListbox },
    template: `
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <FDropdownListbox :data="data" info-text="Info text" label="Label" />
        </div>
    `,
    data() {
        return {
            data: [...data],
        };
    },
});

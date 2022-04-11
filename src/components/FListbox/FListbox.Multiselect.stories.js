import FListbox from './FListbox.vue';
import FButton from '../FButton/FButton.vue';
import { clone } from '../../utils';

const data = [
    { label: 'item 1', value: '10' },
    { label: 'item 2', id: 'myid', value: '20' },
    { label: 'item 3', value: '30' },
    { label: 'item 4', value: '40' },
    { label: 'item 5', value: '50' },
    { label: 'item 6', value: '60' },
];

const data2 = [];

for (let i = 1; i < 200; i++) {
    data2.push({
        label: `item ${i}`,
        value: `${i * 10}`,
    });
}

const data3 = [
    { value: 1, label: 'Armstrong' },
    { value: 2, label: 'Laurene' },
    { value: 3, label: 'Shelley' },
    { value: 4, label: 'Sukey' },
    { value: 5, label: 'Scarlett' },
    { value: 6, label: 'Phyllida' },
    { value: 7, label: 'Adara' },
    { value: 8, label: 'Brandon' },
    { value: 9, label: 'Hedwiga' },
    { value: 10, label: 'Misha' },
    { value: 11, label: 'Maurita' },
    { value: 12, label: 'Jamill' },
    { value: 13, label: 'Humfrid' },
    { value: 14, label: 'Cleo' },
    { value: 15, label: 'Beverly' },
    { value: 16, label: 'Concordia' },
    { value: 17, label: 'Brandi' },
    { value: 18, label: 'Sebastien' },
    { value: 19, label: 'Rosabelle' },
    { value: 20, label: 'Rycca' },
    { value: 21, label: 'Bevvy' },
    { value: 22, label: 'Dorena' },
    { value: 23, label: 'Goran' },
    { value: 24, label: 'Fiann' },
    { value: 25, label: 'Eva' },
    { value: 26, label: 'Dionis' },
    { value: 27, label: 'Terrence' },
    { value: 28, label: 'Amalia' },
    { value: 29, label: 'Ford' },
    { value: 30, label: 'Tommy' },
];

function fetchPagedListboxData(_timeout = 1000, _pagination) {
    return new Promise((_resolve) =>
        setTimeout(() => {
            let ldata = clone(data3);
            const filterText = _pagination.filterText.trim().toLowerCase();

            ldata = ldata.filter((_item) => _item.label.toLowerCase().indexOf(filterText) > -1);

            _resolve({
                totalItems: ldata.length,
                items: ldata.slice(
                    (_pagination.currPage - 1) * _pagination.perPage,
                    _pagination.currPage * _pagination.perPage
                ),
            });
        }, _timeout)
    );
}

export default {
    title: 'FListbox/Multiselect',
    // component: FListbox,
};

export const Value = () => ({
    components: { FListbox },
    //language=HTML
    template: `
        <div>
            <span id="fllbl22" class="not-visible">Listbox example</span>
            <FListbox multiselect :value="['30', '50']" :data="data" labeled-by="fllbl22" @component-change="onListboxItemsSelected" />
            <br />
            Selected: {{ selectedItems }}
        </div>
    `,
    data() {
        return {
            data: [...data],
            selectedItems: [],
        };
    },
    methods: {
        onListboxItemsSelected(_items) {
            console.log(_items);
            this.selectedItems = _items;
        },
    },
});

export const Model = () => ({
    components: { FListbox, FButton },
    //language=HTML
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <FListbox v-model:value="value" multiselect :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" />
            <br />
            Selected: {{ value }}
            <FButton secondary size="small" @click.native="onButtonClick">Set value to ['30', '50']</FButton>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: [],
        };
    },
    methods: {
        onButtonClick() {
            this.value = ['30', '50'];
        },
    },
});

export const PrependSelectedItems = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <FListbox v-model:value="value" prepend-selected-items multiselect :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" />
            <br />
            Selected: {{ value }}
            <FButton secondary size="small" @click.native="onButtonClick">Set value to ['30', '50']</FButton>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: [],
        };
    },
    methods: {
        onButtonClick() {
            this.value = ['30', '50'];
        },
    },
});

export const RemovableItems = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <FListbox v-model:value="value" removable-items multiselect :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" />
            <br />
            Selected: {{ value }}
            <FButton secondary size="small" @click.native="onButtonClick">Set value to ['30', '50']</FButton>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: [],
        };
    },
    methods: {
        onButtonClick() {
            this.value = ['30', '50'];
        },
    },
});

export const NonSelectable = () => ({
    components: { FListbox, FButton },
    template: `
        <div>
            <span id="fllbl5" class="not-visible">Listbox example</span>
            <FListbox v-model:value="value" non-selectable multiselect :focus-item-on-focus="true" :data="data" labeled-by="fllbl5" />
            <br />
            Selected: {{ value }}
            <FButton secondary size="small" @click.native="onButtonClick">Set value to ['30', '50']</FButton>
        </div>
    `,
    data() {
        return {
            data: [...data],
            value: [],
        };
    },
    methods: {
        onButtonClick() {
            this.value = ['30', '50'];
        },
    },
});

export const SearchableRemoteData = () => ({
    components: { FListbox },
    template: `
        <div>
            <span id="fllbl234" class="not-visible">Listbox example</span>
            <FListbox
                ref="listbox"
                searchable
                multiselect
                prepend-selected-items
                strategy="remote"
                v-model:value="value"
                :per-page="5"
                :data="data"
                :transform-data-func="onTransformData"
                :throttle-input-interval="300"
                :circular-navigation="true"
                field-size="large"
                labeled-by="fllbl234"
                style="max-height: 300px; overflow: auto;"
                @page-change="onPageChange"
            >
                <template v-slot="{ item }">
                    <i class="co-grey-4">{{ item.value }}</i> &nbsp; {{ item.label }}
                </template>
            </FListbox>
            <br />
            Selected: {{ value }}
        </div>
    `,
    data() {
        return {
            data: [],
            value: [],
        };
    },
    mounted() {
        this.addHiddenItems();
        this.$nextTick(() => {
            this.value = [1111, 2222];
        });
    },
    methods: {
        addHiddenItems() {
            this.$refs.listbox.concatItems([
                { label: 'Selected - not in data 1', value: 1111 },
                { label: 'Selected - not in data 2', value: 2222 },
            ]);
        },

        onPageChange(event) {
            this.data = fetchPagedListboxData(1000, event);
        },

        onTransformData(data) {
            return {
                totalItems: parseInt(data.totalItems),
                data: data.items,
            };
        },
    },
});

import FToolbar from './FToolbar.vue';
import { FComboBox, FButton } from '../index.js';
import { markRaw } from 'vue';

export default {
    title: 'FToolbar',
    component: FToolbar,
};

export const Default = () => ({
    components: { FToolbar, FComboBox },
    template: `
        <div>
            <FToolbar :items="items" />
        </div>
    `,
    data() {
        return {
            items: [
                { name: 'bold', label: 'Bold', props: { toggle: true } },
                { name: 'italic', label: 'Italic' },
                { name: 'underline', label: 'Underline', props: { disabled: true } },
                { type: 'separator' },
                { name: 'left', label: 'Left' },
                { type: 'separator' },
                {
                    name: 'combobox',
                    type: markRaw(FComboBox),
                    props: {
                        selectMode: true,
                        data: [
                            { label: 'Option 1', value: 'opt1' },
                            { label: 'Option 2', value: 'opt2' },
                        ],
                    },
                },
            ],
        };
    },
});

export const OnToolbarAction = () => ({
    components: { FToolbar, FComboBox },
    template: `
        <div>
        <FToolbar :items="items" @toolbar-action="onToolbarAction" />
        <br />
        <p>
            toolbar action: <code>{{ toolbarAction }}</code>
        </p>
        </div>
    `,
    data() {
        return {
            items: [
                { name: 'bold', label: 'Bold', props: { toggle: true } },
                { name: 'italic', label: 'Italic' },
                {
                    name: 'combobox',
                    type: markRaw(FComboBox),
                    props: {
                        selectMode: true,
                        data: [
                            { label: 'Option 1', value: 'opt1' },
                            { label: 'Option 2', value: 'opt2' },
                        ],
                    },
                },
            ],
            toolbarAction: '',
        };
    },
    methods: {
        onToolbarAction(action) {
            this.toolbarAction = action;
        },
    },
});

export const UpdateValue = () => ({
    components: { FToolbar, FComboBox, FButton },
    template: `
        <div>
            <FToolbar ref="toolbar" :items="items" @toolbar-action="onToolbarAction" />
            <br />
            <p>
               <FButton label="set 'bold' to true" secondary @click="setValueByName('bold', true)" />
                <FButton label="set 'combobox' to 'Option 2'" secondary @click="setValueByName('combobox', 'opt2')" />
            </p>
            <p>
                toolbar action: <code>{{ toolbarAction }}</code>
            </p>
        </div>
    `,
    data() {
        return {
            items: [
                { name: 'bold', label: 'Bold', props: { toggle: true } },
                { name: 'italic', label: 'Italic' },
                {
                    name: 'combobox',
                    type: markRaw(FComboBox),
                    props: {
                        selectMode: true,
                        data: [
                            { label: 'Option 1', value: 'opt1' },
                            { label: 'Option 2', value: 'opt2' },
                        ],
                    },
                },
            ],
            toolbarAction: '',
        };
    },
    methods: {
        setValueByName(name, value) {
            this.$refs.toolbar.setValueByName(name, value);
        },
        onToolbarAction(action) {
            this.toolbarAction = action;
        },
    },
});

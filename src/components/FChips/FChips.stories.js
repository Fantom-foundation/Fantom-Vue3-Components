import FChips from './FChips.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FChips',
    component: FChips,
};

export const Default = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <FChips />
        </div>
    `,
});

export const Data = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <FChips :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

export const Removable = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <FChips removable :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

export const Size = () => ({
    components: { FChips },
    //language=HTML
    template: `
        <div>
            <h3>Large</h3>
            <FChips size="large" removable :data="data" />
            <h3>Default</h3>
            <FChips removable :data="data" />
            <h3>Small</h3>
            <FChips size="small" removable :data="data" />
            <h3>Mini</h3>
            <FChips size="mini" removable :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

export const Model = () => ({
    components: { FChips, FButton },
    //language=HTML
    template: `
        <div>
            <FChips v-model:data="data" removable />
            <br />
            data: {{ data }} <br />
            <FButton secondary size="small" @click.native="data = [{ label: 'NEW CHIP'}]">Set data</FButton>
        </div>
    `,
    data() {
        return {
            data: [{ label: 'chip 1' }, { label: 'chip 2' }, { label: 'chip 3' }],
        };
    },
});

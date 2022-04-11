import FToggleButton from './FToggleButton.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FToggleButton',
    component: FToggleButton,
};

export const Default = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <FToggleButton option-size="large" label="Large" name="tgl1_lg" />
            <FToggleButton label="default" name="tgl1" />
            <FToggleButton option-size="small" label="Small" name="tgl1_sm" />
            <FToggleButton option-size="mini" label="Mini" name="tgl1_xs" />
        </div>
    `,
});

export const Checked = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <FToggleButton checked option-size="large" label="Large" name="tgl1_lg" />
            <FToggleButton checked label="default" name="tgl1" />
            <FToggleButton checked option-size="small" label="Small" name="tgl1_sm" />
            <FToggleButton checked option-size="mini" label="Mini" name="tgl1_xs" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <FToggleButton disabled option-size="large" label="Large" name="tgl1_lg" />
            <FToggleButton disabled label="default" name="tgl1" />
            <FToggleButton disabled option-size="small" label="Small" name="tgl1_sm" />
            <FToggleButton disabled option-size="mini" label="Mini" name="tgl1_xs" />
            <h3>Checked</h3>
            <FToggleButton disabled checked option-size="large" label="Large" name="tgl2_lg" />
            <FToggleButton disabled checked label="default" name="tgl2" />
            <FToggleButton disabled checked option-size="small" label="Small" name="tgl2_sm" />
            <FToggleButton disabled checked option-size="mini" label="Mini" name="tgl2_xs" />
        </div>
    `,
});

export const Colors = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <FToggleButton invalid label="Invalid" name="tgl" />
            <FToggleButton invalid checked label="Invalid" name="tgl" />
            <FToggleButton :style="blueStyle" label="Custom color 1" name="tgl" />
            <FToggleButton :style="blueStyle" checked label="Custom color 1" name="tgl" />
            <FToggleButton :style="lightStyle" label="Custom color 2" name="tgl" />
            <FToggleButton :style="lightStyle" checked label="Custom color 2" name="tgl" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--f-togglebtn-theme-color': '#08209e',
                '--f-togglebtn-theme-color-hsl': '230, 90%, 33%',
            },
            lightStyle: {
                '--f-togglebtn-theme-color': '#ffdda1',
                '--f-togglebtn-theme-color-hsl': '38, 100%, 82%',
                '--f-togglebtn-tgl-check-color': '#333',
            },
            purpleStyle: {
                '--f-togglebtn-theme-color': '#800E99',
                '--f-togglebtn-theme-color-hsl': '289, 83%, 33%',
            },
        };
    },
});

export const Model = () => ({
    components: { FToggleButton, FButton },
    template: `
        <div>
            <FToggleButton v-model="tglValue" name="tgl_m" aria-label="label" />
            <FButton secondary size="small" @click.native="tglValue = !tglValue">Toggle</FButton>
            <br />
            Value: {{ tglValue }}
            <h3>Multiselect</h3>
            <FToggleButton v-model="tglValue2" name="tgl_m2" value="10" aria-label="label" />
            <FToggleButton v-model="tglValue2" name="tgl_m2" value="20" aria-label="label" />
            <FToggleButton v-model="tglValue2" name="tgl_m2" value="30" aria-label="label" />
            <FButton secondary size="small" @click.native="tglValue2 = ['30']">Set value to 30</FButton>
            <br />
            Value: {{ tglValue2 }}
        </div>
    `,
    data() {
        return {
            tglValue: true,
            tglValue2: [],
            radioValue: '20',
        };
    },
});

export const Slots = () => ({
    components: { FToggleButton },
    template: `
        <div>
            <FToggleButton name="tgl1"><i>Checkbox</i> &#9733;</FToggleButton>
        </div>
    `,
});

import FDarkThemeSwitch from './FDarkThemeSwitch.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FDarkThemeSwitch',
    component: FDarkThemeSwitch,
};

export const Default = () => ({
    components: { FDarkThemeSwitch },
    template: `
        <div>
            <FDarkThemeSwitch aria-label="label" />
            <FDarkThemeSwitch label="label" />
        </div>
    `,
});

export const Size = () => ({
    components: { FDarkThemeSwitch },
    template: `
        <div>
            <FDarkThemeSwitch option-size="large" aria-label="label" />
            <FDarkThemeSwitch aria-label="label" />
            <FDarkThemeSwitch option-size="small" aria-label="label" />
            <FDarkThemeSwitch option-size="mini" aria-label="label" />
        </div>
    `,
});

export const Colors = () => ({
    components: { FDarkThemeSwitch },
    template: `
        <div>
            <FDarkThemeSwitch :style="blueStyle" aria-label="label" />
            <FDarkThemeSwitch :style="purpleStyle" aria-label="label" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--fdarkthemeswitch-color': '#08209e',
                '--fdarkthemeswitch-color-hsl': '230, 90%, 33%',
            },
            purpleStyle: {
                '--fdarkthemeswitch-color': '#800E99',
                '--fdarkthemeswitch-color-hsl': '289, 83%, 33%',
            },
        };
    },
});

export const Model = () => ({
    components: { FDarkThemeSwitch, FButton },
    template: `
        <div>
            <FDarkThemeSwitch v-model="tglValue" name="tgl_m" aria-label="label" />
            <FButton secondary size="small" @click.native="tglValue = !tglValue">Toggle</FButton>
            <br />
            Value: {{ tglValue }}
        </div>
    `,
    data() {
        return {
            tglValue: true,
        };
    },
});

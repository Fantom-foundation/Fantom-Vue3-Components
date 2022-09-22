import FStyledNumber from './FStyledNumber.vue';

export default {
    title: 'FStyledNumber',
    component: FStyledNumber,
};

export const Default = () => ({
    components: { FStyledNumber },
    template: `
        <div>
            <FStyledNumber :value="0.123" />
        </div>
    `,
});

export const Styling = () => ({
    components: { FStyledNumber },
    template: `
        <div>
            <FStyledNumber :value="0.123" :style="style1" /><br /><br />
            <FStyledNumber value="123 456,789" :style="style2" /><br /><br />
        </div>
    `,
    data() {
        return {
            style1: {
                '--fstylednumber-font-size': '2em',
                '--fstylednumber-int-font-size': '0.75em',
                '--fstylednumber-int-opacity': '0.6',
            },
            style2: {
                '--fstylednumber-int-font-weight': 'bold',
                '--fstylednumber-int-color': 'red',
                '--fstylednumber-dlm-opacity': '0.4',
                '--fstylednumber-frac-font-size': '0.9em',
                '--fstylednumber-frac-opacity': '0.4',
            },
        };
    },
});

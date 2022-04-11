import FFilters from './FFilters.vue';
import FFormInput from '../FFormInput/FFormInput.vue';

export default {
    title: 'FFilters',
    component: FFilters,
};

export const Default = () => ({
    components: { FFilters, FFormInput },
    template: `
        <div>
            <FFilters @submit="data = { ...$event, event: undefined, form: undefined }">
                <FFormInput type="text" :throttle-input-interval="150" placeholder="Search..." name="search" />
                <FFormInput type="combobox" select-mode label="combobox" name="combobox" :data="[
                    { label: '---', value: '' },
                    { label: 'Option 1', value: '10' },
                    { label: 'Option 2', value: '20' },
                    { label: 'Option 3', value: '30' },
                ]" />
            </FFilters>
            <pre class="fos-4 pat-5">{{ data }}</pre>
        </div>
    `,
    data() {
        return {
            data: {},
        };
    },
});

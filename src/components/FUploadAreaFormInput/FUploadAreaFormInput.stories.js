import { FForm, FFormInput, FButton, FUploadAreaFormInput } from '../index.js';
import { markRaw } from 'vue';

export default {
    title: 'FUploadAreaFormInput',
    component: FUploadAreaFormInput,
};

export const Default = () => ({
    components: { FUploadAreaFormInput },
    template: `
        <div>
            <FUploadAreaFormInput />
        </div>
    `,
});

export const InfoText = () => ({
    components: { FUploadAreaFormInput },
    template: `
        <div>
            <FUploadAreaFormInput info-text="Info text" />
        </div>
    `,
});

export const Label = () => ({
    components: { FUploadAreaFormInput },
    template: `
        <div>
            <FUploadAreaFormInput label="Label" :no-label="false" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FUploadAreaFormInput },
    template: `
        <div>
            <FUploadAreaFormInput disabled>Disabled</FUploadAreaFormInput>
        </div>
    `,
});

export const Validation = () => ({
    components: { FUploadAreaFormInput, FForm, FFormInput, FButton },
    template: `
        <div>
            <FForm class="" @submit="onSubmit">
                <FFormInput
                    :type="FUploadAreaFormInput"
                    name="uploadarea"
                    required
                    info-text="Max file size is 200kB"
                    accept="image/*"
                    :max-file-size="200000"
                    label="Label"
                    :no-label="false"
                    @change="onChange"
                    style="max-width: 480px"
                >
                    <template #files>
                        <img :src="imagePreview" alt="preview" style="max-width: 100%">
                    </template>
                    <template #default>
                        Select an image
                    </template>
                </FFormInput>
                <div class="fform_buttons">
                    <FButton type="submit" label="Submit" size="large" />
                </div>
            </FForm>
            form values: {{ values }}
        </div>
    `,
    data() {
        return {
            imagePreview: '',
            values: {},
            FUploadAreaFormInput: markRaw(FUploadAreaFormInput),
        };
    },
    methods: {
        onChange(event) {
            this.imagePreview = URL.createObjectURL(event.files[0]);
        },
        onSubmit(event) {
            this.values = event.values;
        },
    },
});

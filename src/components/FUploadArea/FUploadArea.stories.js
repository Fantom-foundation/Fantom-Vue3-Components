import FUploadArea from './FUploadArea.vue';

export default {
    title: 'FUploadArea',
    component: FUploadArea,
};

export const Default = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea name="upl" />
        </div>
    `,
});

export const Multiple = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea multiple name="upl">
                Select multiple files
            </FUploadArea>
        </div>
    `,
});

export const Invalid = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea invalid name="upl">
                Invalid files
            </FUploadArea>
        </div>
    `,
});

export const OnChange = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea @change="event = $event" multiple name="upl">
                Change event
            </FUploadArea>

            event:
            <pre>{{ event }}</pre>
        </div>
    `,
    data() {
        return {
            event: '',
        };
    },
});

export const Accept = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea accept="image/*,.pdf,application/json" @invalid="errors = $event" @change="errors = []" multiple name="upl">
                accept: image/*,.pdf,application/json
            </FUploadArea>

            <div v-for="error in errors">{{ error }}</div>
        </div>
    `,
    data() {
        return {
            errors: [],
        };
    },
});

export const MaxFileSize = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea :max-file-size="200000" @invalid="errors = $event" @change="errors = []" multiple name="upl">
                maxFileSize: 200kB
            </FUploadArea>

            <div v-for="error in errors">{{ error }}</div>
        </div>
    `,
    data() {
        return {
            errors: [],
        };
    },
});

export const FilesValidator = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea
                :files-validator="filesSizeValidator"
                @invalid="errors = $event"
                @change="errors = []"
                multiple
                name="upl"
            >
                Size of selected files should not exceed 1MB
            </FUploadArea>

            <div v-for="error in errors">{{ error }}</div>
        </div>
    `,
    data() {
        return {
            errors: [],
        };
    },
    methods: {
        filesSizeValidator(files) {
            const errorMessages = [];
            const MAX_FILES_SIZE = 1000000;
            let size = 0;

            for (let i = 0, len = files.length; i < len; i++) {
                size += files[i].size;

                if (size > MAX_FILES_SIZE) {
                    errorMessages.push('Size of selected files exceeded 1MB');
                    break;
                }
            }

            return errorMessages;
        },
    },
});

export const FilesSlot = () => ({
    components: { FUploadArea },
    template: `
        <div>
            <FUploadArea accept="image/*" name="upl" @change="onChange" style="max-width: 480px">
                <template #files>
                    <img :src="imagePreview" alt="preview" style="max-width: 100%">
                </template>
                <template #default>
                    Drop images here or browse
                </template>
            </FUploadArea>
        </div>
    `,
    data() {
        return {
            imagePreview: '',
        };
    },
    methods: {
        onChange(event) {
            this.imagePreview = URL.createObjectURL(event.files[0]);
        },
    },
});

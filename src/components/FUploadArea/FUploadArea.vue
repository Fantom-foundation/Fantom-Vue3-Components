<script setup>
import { getUniqueId } from '../../utils/index.js';
import { ref } from 'vue';
import { fileTypeValidator, maxFileSizeValidator } from '../../utils/validators/validators.js';

const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: getUniqueId(),
    },
    accept: {
        type: String,
        default: '',
    },
    /** Max file size in bytes */
    maxFileSize: {
        type: Number,
        default: 0,
    },
    /** Function that accepts files as an argument and should return an array of errors or an empty array */
    filesValidator: {
        type: Function,
        default: null,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['change', 'invalid']);

const fileNames = ref([]);
const dragOver = ref(false);

/**
 * @param {FileList} files
 * @param {string} [accept]
 * @param {number} [maxFileSize]
 * @param {function|null} [filesValidator]
 * @return {boolean}
 */
function validateFiles({ files, accept = '', maxFileSize = 0, filesValidator = null }) {
    let errorMessages = [];
    let errorMessage = '';
    let file = null;

    for (let i = 0, len = files.length; i < len; i++) {
        file = files[i];

        if (accept) {
            errorMessage = fileTypeValidator(file.type, accept);

            if (errorMessage) {
                errorMessages.push(errorMessage);
            }
        }

        if (maxFileSize > 0) {
            errorMessage = maxFileSizeValidator(maxFileSize, files);

            if (errorMessage) {
                errorMessages.push(errorMessage);
            }
        }

        if (errorMessages.length > 0) {
            break;
        }
    }

    if (typeof filesValidator === 'function') {
        const errMessages = filesValidator(files);

        if (errMessages.length > 0) {
            errorMessages = [...errorMessages, ...errMessages];
        }
    }

    return errorMessages;
}

/**
 * @param {Event} event
 * @return {File[]}
 */
function getFiles(event) {
    return event?.files || event?.target?.files || [];
}

/**
 * @param {File[]} files
 * @return {*[]}
 */
function getFileNames(files) {
    const fileNames = [];

    for (let i = 0, len = files.length; i < len; i++) {
        fileNames.push(files[i].name);
    }

    return fileNames;
}

function onDragEnter() {
    dragOver.value = true;
}

function onDragLeave() {
    dragOver.value = false;
}

/**
 * @param {Event} event
 */
function onChange(event) {
    const files = getFiles(event);
    let errorMessages = [];

    if (files.length > 0) {
        errorMessages = validateFiles({
            files,
            accept: props.accept,
            maxFileSize: props.maxFileSize,
            filesValidator: props.filesValidator,
        });
    }

    fileNames.value = [];

    if (errorMessages.length === 0) {
        fileNames.value = getFileNames(files);
        emit('change', { files, event });
    } else {
        emit('invalid', errorMessages);
    }
}
</script>

<template>
    <div class="fuploadarea" :class="{ 'fuploadarea-dragover': dragOver }">
        <input
            type="file"
            :name="name"
            :accept="accept"
            :multiple="multiple"
            @change.stop.prevent="onChange"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @drop="onDragLeave"
            :id="id"
        />
        <label :for="id" class="fuploadarea_text">
            <template v-if="fileNames.length > 0">
                <slot name="files">
                    <span
                        v-for="(fileName, index) in fileNames"
                        :key="`${id}_fn_${index}`"
                        class="fuploadarea_filename"
                    >
                        {{ fileName }}
                    </span>
                </slot>
            </template>
            <span v-else class="fuploadarea_defaulttext">
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<style lang="scss">
.fuploadarea {
    --fuploadarea-border: 2px dashed var(--f-inputs-border-color);
    --fuploadarea-defaulttext-color: var(--f-color-grey-5, #666);

    position: relative;
    width: 100%;
    border: var(--fuploadarea-border);
    border-radius: var(--f-border-radius-3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
        border-color: var(--f-color-grey-4);
    }

    &:focus-within,
    &-dragover {
        border-color: var(--f-color-primary-5);
    }

    input[type='file'] {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;
        top: 0;
        right: 0;
        opacity: 0;
    }

    &_text {
        padding: var(--f-spacer-4);
        word-break: break-word;
    }

    &_filename {
        display: block;
    }

    &_defaulttext {
        color: var(--fuploadarea-defaulttext-color);
    }
}
</style>

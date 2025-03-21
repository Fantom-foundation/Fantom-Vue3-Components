<script setup>
import { FUploadArea, FErrorMessages, FInfoText } from '../index.js';
import { formInputProps, useFormInput } from '../../composables/useFormInput/useFormInput.js';
import { computed, ref, watch } from 'vue';
import FLabel from '../FLabel/FLabel.vue';
import { getUniqueId } from '../../utils/index';

const emit = defineEmits(['validation-state', 'update:value']);

const props = defineProps({
    ...formInputProps(),
    id: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    noLabel: {
        type: Boolean,
        default: true,
    },
});

const {
    inputValue,
    validationState,
    infoTextId,
    errorMsgId,
    dInputContId,
    slotProps,
    setValidationState,
    changeValidationState,
    validate,
} = useFormInput(props, emit);
const isInvalid = ref(false);
const labeledById = computed(() => props.id || getUniqueId());

inputValue.value = [];

async function setValidationStt(errorMessages = [], invalid = false) {
    const validationSte = {};

    setValidationState({ validationState: validationSte, errorMessages: errorMessages, invalid });
    await changeValidationState(validationSte);
}

function onChange(event) {
    inputValue.value = event?.files || [];
    emit('update:value', inputValue.value);
    setValidationStt();
}

function onInvalid(errorMessages) {
    inputValue.value = [];
    emit('update:value', inputValue.value);
    setValidationStt(errorMessages, true);
}

watch(validationState, (state) => {
    isInvalid.value = state.errors.length > 0;
});

defineExpose({ validate });
</script>

<template>
    <slot name="top" v-bind="slotProps">
        <FLabel v-if="!noLabel" native :id="labeledById" :required="required">
            <slot name="label">{{ label }}</slot>
        </FLabel>
    </slot>
    <FUploadArea
        v-bind="$attrs"
        :files-validator="validator"
        :invalid="isInvalid"
        :id="labeledById"
        :no-label="!noLabel"
        @change="onChange"
        @invalid="onInvalid"
        class="fuploadareaforminput"
    >
        <!-- copy slots -->
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"> </slot>
        </template>
    </FUploadArea>
    <slot name="bottom" v-bind="slotProps">
        <div v-if="validationState.errors.length > 0">
            <FErrorMessages
                :errors-cont-id="errorMsgId"
                :errors="validationState.errors"
                :input-cont-id="dInputContId"
            />
        </div>
        <div v-else-if="infoText">
            <FInfoText :text="infoText" :info-text-id="infoTextId" />
        </div>
    </slot>
</template>

<style lang="scss">
.fuploadareaforminput {
}
</style>

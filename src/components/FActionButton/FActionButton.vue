<script setup>
import FButton from '../FButton/FButton.vue';
import { computed, ref } from 'vue';

const props = defineProps({
    value: {
        type: [String, Number, Boolean, Object],
        default: null,
    },
    name: {
        type: String,
        default: '',
    },
    toggle: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:value']);
const toggleState = ref(props.toggle ? props.value || false : null);
const cValue = computed(() => (props.value !== null ? props.value : props.name));

function onButtonClick() {
    if (props.toggle) {
        toggleState.value = !toggleState.value;
    }

    emit('update:value', props.toggle ? toggleState.value : cValue.value);
}
</script>

<template>
    <FButton
        class="factionbutton"
        :hovered="!!toggleState"
        :aria-pressed="toggleState"
        :name="name"
        :value="cValue"
        @click="onButtonClick"
    >
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>
    </FButton>
</template>

<style lang="scss">
.factionbutton {
}
</style>

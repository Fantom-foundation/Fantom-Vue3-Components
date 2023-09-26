<script setup>
import FButton from '../FButton/FButton.vue';
import { ref } from 'vue';

const props = defineProps({
    value: {
        type: [String, Number, Boolean, Object],
        default: null,
    },
    toggle: {
        type: Boolean,
        default: false,
    },
    toggled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:value']);
const toggleState = ref(props.toggle ? props.toggled : null);

function onButtonClick() {
    if (props.toggle) {
        toggleState.value = !toggleState.value;
    }

    emit('update:value', props.value, props.toggle ? toggleState.value : undefined);
}
</script>

<template>
    <FButton
        class="factionbutton"
        :hovered="!!toggleState"
        :aria-pressed="toggleState"
        secondary
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

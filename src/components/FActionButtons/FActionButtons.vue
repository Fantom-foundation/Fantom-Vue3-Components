<script setup>
import { computed } from 'vue';
import { FButton } from '../index.js';
import { getUniqueId } from '../../utils/index.js';

// props
const props = defineProps({
    buttons: {
        type: Array,
        default() {
            return [];
        },
        required: true,
    },
});

const emit = defineEmits(['button-action']);

const cButtons = computed(() =>
    props.buttons.map((button) => {
        return { _id: getUniqueId(), ...button };
    })
);

function onButtonClick(action) {
    emit('button-action', action);
}
</script>

<template>
    <div class="factionbuttons">
        <FButton
            v-for="button in cButtons"
            :key="button._id"
            v-bind="{ ...button, _id: null, action: null }"
            @click="onButtonClick(button.action)"
            :data-testid="`action_button_${button.action}`"
        />
    </div>
</template>

<style lang="scss">
.factionbuttons {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    value: {
        type: [String, Number],
        default: '',
        required: true,
    },
});

const cNumber = computed(() => {
    return getNumberParts(props.value);
});

function getSplittedNumber(number, delimiter) {
    return number.toString().split(delimiter);
}

function getNumberParts(number) {
    const parts = {};
    let delimiter = '.';
    let split = getSplittedNumber(number, delimiter);

    if (split.length === 1) {
        delimiter = ',';
        split = getSplittedNumber(number, delimiter);
    }

    if (split.length > 0) {
        parts.integer = split[0];

        if (split.length === 2) {
            parts.integer = split[0];
            parts.delimiter = delimiter;
            parts.fraction = split[1];
        }
    }

    return parts;
}
</script>

<template>
    <span class="fstylednumber">
        <span v-if="cNumber.integer !== undefined" class="fstylednumber_int" data-testid="int">
            {{ cNumber.integer }}
        </span>
        <span v-if="cNumber.delimiter !== undefined" data-testid="dlm" class="fstylednumber_dlm">
            {{ cNumber.delimiter }}
        </span>
        <span v-if="cNumber.fraction !== undefined" data-testid="frac" class="fstylednumber_frac">
            {{ cNumber.fraction }}
        </span>
    </span>
</template>

<style lang="scss">
.fstylednumber {
    --fstylednumber-font-size: initial;
    --fstylednumber-color: initial;
    --fstylednumber-font-weight: initial;
    --fstylednumber-opacity: initial;

    // integer part
    --fstylednumber-int-font-size: initial;
    --fstylednumber-int-color: initial;
    --fstylednumber-int-font-weight: initial;
    --fstylednumber-int-opacity: initial;

    // delimiter
    --fstylednumber-dlm-font-size: initial;
    --fstylednumber-dlm-color: initial;
    --fstylednumber-dlm-font-weight: initial;
    --fstylednumber-dlm-opacity: initial;

    // fraction part
    --fstylednumber-frac-font-size: initial;
    --fstylednumber-frac-color: initial;
    --fstylednumber-frac-font-weight: initial;
    --fstylednumber-frac-opacity: initial;

    font-size: var(--fstylednumber-font-size);
    color: var(--fstylednumber-color);
    font-weight: var(--fstylednumber-font-weight);
    opacity: var(--fstylednumber-opacity);

    &_int {
        font-size: var(--fstylednumber-int-font-size);
        color: var(--fstylednumber-int-color);
        font-weight: var(--fstylednumber-int-font-weight);
        opacity: var(--fstylednumber-int-opacity);
    }

    &_dlm {
        font-size: var(--fstylednumber-dlm-font-size);
        color: var(--fstylednumber-dlm-color);
        font-weight: var(--fstylednumber-dlm-font-weight);
        opacity: var(--fstylednumber-dlm-opacity);
    }

    &_frac {
        font-size: var(--fstylednumber-frac-font-size);
        color: var(--fstylednumber-frac-color);
        font-weight: var(--fstylednumber-frac-font-weight);
        opacity: var(--fstylednumber-frac-opacity);
    }
}
</style>

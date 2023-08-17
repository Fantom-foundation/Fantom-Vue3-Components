<script setup>
/**
 * Component automatically resize font size of the content if content width is less than container width
 * Css property 'container' is used to achieve desired effect (property support https://caniuse.com/mdn-css_properties_container)
 */
import { getElemRect, setCustomProperty } from '../../utils/index.js';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { DebouncedObserver } from '../../utils/DebouncedObserver.js';

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    /** Debounce interval of component resize */
    resizeDebounceInterval: {
        type: Number,
        default: 25,
    },
    /** Debounce interval of content mutation in the default slot */
    mutationDebounceInterval: {
        type: Number,
        default: 0,
    },
});

let elRect = null;
let containerRect = null;
let resizeObserver = new DebouncedObserver(window.ResizeObserver);
let mutationObserver = new DebouncedObserver(window.MutationObserver);
let origFontSize = 16;
let fontSize = origFontSize;

const el = ref(null);
const container = ref(null);
const scaleFont = ref(false);
const classes = computed(() => ({
    'ffittexttorow-scalefont': scaleFont.value,
}));

function setContainerRect(rect) {
    containerRect = rect || getElemRect(container.value);
}

function getFontSize() {
    return parseInt(getComputedStyle(container.value).fontSize);
}

function setScaleFont() {
    if (fontSize >= origFontSize) {
        scaleFont.value = elRect.width <= containerRect.width;
    }

    return scaleFont.value;
}

function setFontSize() {
    setCustomProperty('--ffittexttorow-container-font-size', `${calcCQW(containerRect.width, fontSize)}cqw`, el.value);

    fontSize = getFontSize();
    if (fontSize > origFontSize) {
        fontSize = origFontSize;
    }
}
function onContainerResize(event, _elRect) {
    elRect = _elRect || event[0].contentRect;

    if (containerRect === null) {
        setContainerRect();
    }

    if (fontSize < origFontSize) {
        if (getFontSize() >= origFontSize) {
            setFontSize();
            setContainerRect();
        }
    }

    setScaleFont();
}

async function onMutation() {
    setScaleFont();
    setFontSize();
    setContainerRect();
}

function calcCQW(containerWidth, fontSize) {
    return (100 * parseInt(fontSize)) / containerWidth;
}

watch(
    scaleFont,
    (value) => {
        if (value) {
            setFontSize();
        }
    },
    { immediate: true }
);

onMounted(() => {
    origFontSize = getFontSize();
    fontSize = origFontSize;

    onContainerResize(null, getElemRect(el.value));

    resizeObserver.create({
        element: el.value,
        callback: onContainerResize,
        debounceInterval: props.resizeDebounceInterval,
        ignoreFirstCall: true,
    });
    mutationObserver.create({
        element: container.value,
        callback: onMutation,
        debounceInterval: props.mutationDebounceInterval,
        ignoreFirstCall: true,
        options: { childList: true, subtree: true, characterData: true },
    });
});

onBeforeUnmount(() => {
    resizeObserver.destroy();
    mutationObserver.destroy();
});
</script>

<template>
    <div ref="el" class="ffittexttorow" :class="classes">
        <div ref="container" class="ffittexttorow_container">
            <slot>{{ text }}</slot>
        </div>
    </div>
</template>

<style lang="scss">
.ffittexttorow {
    --ffittexttorow-container-font-size: 5cqw;

    //overflow: hidden;

    &-scalefont {
        container-type: inline-size;

        .ffittexttorow_container {
            font-size: var(--ffittexttorow-container-font-size);
        }
    }

    &_container {
        display: inline-block;
        white-space: nowrap;
    }
}
</style>

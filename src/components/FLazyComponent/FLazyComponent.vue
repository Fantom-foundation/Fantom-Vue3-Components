<script setup>
/**
 * Loads component if it is in the viewport
 */

import { ref } from 'vue';
import { AsyncComponents } from '../../utils/index.js';
import FIntersectionObserver from '../FIntersectionObserver/FIntersectionObserver.vue';

const props = defineProps({
    /** Key into AsyncComponents storage */
    componentKey: {
        type: String,
        default: '',
        required: true,
    },
});

const component = ref(null);

function getComponent() {
    const component = AsyncComponents.get(props.componentKey);

    if (!component) {
        throw new Error(`Component ${props.componentKey} is not registered as an async component`);
    }

    return component;
}

function onEntry(entry) {
    if (entry.isIntersecting) {
        component.value = getComponent();
    }
}
</script>

<template>
    <FIntersectionObserver once @entry="onEntry" class="flazycomponent">
        <Component :is="component" />
    </FIntersectionObserver>
</template>

<style lang="scss">
.flazycomponent {
}
</style>

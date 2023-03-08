<script>
export default {
    inheritAttrs: false,
};
</script>

<script setup>
import { computed, useAttrs } from 'vue';
import { fLinkPropDefaults as defaults } from './prop-defaults.js';
import FEllipsis from '../FEllipsis/FEllipsis.vue';

const props = defineProps({
    text: {
        type: String,
        default: defaults.text,
    },
    href: {
        type: String,
        default: defaults.href,
    },
    /** Keys are types (`type` prop), values are urls or functions */
    hrefs: {
        type: Object,
        default() {
            return defaults.hrefs;
        },
    },
    type: {
        type: String,
        default: defaults.type,
    },
    target: {
        type: String,
        default: defaults.target,
    },
    title: {
        type: String,
        default: defaults.title,
    },
    clas: {
        type: String,
        default: defaults.clas,
    },
    useEllipsis: {
        type: Boolean,
        default: defaults.useEllipsis,
    },
    dataTestid: {
        type: String,
        default: null,
    },
});

const attrs = useAttrs();

const cHref = computed(() => {
    let href = props.href;
    const hrefByType = props.hrefs[props.type];

    if (hrefByType) {
        if (typeof hrefByType === 'function') {
            href = hrefByType({ ...props, ...attrs });
        } else {
            href = hrefByType;
        }
    }

    return href;
});
</script>

<template>
    <a
        :href="cHref"
        class="flink"
        :data-type="type || null"
        :target="target || null"
        :title="title || null"
        :class="clas || null"
        :data-testid="dataTestid"
    >
        <slot v-bind="{ ...$props, ...$attrs }">
            <FEllipsis v-if="useEllipsis" :text="text" overflow="middle" />
            <template v-else>{{ text }}</template>
        </slot>
    </a>
</template>

<style lang="scss">
.flink {
}
</style>

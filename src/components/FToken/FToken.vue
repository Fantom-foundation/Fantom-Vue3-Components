<script setup>
import { computed } from 'vue';
import { FImage, FPlaceholder } from '../index.js';
import { useFormatters } from '../../composables/index.js';

const props = defineProps({
    /** @type {{ symbol?: string, logo?: string, logoURL?: string }} */
    token: {
        type: Object,
        default() {
            return {};
        },
    },
    symbol: {
        type: String,
        default: '',
    },
    logo: {
        type: String,
        default: '',
    },
    logoSize: {
        type: Number,
        default: 24,
    },
    value: {
        type: [Number, String],
        default: '',
    },
    noSymbol: {
        type: Boolean,
        default: false,
    },
    noLogo: {
        type: Boolean,
        default: false,
    },
    usePlaceholder: {
        type: Boolean,
        default: false,
    },
    maximumFractionDigits: {
        type: Number,
        default: -1,
    },
    /** FPlaceholder props */
    placeholder: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { formatters } = useFormatters();

const cSymbol = computed(() => (!props.noSymbol ? props.symbol || props.token.symbol : ''));
const cLogo = computed(() => (!props.noLogo ? props.logo || props.token.logo || props.token.logoURL : ''));
const cValue = computed(() =>
    props.value !== ''
        ? formatters.number(props.value, props.maximumFractionDigits > -1 ? props.maximumFractionDigits : undefined)
        : ''
);
const cTitle = computed(() => (props.value ? `${props.value} ${cSymbol.value}` : null));
</script>

<template>
    <span class="ftoken" :title="cTitle">
        <FImage
            v-if="!noLogo"
            :src="cLogo"
            :size="`${logoSize}px`"
            :alt="cSymbol"
            class="ftoken_logo"
            data-testid="logo"
        />
        <span>
            <FPlaceholder
                animation="fplaceholder-pulsebganim"
                :replacement-num-chars="8"
                v-bind="placeholder"
                :content-loaded="!usePlaceholder || cValue !== ''"
                data-testid="placeholder"
            >
                <span v-if="cValue" class="ftoken_value">
                    <slot name="value" :value="cValue">{{ cValue }}</slot>
                </span>
                <span v-if="cSymbol" class="ftoken_symbol">
                    <slot name="symbol" :symbol="cSymbol">{{ cSymbol }}</slot>
                </span>
            </FPlaceholder>
        </span>
    </span>
</template>

<style lang="scss">
.ftoken {
    --ftoken-symbol-size: 0.75em;
    --ftoken-logo-gap: var(--f-spacer-3, 12px);
    --ftoken-value-gap: var(--f-spacer-2, 6px);

    display: inline-flex;
    align-items: center;

    &_logo {
        margin-inline-end: var(--ftoken-logo-gap);
    }

    &_value {
        margin-inline-end: var(--ftoken-value-gap);
    }

    &_symbol {
        font-size: var(--ftoken-symbol-size);
    }

    &-novalue {
        --ftoken-symbol-size: 1em;
    }
}
</style>

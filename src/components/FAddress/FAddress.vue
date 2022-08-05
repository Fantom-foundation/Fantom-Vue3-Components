<script setup>
import { FEllipsis, FImage } from '../index.js';
import { getJazzicon } from '../../plugins/index.js';
import { onMounted, ref } from 'vue';

const props = defineProps({
    address: {
        type: String,
        default: '',
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    useJazzicon: {
        type: Boolean,
        default: false,
    },
    imageSize: {
        type: Number,
        default: 24,
    },
});

const el = ref(null);

onMounted(() => {
    if (el.value?.$el?.setProperty) {
        el.value?.$el?.style.setProperty('--faddress-image-size', `${props.imageSize}px`);
    }
});
</script>

<template>
    <FEllipsis ref="el" :text="address" overflow="middle" class="faddress">
        <template #prefix>
            <slot name="prefix"></slot>
            <FImage
                v-if="image"
                :src="image"
                fit="cover"
                :size="`${imageSize}px`"
                class="faddress_image"
                :alt="address"
                aria-hidden="true"
            />
            <template v-else-if="useJazzicon">
                <div
                    v-html="getJazzicon(address, imageSize)"
                    class="faddress_image faddress_jazzicon"
                    aria-hidden="true"
                    data-testid="jazzicon"
                ></div>
            </template>
        </template>
        <template #suffix>
            <slot name="suffix"></slot>
        </template>
    </FEllipsis>
</template>

<style lang="scss">
.faddress {
    --faddress-image-size: 24px;
    --faddress-gap: var(--f-spacer-2, 6px);

    &_image {
        margin-inline-end: var(--faddress-gap);
    }

    &_jazzicon {
        & > div:first-child {
            border-radius: 50%;
            display: block !important;
        }
    }

    &_address {
        display: flex;
        flex-direction: column;
    }

    .fimage {
        border-radius: 50%;
        overflow: hidden;
        min-width: var(--faddress-image-size);
    }

    &.fellipsis {
        align-items: center;
        //gap: var(--faddress-gap);
    }

    .fellipsis_suffix {
        margin-inline-start: var(--faddress-gap);
    }
}
</style>

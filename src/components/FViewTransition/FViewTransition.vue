<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    forwardTransition: {
        type: String,
        default: '',
    },
    backwardTransition: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const transition = ref('');
let _transition = '';

/**
 * @param {string} [transitionName]
 */
function forward(transitionName = props.forwardTransition) {
    if (!props.disabled) {
        transition.value = transitionName;
    }
}

/**
 * @param {string} [transitionName]
 */
function backward(transitionName = props.backwardTransition) {
    if (!props.disabled) {
        transition.value = transitionName;
    }
}

function onDisabledPropChange(disabled) {
    if (disabled) {
        _transition = transition.value;
        transition.value = '';
    } else {
        transition.value = _transition;
    }
}

function onBeforeEnter() {
    if (!props.disabled) {
        document.body.classList.add('view-transition-on');
    }
}

function onAfterLeave() {
    if (!props.disabled) {
        document.body.classList.remove('view-transition-on');
    }
}

watch(() => props.disabled, onDisabledPropChange);

defineExpose({
    forward,
    backward,
});
</script>

<template>
    <div class="fviewtransition" :data-test-transition-name="transition">
        <Transition :name="transition" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
            <slot></slot>
        </Transition>
    </div>
</template>

<style lang="scss">
.fviewtransition-absolutechildren {
    position: relative;

    [class*='-enter-active'],
    [class*='-leave-active'] {
        position: absolute;
    }
}
</style>

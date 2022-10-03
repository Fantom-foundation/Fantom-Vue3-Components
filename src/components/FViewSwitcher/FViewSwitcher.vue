<script setup>
import { shallowRef, ref, onMounted } from 'vue';
import { useMethods } from '../../composables/index.js';
import { Tree } from '../../utils/index.js';
import { FViewTransition } from '../index.js';

const props = defineProps({
    type: {
        type: String,
        default: 'components',
        validator(value) {
            return ['components', 'routes'].indexOf(value) > -1;
        },
    },
    id: {
        type: String,
        default: '',
        required: true,
    },
    appStructure: {
        type: Array,
        default() {
            return [];
        },
    },
    components: {
        type: Object,
        default() {
            return {};
        },
    },
    defaultComponent: {
        type: String,
        default: '',
    },
    forwardTransition: {
        type: String,
        default: '',
    },
    backwardTransition: {
        type: String,
        default: '',
    },
    enableTransitions: {
        type: Boolean,
        default: false,
    },
});

const component = shallowRef(null);
const viewTransition = ref(null);
const appStructure = new Tree(props.appStructure);
let prevComponentName = '';

switchTo(getDefaultComponentName());

function switchTo(componentName) {
    runTransition(prevComponentName, componentName);

    component.value = getComponent(componentName);
    prevComponentName = componentName;

    return component.value;
}

function goBack(componentName) {
    const parentComponent = appStructure.getParent(componentName);

    if (parentComponent) {
        switchTo(parentComponent.id);
    }
}

function runTransition(comp1Name, comp2Name) {
    if (props.enableTransitions && props.appStructure.length > 0 && viewTransition.value) {
        const node1 = appStructure.getFullNode(comp1Name);
        const node2 = appStructure.getFullNode(comp2Name);
        let forward = false;

        if (node1.node && node2.node) {
            if (node1.level === node2.level) {
                forward = node1.index < node2.index;
            } else {
                forward = node1.level < node2.level;
            }

            if (forward) {
                viewTransition.value.forward();
            } else {
                viewTransition.value.backward();
            }
        }
    }
}

function getComponent(componentName = '') {
    const component = props.components[componentName] || null;

    if (component === null) {
        throw new Error(`Can't find component ${componentName}`);
    }

    return component;
}

function getDefaultComponentName() {
    return props.defaultComponent || Object.keys(props.components)[0] || '';
}

onMounted(() => {
    prevComponentName = getDefaultComponentName();
});

defineExpose({
    switchTo,
    goBack,
});

const { registerMethods } = useMethods(props.id, true);
registerMethods({
    switchTo,
    goBack,
});
</script>

<script>
export default {
    inheritAttrs: false,
};
</script>

<template>
    <div class="fviewswitcher">
        <FViewTransition
            v-if="enableTransitions"
            ref="viewTransition"
            :forward-transition="forwardTransition"
            :backward-transition="backwardTransition"
        >
            <template v-if="type === 'components'">
                <component :is="component" v-bind="$attrs"></component>
            </template>
        </FViewTransition>
        <template v-else>
            <template v-if="type === 'components'">
                <component :is="component" v-bind="$attrs"></component>
            </template>
        </template>
    </div>
</template>

<style lang="scss"></style>

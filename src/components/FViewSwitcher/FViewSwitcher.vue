<script setup>
import { shallowRef } from 'vue';
import { useMethods } from '../../composables/index.js';
import { Tree } from '../../utils/index.js';

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
});

const component = shallowRef(null);
const appStructure = new Tree(props.appStructure);

switchTo(getDefaultComponent());

function switchTo(componentName) {
    component.value = getComponent(componentName);

    return component.value;
}

function goBack(componentName) {
    const parentComponent = appStructure.getParent(componentName);

    if (parentComponent) {
        switchTo(parentComponent.id);
    }
}

function getComponent(componentName = '') {
    const component = props.components[componentName] || null;

    if (component === null) {
        throw new Error(`Can't find component ${componentName}`);
    }

    return component;
}

function getDefaultComponent() {
    return props.defaultComponent || Object.keys(props.components)[0] || '';
}

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
        <template v-if="type === 'components'">
            <component :is="component" v-bind="$attrs"></component>
        </template>
    </div>
</template>

<style lang="scss"></style>

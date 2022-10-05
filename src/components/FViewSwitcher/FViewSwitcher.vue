<script setup>
import { shallowRef, ref, onMounted, watch } from 'vue';
import { useMethods } from '../../composables/index.js';
import { getUniqueId, Tree } from '../../utils/index.js';
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
    /** Vue router */
    router: {
        type: Object,
        default: null,
    },
});

const component = shallowRef(null);
const viewTransition = ref(null);
const key = ref(getUniqueId());
const appStructure = new Tree(props.appStructure);
let prevAppStructureNodeId = '';

switchTo(getDefaultComponentName());

function switchTo(appStructureNodeId) {
    if (props.type === 'components') {
        runTransition(prevAppStructureNodeId, appStructureNodeId);

        component.value = getComponent(appStructureNodeId);
        prevAppStructureNodeId = appStructureNodeId;

        return component.value;
    } else if (props.router && appStructureNodeId) {
        // eslint-disable-next-line vue/no-mutating-props
        props.router.push({ name: appStructureNodeId });
    }
}

function goBack(appStructureNodeId, useSiblings) {
    let node = null;

    if (useSiblings) {
        const siblings = appStructure.getSiblings(appStructureNodeId);

        if (siblings.previousSibling) {
            node = siblings.previousSibling;
        }
    } else {
        node = appStructure.getParent(appStructureNodeId);
    }

    if (node) {
        switchTo(node.id);
    }
}

function reload() {
    key.value = getUniqueId();
}

function runTransition(prevAppStructureNodeId, appStructureNodeId) {
    if (props.enableTransitions && props.appStructure.length > 0 && viewTransition.value) {
        const node1 = appStructure.getFullNode(prevAppStructureNodeId);
        const node2 = appStructure.getFullNode(appStructureNodeId);
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

if (props.enableTransitions && props.router && props.type === 'routes' && props.appStructure.length > 0) {
    watch(
        () => props.router.currentRoute.value.name,
        (routeName, prevRouteName) => {
            runTransition(prevRouteName, routeName);
        }
    );
}

onMounted(() => {
    prevAppStructureNodeId = getDefaultComponentName();
});

defineExpose({
    switchTo,
    goBack,
    reload,
});

const { registerMethods } = useMethods(props.id, true);
registerMethods({
    switchTo,
    goBack,
    reload,
});
</script>

<script>
export default {
    inheritAttrs: false,
};
</script>

<template>
    <div class="fviewswitcher">
        <template v-if="enableTransitions">
            <template v-if="type === 'components'">
                <FViewTransition
                    ref="viewTransition"
                    :forward-transition="forwardTransition"
                    :backward-transition="backwardTransition"
                >
                    <Component :is="component" :key="key" v-bind="$attrs" />
                </FViewTransition>
            </template>
            <template v-else>
                <RouterView :key="key" v-slot="{ Component }">
                    <FViewTransition
                        ref="viewTransition"
                        :forward-transition="forwardTransition"
                        :backward-transition="backwardTransition"
                    >
                        <Component :is="Component" />
                    </FViewTransition>
                </RouterView>
            </template>
        </template>
        <template v-else>
            <template v-if="type === 'components'">
                <Component :is="component" :key="key" v-bind="$attrs" />
            </template>
            <template v-else>
                <RouterView :key="key" />
            </template>
        </template>
    </div>
</template>

<style lang="scss"></style>

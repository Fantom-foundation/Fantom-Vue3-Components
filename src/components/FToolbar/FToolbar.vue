<script setup>
import './FToolbar.types.js';
import {
    defer,
    findNextOrPrevElemByList,
    getAttr,
    getUniqueId,
    keyboardNavigationByList,
    setAttr,
} from '../../utils/index.js';
import { FActionButton } from '../index.js';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * @type {{items: FToolbarItem[]}}
 */
const props = defineProps({
    items: {
        type: Array,
        default() {
            return [];
        },
    },
    defaultBtnType: {
        type: String,
        default: 'tertiary',
    },
    defaultCompSize: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['toolbar-action']);

const el = ref(null);
const data = ref({});
const cItems = computed(() =>
    props.items.map((item, idx) => {
        setDataItem(item, idx);
        return { ...item, _id: getUniqueId() };
    })
);
let ignoreEmit = true;
let toolbarElements = null;

function setDataItem(item) {
    if (item.name) {
        data.value[item.name] = 'value' in item ? item.value : null;
    }
}

function setValueByName(name, value) {
    ignoreEmit = true;

    if (name in data.value) {
        data.value[name] = value;
    } else {
        console.warn(`Item with name '${name}' doesn't exists`);
    }

    defer(() => {
        ignoreEmit = false;
    });
}

function onUpdateValue(value, name) {
    if (!ignoreEmit) {
        data.value[name] = value;
        emit('toolbar-action', { value, name });
    }
}

function onToolbarKeydown(event) {
    if (toolbarElements) {
        keyboardNavigationByList({
            event,
            elemList: toolbarElements,
            skipElemsSelector: ':disabled, [aria-disabled="true"]',
            circular: true,
        });
    }
}

function setToolbarElements() {
    toolbarElements = el.value.querySelectorAll('button[name], input[name]');

    toolbarElements.forEach((elem) => {
        let tabindex = getAttr(elem, 'tabindex');

        if (!tabindex) {
            setAttr(elem, 'tabindex', '-1');
        }
    });

    const elem = findNextOrPrevElemByList({
        elemList: toolbarElements,
        skipElemsSelector: ':disabled, [aria-disabled="true"]',
        startIdx: 0,
        find: 'next',
    });

    if (elem) {
        setAttr(elem, 'tabindex', '0');
    }
}

onMounted(() => {
    setToolbarElements();

    defer(() => {
        ignoreEmit = false;
    });
});

onBeforeUnmount(() => {
    toolbarElements = null;
});

defineExpose({
    setValueByName,
});
</script>

<template>
    <div ref="el" class="ftoolbar" role="toolbar" @keydown="onToolbarKeydown">
        <template v-for="item in cItems" :key="item._id">
            <FActionButton
                v-if="!item.type || item.type === 'button'"
                :btn-type="defaultBtnType"
                :name="item.name"
                :value="data[item.name]"
                :label="item.label"
                v-bind="item.props || {}"
                @update:value="onUpdateValue($event, item.name)"
            />
            <div v-else-if="item.type === 'separator'" class="ftoolbar_separator"></div>
            <Component
                v-else
                :is="item.type"
                :name="item.name"
                :value="data[item.name]"
                :label="item.label"
                v-bind="item.props || {}"
                @update:value="onUpdateValue($event, item.name)"
                @update:modelValue="onUpdateValue($event, item.name)"
            />
        </template>
    </div>
</template>

<style lang="scss">
.ftoolbar {
    display: flex;
    align-items: center;
    gap: var(--f-spacer-1);

    .btn + .btn {
        margin-inline-start: 0;
    }

    &_separator {
        width: 1px;
        //height: 80%;
        height: 20px;
        background-color: var(--f-color-grey-3);
    }

    .finput_inputcont {
        border-color: transparent !important;
    }
}
</style>

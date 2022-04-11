<template>
    <FForm
        ref="form"
        class="ffilters fform-elemsautowidth"
        submit-on-change
        __submit-if-changed
        no-change-check
        v-bind="$attrs"
        @submit="onSubmit"
        v-slot="slotProps"
    >
        <slot v-bind="slotProps"></slot>
    </FForm>
</template>

<script>
import FForm from '../FForm/FForm.vue';
import { copyMethods } from '../../utils/vue-helpers.js';
import { getUniqueId } from '../../utils';

/**
 * FForm with inputs displayed side by side
 */
export default {
    name: 'FFilters',

    components: { FForm },

    inject: {
        filters: {
            default: {
                getState: false,
                getValues: '', // id of child
                getLastChangedElement: '', // id of child
            },
        },
    },

    emits: ['submit'],

    data() {
        return {
            id: getUniqueId(),
        };
    },

    watch: {
        ['filters.getState'](getState) {
            if (getState) {
                this.filters.states.push(this.state());
            }
        },

        ['filters.getValues'](id) {
            if (id === this.id) {
                this.filters.values = this.getValues();
            }
        },

        ['filters.getLastChangedElement'](id) {
            if (id === this.id) {
                this.filters.lastChangedElement = this.getLastChangedElement();
            }
        },
    },

    methods: {
        ...copyMethods(FForm, ['getLastChangedElement'], 'form'),

        getValues() {
            return this.$refs.form.getElements();
        },

        state() {
            return {
                id: this.id,
            };
        },

        onSubmit(event) {
            this.$emit('submit', event);
            this.filters.onSubmit = event;
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

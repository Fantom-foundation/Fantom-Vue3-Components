<template>
    <div class="fdatagridrowedit">
        <FDataGrid ref="grid" edit-mode="row-edit" :use-pagination="false" no-header v-bind="$attrs">
            <!-- copy slots -->
            <template v-for="(index, name) in $slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </FDataGrid>

        <div class="pat-4">
            <FButton v-if="showAddButton" secondary size="small" label="Add lines" @click="onAddLinesClick" />
            <FButton
                v-if="showClearButton"
                secondary
                size="small"
                label="Clear all lines"
                @click="onClearAllLinesClick"
            />
        </div>
    </div>
</template>

<script>
import FDataGrid from '../FDataGrid/FDataGrid.vue';
import FButton from '../FButton/FButton.vue';

/**
 * Extension of `FDataGrid` with row edit mode switched on
 */
export default {
    name: 'FDataGridRowEdit',

    components: { FButton, FDataGrid },

    inheritAttrs: false,

    model: {
        prop: 'items',
        event: 'data-change',
    },

    props: {
        showAddButton: {
            type: Boolean,
            default: true,
        },
        showClearButton: {
            type: Boolean,
            default: true,
        },
    },

    methods: {
        getGridRef() {
            return this.$refs.grid;
        },

        onAddLinesClick() {
            this.$refs.grid.addEmptyRow(4);
        },

        onClearAllLinesClick() {
            const { grid } = this.$refs;

            grid.dItems = [];
            grid.addEmptyRow(2);
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

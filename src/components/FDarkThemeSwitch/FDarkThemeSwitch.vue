<template>
    <span class="fdarkthemeswitch">
        <FToggleButton v-bind="$attrs" />
    </span>
</template>

<script>
import FToggleButton from '../FToggleButton/FToggleButton.vue';

/**
 * Toggle button with sun and moon icons
 */
export default {
    name: 'FDarkThemeSwitch',

    components: { FToggleButton },

    inheritAttrs: false,
};
</script>

<style lang="scss">
@use 'style';
</style>

<template>
    <Component :is="tag" class="fcard">
        <slot></slot>
    </Component>
</template>

<script>
export default {
    name: 'FCard',

    props: {
        /** Tag name of the root element */
        tag: {
            type: String,
            default: 'div',
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

<template>
    <span class="fsvgicon" :class="classes" :style="styles" :aria-hidden="ariaHidden">
        <span class="fsvgicon-icon" :style="iconStyles"><slot /></span>
    </span>
</template>

<script>
/**
 * Simple SVG wrapper
 */
export default {
    name: 'FSvgIcon',

    props: {
        /** Color of svg icon. By default color is inherited */
        color: {
            type: String,
            default: '',
        },
        /** Preserve original colors of svg */
        original: {
            type: Boolean,
            default: false,
        },
        /** Apply color to 'fill' and/or 'stroke' */
        applyColor: {
            type: String,
            default: 'fill',
        },
        /** Size of icon. Sets width and height by the same value */
        size: {
            type: [String, Number],
            default: '',
        },
        /** Width of icon */
        width: {
            type: [String, Number],
            default: '',
        },
        /** Height of icon */
        height: {
            type: [String, Number],
            default: '',
        },
        /** Rotate icon by `rotate` degrees. For example `'90deg'` */
        rotate: {
            type: String,
            default: '',
        },
        ariaHidden: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {};
    },

    computed: {
        classes() {
            return {
                'fsvgicon-original': this.original,
                'fsvgicon-fill': this.applyColor.indexOf('fill') > -1,
                'fsvgicon-stroke': this.applyColor.indexOf('stroke') > -1,
            };
        },

        styles() {
            const { size } = this;

            return {
                color: this.color,
                width: size || this.width,
                height: size || this.height,
            };
        },

        iconStyles() {
            return {
                transform: `rotate(${this.rotate})`,
            };
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

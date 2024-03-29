<template>
    <FInfo
        :hide-after="hideAfter"
        :button-title="cButtonTitle"
        class="fcopybutton"
        v-bind="$attrs"
        @click="onClick"
        @window-hide="$emit('window-hide', $event)"
        :data-testid="dataTestid"
    >
        <template #button-content>
            <FSvgIcon :size="iconSize"><IconCopy /></FSvgIcon>
        </template>
        <!-- copy slots -->
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>

        {{ cPopoverText }}
    </FInfo>
</template>

<script>
import FInfo from '../FInfo/FInfo.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconCopy from '../icons/IconCopy.vue';
import { translationsMixin } from '../../mixins/translations.js';

/**
 * Component for copying texts. It shows a popover after copying a text.
 * The given attributes are also passed to the child components `FButton` and `FPopover`
 */
export default {
    name: 'FCopyButton',

    components: { FInfo, IconCopy, FSvgIcon },

    mixins: [translationsMixin],

    emits: ['text-copied', 'window-hide'],

    inheritAttrs: false,

    props: {
        /** Text to copy */
        text: {
            type: String,
            default: '',
            required: true,
        },
        /** Popover's text */
        popoverText: {
            type: String,
            default: '',
        },
        /** Button's title */
        buttonTitle: {
            type: String,
            default: '',
        },
        /** Size of default icon */
        iconSize: {
            type: String,
            default: '16px',
        },
        /** Hide window after this amout of milliseconds. 0 means no auto hiding */
        hideAfter: {
            type: Number,
            default: 1600,
        },
        /**  */
        showPopover: {
            type: Boolean,
            default: true,
        },
        dataTestid: {
            type: String,
            default: null,
        },
    },

    computed: {
        cButtonTitle() {
            return this.buttonTitle || this.translate('fcopybutton.copyToClipboard');
        },

        cPopoverText() {
            return this.popoverText || this.translate('fcopybutton.copiedToClipboard');
        },
    },

    methods: {
        async onClick(event, payload) {
            payload.preventDefault = !this.showPopover;

            if (event.target?.closest('a')) {
                event.stopPropagation();
                event.preventDefault();
            }

            await navigator.clipboard.writeText(this.text);

            /**
             * Triggers when text is copied
             *
             * @property {string} text Copied text
             */
            this.$emit('text-copied', this.text);
        },
    },
};
</script>

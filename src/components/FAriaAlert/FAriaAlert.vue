<template>
    <div role="alert" aria-atomic="true" class="fariaalert">
        <p v-for="msg in cMessages" v-bind:key="msg.text">{{ msg.text }}</p>
    </div>
</template>

<script>
import { stripHTMLTags } from '../../utils/index.js';
import { callAndWait } from '../../utils/vue-helpers.js';
import { ref } from 'vue';

const ariaAlertState = ref({
    append: '',
    replace: '',
    clear: false,
});

/**
 * Notifies assistive technologies about important messages - input errors etc.
 * Listens to these events on event bus:
 * `'aria-alert-append'`, `'aria-alert-replace'` and `'aria-alert-clear'`
 * This component is intended to be placed at the root of Vue application.
 */
export default {
    data() {
        return {
            /** alert messages */
            messages: [],
        };
    },

    computed: {
        cMessages() {
            return this.messages;
        },

        cAppend() {
            return ariaAlertState.value.append;
        },

        cReplace() {
            return ariaAlertState.value.replace;
        },

        cClear() {
            return ariaAlertState.value.clear;
        },
    },

    watch: {
        cAppend(message) {
            if (message) {
                this.append(message);
            }
        },

        cReplace(message) {
            if (message) {
                this.replace(message);
            }
        },

        cClear(message) {
            if (message) {
                this.clear();
            }
        },
    },

    methods: {
        /**
         * Append new message.
         *
         * @param {string} _msg
         */
        append(_msg) {
            this.messages.push({ text: this.adjustMessage(_msg) });
        },

        /**
         * Replace all messages with new message.
         *
         * @param {string} _msg
         */
        replace(_msg) {
            this.messages = [{ text: this.adjustMessage(_msg) }];
        },

        /**
         * Clear all messages.
         */

        clear() {
            this.messages = [];
        },

        /**
         * Strip html tags and add '.' at the end of the string.
         *
         * @param {string} _msg
         * @return {string}
         */
        adjustMessage(_msg) {
            return stripHTMLTags(typeof _msg === 'string' ? _msg.trim() : '');
            // const msg = stripHTMLTags(typeof _msg === 'string' ? _msg.trim() : '');
            // return msg && msg.charAt(_msg.length - 1) !== '.' ? `${msg}.` : msg;
        },
    },

    async append(message) {
        await callAndWait(() => {
            ariaAlertState.value.append = message;
        });

        ariaAlertState.value.append = '';
    },

    async replace(message) {
        await callAndWait(() => {
            ariaAlertState.value.replace = message;
        });

        ariaAlertState.value.replace = '';
    },

    async clear() {
        await callAndWait(() => {
            ariaAlertState.value.clear = true;
        });

        ariaAlertState.value.clear = false;
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

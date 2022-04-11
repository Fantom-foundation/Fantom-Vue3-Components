<template>
    <div class="fnetworkstatus not-visible">
        <FPopover ref="popover" class="fnetworkstatus_window">
            {{ translate('fnetworkstatus.message') }}
        </FPopover>
    </div>
</template>

<script>
import { translationsMixin } from '../../mixins/translations.js';
import FPopover from '../FPopover/FPopover.vue';
import { ref } from 'vue';
import FAriaAlert from '../FAriaAlert/FAriaAlert.vue';

const networkStatusState = ref({
    offline: false,
});

/**
 * Shows popover window and adds css class `.offline` on the `<html>` element if `NetworkStatus.offline()` is called.
 */
export default {
    name: 'FNetworkStatus',

    mixins: [translationsMixin],

    components: { FPopover },

    computed: {
        isOffline() {
            return networkStatusState.value.offline;
        },
    },

    watch: {
        isOffline(value) {
            const eHtml = document.documentElement;
            const popover = this.$refs.popover;

            if (value) {
                popover.show();
                eHtml.classList.add('offline');
                FAriaAlert.replace(this.translate('fnetworkstatus.message'));
            } else {
                popover.hide();
                eHtml.classList.remove('offline');
                FAriaAlert.replace(this.translate('fnetworkstatus.online'));
            }
        },
    },

    offline() {
        networkStatusState.value.offline = true;
    },

    online() {
        networkStatusState.value.offline = false;
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

<template>
    <div :id="id" class="ftab" role="tabpanel" tabindex="0" :aria-labelledby="labelledBy" :hidden="!dActive">
        <slot></slot>
    </div>
</template>

<script>
import { getUniqueId } from '../../utils';

/**
 * Tab panel
 */
export default {
    name: 'FTab',

    inject: {
        tabs: {
            default: {
                activate: '',
                deactivate: false,
                getState: false,
                setData: {}, // keys are tab ids
            },
        },
    },

    props: {
        /** Tab panel id */
        id: {
            type: String,
            default() {
                return getUniqueId();
            },
        },
        /** Title of tab panel shown in tab list */
        title: {
            type: String,
            default: '',
        },
        /** Slot name in FTabs to be used as a title */
        titleSlot: {
            type: String,
            default: '',
        },
        /** Css class used on tab shown in tab list. */
        titleClass: {
            type: String,
            default: '',
        },
        /** Is tab panel active? */
        active: {
            type: Boolean,
            default: false,
        },
        /** Is tab panel disabled? */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /** Id of tab panel label (tab). This property is set by FTabs component */
            labelledBy: '',
            /** Is tab panel active? */
            dActive: this.active,
            /** Is tab panel active? */
            dDisabled: this.disabled,
        };
    },

    watch: {
        disabled(_value) {
            this.dDisabled = _value;
        },

        ['tabs.activate'](activate) {
            if (activate && this.id === activate) {
                this.dActive = true;
            }
        },

        ['tabs.deactivate'](deactivate) {
            if (deactivate) {
                this.dActive = false;
            }
        },

        ['tabs.getState'](getState) {
            if (getState) {
                this.tabs.states.push(this.state());
            }
        },

        ['tabs.setData'](data) {
            const { id } = this;
            if (id in data && data[id]?.labelledBy) {
                this.labelledBy = data[id].labelledBy;
            }
        },
    },

    methods: {
        state() {
            return {
                id: this.id,
                disabled: this.dDisabled,
                active: this.dActive,
                title: this.title,
                titleSlot: this.titleSlot,
                titleClass: this.titleClass,
            };
        },
    },
};
</script>

<template>
    <div
        :id="id"
        class="ftab"
        role="tabpanel"
        :data-url-hash="urlHash ? urlHash.replace(/^#/, '') : undefined"
        tabindex="0"
        :aria-labelledby="labelledBy"
        :hidden="!dActive || dHidden"
    >
        <div v-if="create">
            <slot></slot>
        </div>
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
        /**
         * 'render' - render content inside component, event if component is in 'closed' state (v-show)
         * 'create' - if initial state is 'closed', render content when component is opened for the first time (v-if, v-show)
         * 'create-destroy' - render content when component is opened, destroy content when component is closed (v-if)
         */
        strategy: {
            type: String,
            default: 'render',
            validator: function (_value) {
                return ['render', 'create', 'create-destroy'].indexOf(_value) !== -1;
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
        /** Is tab panel hidden? */
        hidden: {
            type: Boolean,
            default: false,
        },
        /** URL hash value associated with the tab */
        urlHash: {
            type: String,
            default: '',
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
            /** Is tab panel hidden? */
            dHidden: this.hidden,
            create: this.strategy === 'render',
        };
    },

    watch: {
        disabled(_value) {
            this.dDisabled = _value;
        },

        hidden(_value) {
            this.dHidden = _value;
        },

        ['tabs.activate'](activate) {
            const { strategy } = this;

            if (activate && this.id === activate) {
                this.dActive = true;

                if (strategy === 'create-destroy' || (strategy === 'create' && !this.create)) {
                    this.create = true;
                }
            }
        },

        ['tabs.deactivate'](deactivate) {
            if (deactivate) {
                this.dActive = false;

                if (this.strategy === 'create-destroy') {
                    this.create = false;
                }
            }
        },

        ['tabs.getState'](getState) {
            if (getState) {
                this.tabs.states.push(this.state());
            }
        },

        ['tabs.setData'](data) {
            const { id } = this;
            if (id in data) {
                if (data[id]?.labelledBy) {
                    this.labelledBy = data[id].labelledBy;
                }
                if (typeof data[id]?.hidden === 'boolean') {
                    this.dHidden = data[id].hidden;
                }
            }
        },
    },

    methods: {
        state() {
            return {
                id: this.id,
                disabled: this.dDisabled,
                hidden: this.dHidden,
                active: this.dActive,
                title: this.title,
                titleSlot: this.titleSlot,
                titleClass: this.titleClass,
                urlHash: this.urlHash,
            };
        },
    },
};
</script>

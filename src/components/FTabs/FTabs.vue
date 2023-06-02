<template>
    <div class="ftabs" :class="{ 'ftabs-nostyle': noStyle }">
        <ul role="tablist" @click="onTabListClick" @keydown="onTabListKeydown">
            <li
                v-for="(tabPanel, idx) in dTabPanels"
                :id="ids[idx]"
                :key="`${ids[idx]}`"
                :tabindex="tabPanel.active ? 0 : -1"
                :aria-controls="tabPanel.id"
                :aria-selected="tabPanel.active"
                :aria-disabled="tabPanel.disabled"
                role="tab"
                :data-index="idx"
                :class="tabPanel.titleClass"
            >
                <template v-if="tabPanel.titleSlot"><slot :name="tabPanel.titleSlot"></slot></template>
                <template v-else>{{ tabPanel.title }}</template>
            </li>
        </ul>
        <div class="ftabs_panels">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { clone, getUniqueId } from '../../utils';
import { keyboardNavigation } from '../../utils/aria.js';
import { actionHandler } from '../../utils/vue-helpers.js';

/**
 * Simple tabs following WAI-ARIA practices.
 */
export default {
    name: 'FTabs',

    emits: ['tab-set'],

    props: {
        /** No tablist style */
        noStyle: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /** Tab ids */
            ids: [],
            /** Array of FTab instances */
            dTabPanels: [],
            tabs: {
                activate: '',
                deactivate: false,
                getState: false,
                states: [],
                setData: {}, // keys are tab ids
            },
        };
    },

    provide() {
        return {
            tabs: this.tabs,
        };
    },

    mounted() {
        this.prepareTabs();
    },

    methods: {
        /**
         * @param action
         * @param {boolean|string|Object} value
         * @return {Promise<unknown>}
         */
        async tabAction(action = '', value = true) {
            return actionHandler(this.tabs, action, value);
        },

        async prepareTabs() {
            let tabPanels = [];
            const ids = [];
            const tabsData = {};
            let tabPanel;
            let activePanelExists = false;

            await this.tabAction('getState');
            tabPanels = clone(this.tabs.states);

            for (let i = 0, len1 = tabPanels.length, id = ''; i < len1; i++) {
                id = getUniqueId();
                tabPanel = tabPanels[i];

                // tabPanel.labelledBy = id;
                tabsData[tabPanel.id] = { labelledBy: id };
                if (tabPanel.active) {
                    activePanelExists = true;
                }

                ids.push(id);
            }

            this.ids = ids;
            this.dTabPanels = tabPanels;

            await this.tabAction('setData', tabsData);

            if (!activePanelExists) {
                await this.setActiveTabByIndex(0);
            }
        },

        /**
         * Deactivate currently active panel.
         */
        async deactivateActivePanel() {
            const { dTabPanels } = this;

            await this.tabAction('deactivate');

            for (let i = 0, len1 = dTabPanels.length; i < len1; i++) {
                if (dTabPanels[i].active) {
                    dTabPanels[i].active = false;
                    break;
                }
            }
        },

        /**
         * @param {int} _index
         */
        async setActiveTabByIndex(_index) {
            const tabPanel = this.dTabPanels[_index];

            if (tabPanel && !tabPanel.disabled) {
                await this.deactivateActivePanel();

                tabPanel.active = true;
                await this.tabAction('activate', tabPanel.id);

                this.$emit('tab-set', { tabId: tabPanel.id });
            }
        },

        /**
         * @param {HTMLElement} _elem
         * @return {int}
         */
        getTabIndexByElem(_elem) {
            const eLi = _elem.closest('li');

            return eLi ? parseInt(eLi.getAttribute('data-index')) : -1;
        },

        /**
         * @param {MouseEvent} _event
         */
        onTabListClick(_event) {
            const tabIndex = this.getTabIndexByElem(_event.target);

            if (tabIndex > -1) {
                this.setActiveTabByIndex(tabIndex);
            }
        },

        /**
         * @param {KeyboardEvent} _event
         */
        onTabListKeydown(_event) {
            const elem = keyboardNavigation({
                _event,
                _selector: '[role="tab"]:not([aria-disabled="true"])',
                _direction: 'horizontal',
                _circular: true,
            });

            if (elem) {
                const tabIndex = this.getTabIndexByElem(elem);

                if (tabIndex > -1) {
                    this.setActiveTabByIndex(tabIndex);
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

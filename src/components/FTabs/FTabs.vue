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
                :aria-disabled="tabPanel.disabled || disabled"
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
        disabled: {
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

        updateUrlHash(tabPanel) {
            const hasAnyUrlHash = this.dTabPanels.some((panel) => !!panel.urlHash);

            if (hasAnyUrlHash) {
                if (tabPanel.urlHash) {
                    const cleanHash = tabPanel.urlHash.replace(/^#/, '');

                    if (window.location.hash.replace(/^#/, '') !== cleanHash) {
                        window.location.hash = cleanHash;
                    }
                } else if (window.location.hash) {
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState(
                            null,
                            document.title,
                            window.location.pathname + window.location.search
                        );
                    } else {
                        window.location.hash = '';
                    }
                }
            }
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

            const matchingHashIndex = this.getMatchingHashIndex();

            if (matchingHashIndex > -1) {
                await this.setActiveTabByIndex(matchingHashIndex);
            } else if (!activePanelExists) {
                await this.setActiveTabByIndex(0);
            } else {
                const activeIndex = tabPanels.findIndex((panel) => panel.active);
                if (activeIndex > -1) {
                    this.updateUrlHash(tabPanels[activeIndex]);
                }
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
            let indexToActivate = _index;

            while (indexToActivate < this.dTabPanels.length && this.dTabPanels[indexToActivate].disabled) {
                indexToActivate++;
            }

            const tabPanel = this.dTabPanels[indexToActivate];

            if (tabPanel && !tabPanel.disabled && !this.disabled) {
                await this.deactivateActivePanel();

                tabPanel.active = true;
                await this.tabAction('activate', tabPanel.id);

                this.$emit('tab-set', { tabId: tabPanel.id });

                this.updateUrlHash(tabPanel);
            }
        },

        async disableTabs(tabIds = [], enableOthers = false) {
            const { dTabPanels } = this;
            const tabIdsSet = new Set(tabIds);

            for (let i = 0, len1 = dTabPanels.length; i < len1; i++) {
                const tabPanel = dTabPanels[i];

                if (tabIdsSet.has(tabPanel.id)) {
                    tabPanel.disabled = true;
                    tabPanel.active = false;
                } else if (enableOthers) {
                    tabPanel.disabled = false;
                }
            }

            if (!this.tabs.activate && this.getMatchingHashIndex() === -1) {
                await this.setActiveTabByIndex(0);
            }
        },

        getMatchingHashIndex() {
            const currentHash = window.location.hash.replace(/^#/, '');
            let matchingHashIndex = -1;

            if (currentHash) {
                const tabPanels = clone(this.tabs.states);

                matchingHashIndex = tabPanels.findIndex((panel) => {
                    return panel.urlHash && panel.urlHash.replace(/^#/, '') === currentHash;
                });
            }

            return matchingHashIndex;
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

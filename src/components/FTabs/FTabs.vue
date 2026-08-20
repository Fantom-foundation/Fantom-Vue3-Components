<template>
    <div class="ftabs" :class="{ 'ftabs-nostyle': noStyle }">
        <ul role="tablist" @click="onTabListClick" @keydown="onTabListKeydown">
            <li
                v-for="(tabPanel, idx) in dTabPanels"
                v-show="!tabPanel.hidden"
                :id="ids[idx]"
                :key="`${ids[idx]}`"
                :tabindex="tabPanel.active ? 0 : -1"
                :aria-controls="tabPanel.id"
                :aria-selected="tabPanel.active"
                :aria-disabled="tabPanel.disabled || disabled"
                :hidden="tabPanel.hidden || undefined"
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

    inject: {
        parentFTabs: {
            default: null,
        },
    },

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

    computed: {
        level() {
            return this.parentFTabs ? this.parentFTabs.level + 1 : 0;
        },
    },

    provide() {
        return {
            tabs: this.tabs,
            parentFTabs: this,
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

        parseUrlHash() {
            const rawHash =
                typeof window !== 'undefined' && window.location.hash ? window.location.hash.replace(/^#/, '') : '';

            if (!rawHash) {
                return { tabPath: '', segments: [], anchor: '' };
            }

            const [tabPath, anchor] = rawHash.split(':');
            const segments = tabPath ? tabPath.split('/') : [];

            return {
                tabPath: tabPath || '',
                segments,
                anchor: anchor || '',
            };
        },

        scrollToAnchor() {
            if (typeof window === 'undefined' || typeof document === 'undefined') {
                return;
            }

            const { anchor } = this.parseUrlHash();

            if (anchor) {
                this.$nextTick(() => {
                    const el = document.getElementById(anchor);

                    if (el && typeof el.scrollIntoView === 'function') {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        },

        updateUrlHash(tabPanel) {
            if (typeof window === 'undefined') {
                return;
            }

            const hasAnyUrlHash = this.dTabPanels.some((panel) => !!panel.urlHash);

            if (hasAnyUrlHash) {
                let { segments, anchor } = this.parseUrlHash();

                if (tabPanel.urlHash) {
                    const cleanHash = tabPanel.urlHash.replace(/^#/, '');

                    if (segments[this.level] !== cleanHash) {
                        segments[this.level] = cleanHash;
                        segments.length = this.level + 1;
                        anchor = '';
                    }
                } else {
                    segments.splice(this.level);
                    anchor = '';
                }

                const newTabPath = segments.filter(Boolean).join('/');
                let newHash = '';

                if (newTabPath) {
                    newHash = anchor ? `${newTabPath}:${anchor}` : newTabPath;
                }

                const currentFullHash = window.location.hash.replace(/^#/, '');

                if (newHash !== currentFullHash) {
                    if (newHash) {
                        window.history.replaceState(
                            null,
                            document.title,
                            window.location.pathname + window.location.search + `#${newHash}`
                        );
                    } else if (window.location.hash) {
                        window.history.replaceState(
                            null,
                            document.title,
                            window.location.pathname + window.location.search
                        );
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
                if (tabPanel.active && !tabPanel.hidden) {
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

            this.scrollToAnchor();
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

            while (
                indexToActivate < this.dTabPanels.length &&
                (this.dTabPanels[indexToActivate].disabled || this.dTabPanels[indexToActivate].hidden)
            ) {
                indexToActivate++;
            }

            const tabPanel = this.dTabPanels[indexToActivate];

            if (tabPanel && !tabPanel.disabled && !tabPanel.hidden && !this.disabled) {
                await this.deactivateActivePanel();

                tabPanel.active = true;
                await this.tabAction('activate', tabPanel.id);

                this.$emit('tab-set', { tabId: tabPanel.id });

                this.updateUrlHash(tabPanel);
                this.scrollToAnchor();
            }
        },

        async disableTabs(tabIds = [], enableOthers = false) {
            const tabIdsArr = Array.isArray(tabIds) ? tabIds : [tabIds];
            const { dTabPanels } = this;
            const tabIdsSet = new Set(tabIdsArr);

            for (let i = 0, len1 = dTabPanels.length; i < len1; i++) {
                const tabPanel = dTabPanels[i];

                if (tabIdsSet.has(tabPanel.id)) {
                    tabPanel.disabled = true;
                    tabPanel.active = false;
                } else if (enableOthers) {
                    tabPanel.disabled = false;
                }
            }

            const activePanel = dTabPanels.find((panel) => panel.active && !panel.hidden && !panel.disabled);
            if (!activePanel && !this.tabs.activate && this.getMatchingHashIndex() === -1) {
                await this.setActiveTabByIndex(0);
            }
        },

        /**
         * Hide tabs by ids.
         * @param {string[]|string} tabIds
         * @param {boolean} showOthers
         */
        async hideTabs(tabIds = [], showOthers = false) {
            const tabIdsArr = Array.isArray(tabIds) ? tabIds : [tabIds];
            const { dTabPanels } = this;
            const tabIdsSet = new Set(tabIdsArr);
            const tabsData = {};

            for (let i = 0, len1 = dTabPanels.length; i < len1; i++) {
                const tabPanel = dTabPanels[i];

                if (tabIdsSet.has(tabPanel.id)) {
                    tabPanel.hidden = true;
                    tabPanel.active = false;
                } else if (showOthers) {
                    tabPanel.hidden = false;
                }

                tabsData[tabPanel.id] = { hidden: tabPanel.hidden };
            }

            await this.tabAction('setData', tabsData);

            const activePanel = dTabPanels.find((panel) => panel.active && !panel.hidden && !panel.disabled);
            if (!activePanel) {
                await this.setActiveTabByIndex(0);
            }
        },

        /**
         * Show tabs by ids.
         * @param {string[]|string} tabIds
         * @param {boolean} hideOthers
         */
        async showTabs(tabIds = [], hideOthers = false) {
            const tabIdsArr = Array.isArray(tabIds) ? tabIds : [tabIds];
            const { dTabPanels } = this;
            const tabIdsSet = new Set(tabIdsArr);
            const tabsData = {};

            for (let i = 0, len1 = dTabPanels.length; i < len1; i++) {
                const tabPanel = dTabPanels[i];

                if (tabIdsSet.has(tabPanel.id)) {
                    tabPanel.hidden = false;
                } else if (hideOthers) {
                    tabPanel.hidden = true;
                    tabPanel.active = false;
                }

                tabsData[tabPanel.id] = { hidden: tabPanel.hidden };
            }

            await this.tabAction('setData', tabsData);

            const activePanel = dTabPanels.find((panel) => panel.active && !panel.hidden && !panel.disabled);
            if (!activePanel) {
                await this.setActiveTabByIndex(0);
            }
        },

        /**
         * Hide a single tab by id.
         * @param {string} tabId
         */
        async hideTab(tabId) {
            return this.hideTabs([tabId]);
        },

        /**
         * Show a single tab by id.
         * @param {string} tabId
         */
        async showTab(tabId) {
            return this.showTabs([tabId]);
        },

        getMatchingHashIndex() {
            const { segments } = this.parseUrlHash();
            const targetSegment = segments[this.level];
            let matchingHashIndex = -1;

            if (targetSegment) {
                const tabPanels = clone(this.tabs.states);

                matchingHashIndex = tabPanels.findIndex((panel) => {
                    return panel.urlHash && !panel.hidden && panel.urlHash.replace(/^#/, '') === targetSegment;
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
                _selector: '[role="tab"]:not([aria-disabled="true"]):not([hidden])',
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

<template>
    <div class="fpagination" @click="onClick" :class="classes">
        <ul class="fpagination_body" :aria-label="ariaLabel || translate('fpagination.paginationNavigation')">
            <li v-if="!hideFirstLast" data-item-type="first" class="fpagination_item">
                <!--
                    @slot Slot for buttons
                    @binding {string} label
                    @binding {string} title
                    @binding {boolean} disabled
                    @binding {('first'|'prev'|'next'|'last')} type
                -->
                <slot
                    name="button"
                    v-bind="{
                        label: firstLabel,
                        title: translate('fpagination.firstPage'),
                        disabled: disablePrevBtns || disabled,
                        type: 'first',
                    }"
                >
                    <FButton
                        tertiary
                        round
                        v-bind="buttonProps"
                        :label="firstLabel"
                        :disabled="disablePrevBtns || disabled"
                        :title="translate('fpagination.firstPage')"
                    />
                </slot>
            </li>
            <li v-if="!hidePrevNext" data-item-type="prev" class="fpagination_item">
                <slot
                    name="button"
                    v-bind="{
                        label: prevLabel,
                        title: translate('fpagination.prevPage'),
                        disabled: disablePrevBtns || disabled,
                        type: 'prev',
                    }"
                >
                    <FButton
                        tertiary
                        round
                        v-bind="buttonProps"
                        :label="prevLabel"
                        :disabled="disablePrevBtns || disabled"
                        :title="translate('fpagination.prevPage')"
                    />
                </slot>
            </li>
            <li class="fpagination_pages">
                <!--
                    @slot Pages info slot
                    @binding {FPaginationState} state
                -->
                <slot name="pages" v-bind="{ ...state }">
                    <template v-if="type === 'sibling-boundary'">
                        <span v-for="page in csbPages" :key="`fpid_${page.id}`">
                            <template v-if="page.label === 'dots'">
                                <slot name="dots">
                                    <FButton disabled tertiary round label="..." />
                                </slot>
                            </template>
                            <template v-else>
                                <slot
                                    name="button"
                                    v-bind="{
                                        label: page.label,
                                        currPage: dCurrPage === parseInt(page.label),
                                    }"
                                >
                                    <FButton
                                        tertiary
                                        round
                                        v-bind="buttonProps"
                                        :label="page.label.toString()"
                                        :data-page="page.label"
                                        :hovered="dCurrPage === parseInt(page.label)"
                                        :class="{
                                            fpagination_currpage: dCurrPage === parseInt(page.label),
                                        }"
                                    />
                                </slot>
                            </template>
                        </span>
                    </template>
                    <template v-else>
                        <span v-if="disablePrevBtns && disableNextBtns">-</span>
                        <span v-else-if="type === 'xofy'" :title="getRangeLabel()" class="fpagination_xofy">
                            <span class="fpagination_pages_curr">{{ dCurrPage }}</span>
                            {{ translate('fpagination.of') }} {{ numPages }}
                        </span>
                        <span v-else-if="type === 'range'" :title="getXOfYLabel()">
                            <span class="fpagination_pages_curr">
                                {{ itemsIndices.from + 1 }}-{{ itemsIndices.to + 1 }} </span
                            >/ {{ totalItems }}
                        </span>
                    </template>
                </slot>
            </li>
            <li v-if="!hidePrevNext" data-item-type="next" class="fpagination_item">
                <slot
                    name="button"
                    v-bind="{
                        label: nextLabel,
                        title: translate('fpagination.nextPage'),
                        disabled: disableNextBtns || disabled,
                        type: 'next',
                    }"
                >
                    <FButton
                        tertiary
                        round
                        v-bind="buttonProps"
                        :label="nextLabel"
                        :disabled="disableNextBtns || disabled"
                        :title="translate('fpagination.nextPage')"
                    />
                </slot>
            </li>
            <li v-if="!hideFirstLast" data-item-type="last" class="fpagination_item">
                <slot
                    name="button"
                    v-bind="{
                        label: lastLabel,
                        title: translate('fpagination.lastPage'),
                        disabled: disableNextBtns || disabled,
                        type: 'last',
                    }"
                >
                    <FButton
                        tertiary
                        round
                        v-bind="buttonProps"
                        :disabled="disableNextBtns || disabled"
                        :title="translate('fpagination.lastPage')"
                        ><slot name="btn-last">{{ lastLabel }}</slot></FButton
                    >
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
import './FPagination.types.js';
import FButton from '../FButton/FButton.vue';
import { translationsMixin } from '../../mixins/translations.js';
import { getAttr } from '../../utils/DOM.js';

/**
 * Component for displaying various pagination
 */
export default {
    name: 'FPagination',

    components: { FButton },

    /*model: {
        prop: 'currPage',
        event: 'change',
    },*/

    mixins: [translationsMixin],

    emits: ['update:currPage', 'page-change'],

    props: {
        /**
         * Type of pagination
         * `'xofy'` - displays pages as `currPage/numPages`
         * `'range'` - displays pages as `from-to/totalItems`
         * `'sibling-boundary'` - displays pages as buttons
         *
         * @type {('xofy' | 'range')}
         */
        type: {
            type: String,
            default: 'xofy',
            validator: function (_value) {
                return ['xofy', 'range', 'sibling-boundary'].indexOf(_value) !== -1;
            },
        },
        /** Total amount of items */
        totalItems: {
            type: Number,
            default: 0,
        },
        /** Number of items per page */
        perPage: {
            type: Number,
            default: 20,
        },
        /** Current page number */
        currPage: {
            type: Number,
            default: 1,
        },
        /** Pagination's aria-label */
        ariaLabel: {
            type: String,
            default: '',
        },
        /** First button label */
        firstLabel: {
            type: String,
            default: '«',
        },
        /** Last button label */
        lastLabel: {
            type: String,
            default: '»',
        },
        /** Previous button label */
        prevLabel: {
            type: String,
            default: '‹',
        },
        /** Next button label */
        nextLabel: {
            type: String,
            default: '›',
        },
        /** If set the pagination will be disabled */
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Hide previous and next buttons */
        hidePrevNext: {
            type: Boolean,
            default: false,
        },
        /** Hide first and last buttons */
        hideFirstLast: {
            type: Boolean,
            default: false,
        },
        /** Count of page buttons near the current page */
        siblingCount: {
            type: Number,
            default: 0,
        },
        /** Count of page buttons near the edges */
        boundaryCount: {
            type: Number,
            default: 0,
        },
        buttonProps: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            /** Current page index. */
            dCurrPage: this.currPage,
            /** Previous page index. */
            prevPage: -1,
            sbPages: [],
        };
    },

    computed: {
        /**
         * @return {FPaginationState}
         */
        state() {
            this.updateCurrPage(this.dCurrPage);

            return {
                totalItems: this.totalItems,
                perPage: this.perPage,
                currPage: this.dCurrPage,
                prevPage: this.prevPage,
                isFirstPage: this.dCurrPage === 1,
                isLastPage: this.dCurrPage === this.numPages,
                numPages: this.numPages,
                itemsIndices: this.itemsIndices,
            };
        },

        /**
         * Returns number of pages.
         *
         * @return {int}
         */
        numPages() {
            if (isNaN(this.totalItems)) {
                return Number.MAX_SAFE_INTEGER;
            }

            return Math.max(Math.ceil(this.totalItems / this.perPage), 1);
        },

        /**
         * Indices of items of current page
         *
         * @return {{from: number, to: number}}
         */
        itemsIndices() {
            const to = this.dCurrPage * this.perPage - 1;

            return {
                from: (this.dCurrPage - 1) * this.perPage,
                to: to >= this.totalItems ? this.totalItems - 1 : to,
            };
        },

        /**
         * @return {boolean}
         */
        disablePrevBtns() {
            return this.dCurrPage <= 1;
        },

        /**
         * @return {boolean}
         */
        disableNextBtns() {
            return this.dCurrPage >= this.numPages;
        },

        classes() {
            return {
                'fpagination-disabled': this.disabled,
            };
        },

        csbPages() {
            return this.sbPages.map((page, idx) => ({ id: idx, label: page }));
        },
    },

    watch: {
        currPage: {
            handler(_value) {
                let value = parseInt(_value);

                if (isNaN(value) || value < 1) {
                    value = 1;
                } else if (value > this.numPages) {
                    value = this.numPages;
                }

                this.prevPage = this.dCurrPage;
                this.dCurrPage = value;
                this.goToPage(this.dCurrPage);
            },
            immediate: true,
        },
        totalItems() {
            this.processSBPages();
        },
    },

    methods: {
        reset() {
            this.dCurrPage = 1;
            this.prevPage = -1;
        },

        processSBPages() {
            if (this.type !== 'sibling-boundary') {
                return;
            }

            const { numPages, currPage } = this.state;
            const { siblingCount } = this;
            const { boundaryCount } = this;
            const pages = [];
            const minHidden = 2;
            const showLeftDots = currPage > minHidden + siblingCount + boundaryCount;
            const showRightDots = currPage <= numPages - minHidden - siblingCount - boundaryCount;
            let i = 0;

            if (numPages <= minHidden + 1 || (!showLeftDots && !showRightDots)) {
                for (i = 0; i < numPages; i++) {
                    pages.push(i + 1);
                }
            } else {
                i = 1;

                if (showLeftDots) {
                    if (boundaryCount > 0) {
                        this._pushPages({ from: i, to: boundaryCount, pages });
                    }

                    pages.push('dots');
                } else {
                    this._pushPages({ from: i, to: minHidden + 2 * siblingCount + boundaryCount, pages });
                }

                if (showLeftDots && showRightDots) {
                    this._pushPages({ from: currPage - siblingCount, to: currPage + siblingCount, pages });
                }

                if (showRightDots) {
                    pages.push('dots');

                    if (boundaryCount > 0) {
                        this._pushPages({ from: numPages - boundaryCount + 1, to: numPages, pages });
                    }
                } else {
                    this._pushPages({
                        from: numPages - minHidden - 2 * siblingCount - boundaryCount + 1,
                        to: numPages,
                        pages,
                    });
                }
            }

            this.sbPages = pages;
        },

        _pushPages({ pages, from, to }) {
            while (from <= to) {
                pages.push(from);
                from++;
            }
        },

        /**
         * @param {int|'first'|'last'|'prev'|'next'} _pageNum
         * @return {boolean} `true` if page was changed
         */
        goToPage(_pageNum) {
            if (this.disabled) {
                return false;
            }

            let pageNum = 1;

            if (typeof _pageNum === 'string') {
                pageNum = this.getPageNumByKeyword(_pageNum);
            } else {
                pageNum = _pageNum;
            }

            this.prevPage = this.dCurrPage;
            this.updateCurrPage(pageNum);

            this.processSBPages();

            /**
             * Triggers when the page changes
             *
             * @property {FPaginationState} state
             */
            this.$emit('page-change', this.state);
            /**
             * Passthrough change event
             *
             * @property {number} currPage
             */
            this.$emit('update:currPage', this.dCurrPage);

            return pageNum === this.dCurrPage;
        },

        updateCurrPage(_pageNum) {
            this.dCurrPage = Math.min(Math.max(_pageNum, 1), this.numPages);
        },

        /**
         * @return {string}
         */
        getXOfYLabel() {
            return `${this.translate('fpagination.page')} ${this.dCurrPage} ${this.translate('fpagination.of')} ${
                this.numPages
            }`;
        },

        /**
         * @return {string}
         */
        getRangeLabel() {
            return `${this.itemsIndices.from + 1}-${this.itemsIndices.to + 1}/${this.totalItems}`;
        },

        /**
         * @param {'first'|'last'|'prev'|'next'} str
         * @return {number}
         */
        getPageNumByKeyword(str) {
            let pageNum = 1;

            if (str === 'next') {
                pageNum = this.dCurrPage + 1;
            } else if (str === 'prev') {
                pageNum = this.dCurrPage - 1;
            } else if (str === 'last') {
                pageNum = this.numPages;
            } else if (str === 'first') {
                pageNum = 1;
            }

            return pageNum;
        },

        /**
         * @param {Event} _event
         */
        onClick(_event) {
            const itemType = getAttr(_event.target.closest('li'), 'data-item-type');

            if (itemType) {
                this.goToPage(itemType);
            } else {
                const pageNum = parseInt(getAttr(_event.target.closest('[data-page]'), 'data-page'));

                if (!isNaN(pageNum)) {
                    this.goToPage(pageNum);
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

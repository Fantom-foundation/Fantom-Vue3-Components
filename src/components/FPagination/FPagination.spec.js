import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FPagination from './FPagination.vue';
import { destroyWrapper } from '@/test/utils.js';

let wrapper = null;

function getSiblingBoundaryProps({ siblingCount = 0, boundaryCount = 0, currPage = 1, pageCount = 1 } = {}) {
    return {
        type: 'sibling-boundary',
        siblingCount,
        boundaryCount,
        currPage,
        perPage: 10,
        totalItems: pageCount * 10,
        hidePrevNext: true,
        hideFirstLast: true,
    };
}

function createWrapper(options = {}) {
    return mount(FPagination, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FPagination', () => {
    describe('"sibling-boundary" pagination type', () => {
        it('should display one page', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps(),
            });

            expect(wrapper.text()).toBe('1');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 0, pageCount: 2, currPage: 1}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    pageCount: 2,
                }),
            });

            expect(wrapper.text()).toBe('12');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 0, pageCount: 3, currPage: 1}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    pageCount: 3,
                }),
            });

            expect(wrapper.text()).toBe('123');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 0, pageCount: 4, currPage: 2}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    currPage: 2,
                    pageCount: 4,
                }),
            });

            expect(wrapper.text()).toBe('12...');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 0, pageCount: 4, currPage: 3}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    currPage: 3,
                    pageCount: 4,
                }),
            });

            expect(wrapper.text()).toBe('...34');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 0, pageCount: 7, currPage: 7}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    currPage: 7,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('...67');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 0, pageCount: 5, currPage: 3}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    currPage: 3,
                    pageCount: 5,
                }),
            });

            expect(wrapper.text()).toBe('...3...');
        });

        it('should display correct pages and dots if {siblingCount: 1, boundaryCount: 0, pageCount: 4, currPage: 2}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 1,
                    currPage: 2,
                    pageCount: 4,
                }),
            });

            expect(wrapper.text()).toBe('1234');
        });

        it('should display correct pages and dots if {siblingCount: 1, boundaryCount: 0, pageCount: 7, currPage: 3}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 1,
                    currPage: 3,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('1234...');
        });

        it('should display correct pages and dots if {siblingCount: 1, boundaryCount: 0, pageCount: 7, currPage: 4}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 1,
                    currPage: 4,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('...345...');
        });

        it('should display correct pages and dots if {siblingCount: 1, boundaryCount: 0, pageCount: 7, currPage: 5}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 1,
                    currPage: 5,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('...4567');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 0, pageCount: 9, currPage: 4}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    currPage: 3,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('123456...');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 0, pageCount: 9, currPage: 5}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    currPage: 5,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('...34567...');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 0, pageCount: 9, currPage: 6}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    currPage: 6,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('...456789');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 0, pageCount: 9, currPage: 6}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    currPage: 9,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('...456789');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 1, pageCount: 4, currPage: 2}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 1,
                    currPage: 2,
                    pageCount: 4,
                }),
            });

            expect(wrapper.text()).toBe('1234');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 1, pageCount: 5, currPage: 3}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 1,
                    currPage: 3,
                    pageCount: 5,
                }),
            });

            expect(wrapper.text()).toBe('12345');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 1, pageCount: 7, currPage: 3}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 1,
                    currPage: 3,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('123...7');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 1, pageCount: 7, currPage: 4}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 1,
                    currPage: 4,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('1...4...7');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 1, pageCount: 7, currPage: 5}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 1,
                    currPage: 5,
                    pageCount: 7,
                }),
            });

            expect(wrapper.text()).toBe('1...567');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 2, pageCount: 9, currPage: 4}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 2,
                    currPage: 4,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('1234...89');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 2, pageCount: 9, currPage: 5}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 2,
                    currPage: 5,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('12...5...89');
        });

        it('should display correct pages and dots if {siblingCount: 0, boundaryCount: 2, pageCount: 9, currPage: 9}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    boundaryCount: 2,
                    currPage: 9,
                    pageCount: 9,
                }),
            });

            expect(wrapper.text()).toBe('12...6789');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 1, pageCount: 9, currPage: 5}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    boundaryCount: 1,
                    currPage: 5,
                    pageCount: 11,
                }),
            });

            expect(wrapper.text()).toBe('1234567...11');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 1, pageCount: 9, currPage: 6}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    boundaryCount: 1,
                    currPage: 6,
                    pageCount: 11,
                }),
            });

            expect(wrapper.text()).toBe('1...45678...11');
        });

        it('should display correct pages and dots if {siblingCount: 2, boundaryCount: 1, pageCount: 9, currPage: 7}', () => {
            wrapper = createWrapper({
                props: getSiblingBoundaryProps({
                    siblingCount: 2,
                    boundaryCount: 1,
                    currPage: 7,
                    pageCount: 11,
                }),
            });

            expect(wrapper.text()).toBe('1...567891011');
        });
    });
});

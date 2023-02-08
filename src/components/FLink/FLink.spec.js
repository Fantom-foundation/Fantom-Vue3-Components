import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FLink from './FLink.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FLink, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FLink', () => {
    it('should display link with given href and text', () => {
        wrapper = createWrapper({
            props: {
                text: '0x12345',
                href: 'https://ftmscan.com/tx/',
            },
        });

        const link = wrapper.find('a');
        expect(link.text()).toContain('0x12345');
        expect(link.attributes().href).toBe('https://ftmscan.com/tx/');
    });

    it('should pick a href by link `type` when `hrefs` are given', () => {
        wrapper = createWrapper({
            props: {
                hrefs: {
                    type1: 'https://ftmscan.com/tx/',
                },
                type: 'type1',
            },
        });

        const link = wrapper.find('a');
        expect(link.attributes().href).toBe('https://ftmscan.com/tx/');
    });

    it('should pick a href by link `type` when `hrefs` are given and `hrefs` value is a function', () => {
        wrapper = createWrapper({
            props: {
                hrefs: {
                    type1(props) {
                        return new URL(props.hrefParam, 'https://ftmscan.com/tx/').href;
                    },
                },
                hrefParam: 'foo',
                type: 'type1',
            },
        });

        const link = wrapper.find('a');
        expect(link.attributes().href).toBe('https://ftmscan.com/tx/foo');
    });

    it('should render content in default slot', () => {
        wrapper = createWrapper({
            slots: {
                default: '<span>content</span>',
            },
        });

        const link = wrapper.find('a');
        expect(link.html()).toContain('<span>content</span>');
    });

    it('should add correct `data-type` attribute according to given `type`', () => {
        wrapper = createWrapper({
            props: {
                type: 'type1',
            },
        });

        const link = wrapper.find('a');
        expect(link.attributes()['data-type']).toBe('type1');
    });

    it('should use FEllipsis if `useEllipsis` prop is set', () => {
        wrapper = createWrapper({
            props: {
                text: '0x123456789',
                useEllipsis: true,
            },
        });

        const link = wrapper.find('a');
        expect(link.text()).toContain('0x123456789');
        expect(link.findComponent({ name: 'FEllipsis' }).exists()).toBe(true);
    });

    it('should properly set `target` attribute', () => {
        wrapper = createWrapper({
            props: {
                target: '_blank',
            },
        });

        const link = wrapper.find('a');
        expect(link.attributes().target).toBe('_blank');
    });

    it('should properly set `title` attribute', () => {
        wrapper = createWrapper({
            props: {
                title: 'foo',
            },
        });

        const link = wrapper.find('a');
        expect(link.attributes().title).toBe('foo');
    });

    it('should properly set `class` attribute', () => {
        wrapper = createWrapper({
            props: {
                clas: 'foo',
            },
        });

        const link = wrapper.find('a');
        expect(link.attributes().class).toContain('foo');
    });
});

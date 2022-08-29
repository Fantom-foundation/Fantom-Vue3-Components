import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FToken from './FToken.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(FToken, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FToken', () => {
    describe('symbol', () => {
        it('should display token symbol', () => {
            wrapper = createWrapper({
                props: {
                    symbol: 'FTM',
                },
            });

            expect(wrapper.text()).toContain('FTM');
        });

        it('should display token symbol if `token` prop is given', () => {
            wrapper = createWrapper({
                props: {
                    token: { symbol: 'FTM' },
                },
            });

            expect(wrapper.text()).toContain('FTM');
        });

        it('should not display token symbol if `noSymbol` prop is `true`', () => {
            wrapper = createWrapper({
                props: {
                    noSymbol: true,
                    symbol: 'FTM',
                },
            });

            expect(wrapper.text()).not.toContain('FTM');
        });
    });

    describe('logo', () => {
        it('should display token logo', () => {
            wrapper = createWrapper({
                props: {
                    logo: 'logo.png',
                },
            });

            expect(wrapper.find('img').exists()).toBe(true);
        });

        it('should display token logo if `token` prop is given', () => {
            wrapper = createWrapper({
                props: {
                    token: { logoURL: 'logo.png' },
                },
            });

            expect(wrapper.find('img').exists()).toBe(true);
        });

        it('should not display token logo if `noLogo` prop is `true`', () => {
            wrapper = createWrapper({
                props: {
                    noLogo: true,
                    logo: 'logo.png',
                },
            });

            expect(wrapper.find('img').exists()).toBe(false);
        });

        it('should set size of a logo', () => {
            wrapper = createWrapper({
                props: {
                    logo: 'logo.png',
                    logoSize: 10,
                },
            });
            const { style } = wrapper.findByTestId('logo').element;

            expect(style.width).toBe('10px');
            expect(style.height).toBe('10px');
        });
    });

    describe('value', () => {
        it('should display value language-sensitive formatted by default', () => {
            wrapper = createWrapper({
                props: {
                    value: 123456.789123,
                },
            });

            expect(wrapper.text()).toContain('123,456.789');
        });

        it('should display value rounded to the `maximumFractionDigits`', () => {
            wrapper = createWrapper({
                props: {
                    value: 123456.789123,
                    maximumFractionDigits: 1,
                },
            });

            expect(wrapper.text()).toContain('123,456.8');
        });

        it('should display unrounded value in the title', () => {
            wrapper = createWrapper({
                props: {
                    value: 123456.789123,
                },
            });

            expect(wrapper.attributes('title')).toContain('123456.789123');
        });

        it('should display unrounded value in the title with symbol', () => {
            wrapper = createWrapper({
                props: {
                    value: 123456.789123,
                    symbol: 'FTM',
                },
            });

            expect(wrapper.attributes('title')).toContain('123456.789123 FTM');
        });

        it('should display placeholder if value is not set yet and `usePlaceholder` is `true`', async () => {
            wrapper = createWrapper({
                props: {
                    usePlaceholder: true,
                    symbol: 'FTM',
                },
            });

            expect(wrapper.findByTestId('placeholder').classes()).toContain('fplaceholder-on');

            await wrapper.setProps({ value: 1 });

            expect(wrapper.findByTestId('placeholder').classes()).not.toContain('fplaceholder-on');
        });
    });
});

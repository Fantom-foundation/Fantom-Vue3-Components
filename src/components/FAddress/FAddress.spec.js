import { describe, it, afterEach, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from '@/test/utils.js';
import FAddress from './FAddress.vue';
import { vi } from 'vitest';
import '../../test/mocks/clipboard.js';

const ADDRESS = '0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb';
let wrapper = null;

function createWrapper(options) {
    return mount(FAddress, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FAddress', () => {
    it('should display given address', () => {
        wrapper = createWrapper({ props: { address: ADDRESS } });

        expect(wrapper.text()).toContain(ADDRESS);
    });

    it('should display an image if "image" prop is given', () => {
        const imageSrc = 'foo.jpg';
        wrapper = createWrapper({
            props: {
                image: imageSrc,
                address: ADDRESS,
            },
        });
        const eImage = wrapper.find('img');

        expect(eImage.exists()).toBe(true);
        expect(eImage.attributes('src')).toBe(imageSrc);
    });

    it('should display jazzicon if "useJazzicon" prop is set', () => {
        wrapper = createWrapper({
            props: {
                useJazzicon: true,
                address: ADDRESS,
            },
        });

        expect(wrapper.findByTestId('jazzicon').find('svg').exists()).toBe(true);
    });

    it('should set jazzicon size by "imageSize" prop', () => {
        wrapper = createWrapper({
            props: {
                imageSize: 20,
                useJazzicon: true,
                address: ADDRESS,
            },
        });
        const eJazzicon = wrapper.findByTestId('jazzicon').find('div').element;

        expect(eJazzicon.style.width).toBe('20px');
        expect(eJazzicon.style.height).toBe('20px');
    });

    it('should copy account address to clipboard', async () => {
        wrapper = createWrapper({
            props: {
                address: ADDRESS,
                useCopyButton: true,
            },
        });
        const copyButton = wrapper.findByTestCode('copy_button')[0];
        const spy = vi.spyOn(navigator.clipboard, 'writeText');

        await copyButton.trigger('click');

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(ADDRESS);

        spy.mockRestore();
    });
});

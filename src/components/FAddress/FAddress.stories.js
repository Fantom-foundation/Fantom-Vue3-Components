import FAddress from './FAddress.vue';

export default {
    title: 'FAddress',
    component: FAddress,
};

export const Default = () => ({
    components: { FAddress },
    //language=HTML
    template: `
        <div>
            <FAddress address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
});

export const Image = () => ({
    components: { FAddress },
    //language=HTML
    template: `
        <div>
            <FAddress image="avatar.png" address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
});

export const UseJazzicon = () => ({
    components: { FAddress },
    //language=HTML
    template: `
        <div>
            <FAddress use-jazzicon address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
});

export const ImageSize = () => ({
    components: { FAddress },
    //language=HTML
    template: `
        <div>
            <FAddress :image-size="40" image="avatar.png" address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
            <br />
            <FAddress :image-size="40" use-jazzicon address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
});

export const SuffixSlot = () => ({
    components: { FAddress },
    //language=HTML
    template: `
        <div>
            <FAddress address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb">
                <template #suffix><b>suffix</b></template>
            </FAddress>
            <br />
            <FAddress use-jazzicon address="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb">
                <template #suffix><b>suffix</b></template>
            </FAddress>
        </div>
    `,
});

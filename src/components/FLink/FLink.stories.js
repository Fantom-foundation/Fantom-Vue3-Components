import FLink from './FLink.vue';

export default {
    title: 'FLink',
    component: FLink,
};

export const Default = () => ({
    components: { FLink },
    template: `
        <div>
            <FLink />
        </div>
    `,
});

export const HrefAndText = () => ({
    components: { FLink },
    template: `
        <div>
            <FLink href="https://ftmscan.com/address/" text="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
});

export const HrefsAndType = () => ({
    components: { FLink },
    template: `
        <div>
            <FLink :hrefs="hrefs" type="address" text="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" /><br />
            <FLink :hrefs="hrefs" type="transaction" text="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
    data() {
        return {
            hrefs: {
                address(props) {
                    return new URL(props.text, 'https://ftmscan.com/address/');
                },
                transaction(props) {
                    return new URL(props.text, 'https://ftmscan.com/tx/');
                },
            },
        };
    },
});

export const UseEllipsis = () => ({
    components: { FLink },
    template: `
        <div>
            <FLink use-ellipsis text="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb" />
        </div>
    `,
});

export const DefaultSlot = () => ({
    components: { FLink },
    template: `
        <div>
        <FLink text="0xeb57521b52E1102eE6B1422BA3A6F53D0C9E18cb">
            <template #default="{ text }">
                <b>{{ text }}</b>
            </template>
        </FLink>
        </div>
    `,
});

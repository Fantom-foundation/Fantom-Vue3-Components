import FSvgIcon from './FSvgIcon.vue';
import IconFantom from '../icons/IconFantom.vue';
import IconTimes from '../icons/IconTimes.vue';
import IconPresent from '../icons/IconPresent.vue';

export default {
    title: 'FSvgIcon',
    component: FSvgIcon,
};

export const Default = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon><IconFantom /></FSvgIcon>
            <FSvgIcon><IconTimes /></FSvgIcon>
            <FSvgIcon><IconPresent /></FSvgIcon>
        </div>
    `,
});

export const Size = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon size="16px"><IconFantom /></FSvgIcon>
            <FSvgIcon><IconFantom /></FSvgIcon>
            <FSvgIcon style="--fsvgicon-width: 48px;--fsvgicon-height: 48px;"><IconFantom /></FSvgIcon>
            <FSvgIcon width="64px" height="64px"><IconFantom /></FSvgIcon>
        </div>
    `,
});

export const Color = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon color="#00c"><IconFantom /></FSvgIcon>
            <FSvgIcon color="#c00"><IconTimes /></FSvgIcon>
            <FSvgIcon style="--fsvgicon-color: #0c0"><IconPresent /></FSvgIcon>
        </div>
    `,
});

export const Original = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon original><IconFantom /></FSvgIcon>
            <FSvgIcon original><IconTimes /></FSvgIcon>
            <FSvgIcon original><IconPresent /></FSvgIcon>
        </div>
    `,
});

export const Rotate = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon rotate="0deg" size="32px"><IconFantom /></FSvgIcon>
            <FSvgIcon rotate="90deg" size="32px"><IconFantom /></FSvgIcon>
            <FSvgIcon rotate="180deg" size="32px"><IconFantom /></FSvgIcon>
            <FSvgIcon rotate="270deg" size="32px"><IconFantom /></FSvgIcon>
        </div>
    `,
});

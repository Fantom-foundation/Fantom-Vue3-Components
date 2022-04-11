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
            <FSvgIcon><icon-fantom /></FSvgIcon>
            <FSvgIcon><icon-times /></FSvgIcon>
            <FSvgIcon><icon-present /></FSvgIcon>
        </div>
    `,
});

export const Size = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon size="16px"><icon-fantom /></FSvgIcon>
            <FSvgIcon><icon-fantom /></FSvgIcon>
            <FSvgIcon style="--fsvgicon-width: 48px;--fsvgicon-height: 48px;"><icon-fantom /></FSvgIcon>
            <FSvgIcon width="64px" height="64px"><icon-fantom /></FSvgIcon>
        </div>
    `,
});

export const Color = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon color="#00c"><icon-fantom /></FSvgIcon>
            <FSvgIcon color="#c00"><icon-times /></FSvgIcon>
            <FSvgIcon style="--fsvgicon-color: #0c0"><icon-present /></FSvgIcon>
        </div>
    `,
});

export const Original = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon original><icon-fantom /></FSvgIcon>
            <FSvgIcon original><icon-times /></FSvgIcon>
            <FSvgIcon original><icon-present /></FSvgIcon>
        </div>
    `,
});

export const Rotate = () => ({
    components: { FSvgIcon, IconTimes, IconPresent, IconFantom },
    template: `
        <div>
            <FSvgIcon rotate="0deg" size="32px"><icon-fantom /></FSvgIcon>
            <FSvgIcon rotate="90deg" size="32px"><icon-fantom /></FSvgIcon>
            <FSvgIcon rotate="180deg" size="32px"><icon-fantom /></FSvgIcon>
            <FSvgIcon rotate="270deg" size="32px"><icon-fantom /></FSvgIcon>
        </div>
    `,
});

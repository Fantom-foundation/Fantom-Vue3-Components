import FCopyButton from './FCopyButton.vue';

export default {
    title: 'FCopyButton',
    component: FCopyButton,
};

export const Default = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton text="copied!" />
        </div>
    `,
});

export const PopoverText = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton popover-text="Popover text" text="copied!" />
        </div>
    `,
});

export const ButtonTitle = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton button-title="Button title" text="copied!" />
        </div>
    `,
});

export const IconSize = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton icon-size="24px" text="copied!" />
        </div>
    `,
});

export const HideAfter = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton :hide-after="3000" text="copied!" />
        </div>
    `,
});

export const DefaultSlot = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton button-id="fcb1" text="copied!">
                <b>Popover</b> <i>text</i>
            </FCopyButton>
        </div>
    `,
});

export const ButtonSlot = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton button-id="fcb1" text="copied!">
                <template #button><button id="fcb1">Copy</button></template>
            </FCopyButton>
        </div>
    `,
});

export const ButtonContentSlot = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton :round="false" text="copied!">
                <template #button-content>
                    Copy
                </template>
            </FCopyButton>
        </div>
    `,
});

export const Variations = () => ({
    components: { FCopyButton },
    template: `
        <div>
            <FCopyButton :tertiary="false" :round="false" attach-position="bottom" text="copied!" />
        </div>
    `,
});

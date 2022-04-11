import FInfo from './FInfo.vue';

export default {
    title: 'FInfo',
    component: FInfo,
};

export const Default = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <FInfo>
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
        </div>
    `,
});

export const UsePopup = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <FInfo use-popup with-header :window-style="{ maxWidth: '480px' }">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
        </div>
    `,
});

export const ButtonTitle = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <FInfo button-title="Button title">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
        </div>
    `,
});

export const IconSize = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            Lorem ipsum
            <FInfo icon-size="24px">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
        </div>
    `,
});

export const ButtontSlot = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            <FInfo button-id="fi1">
                <template #button><button id="fi1">Info</button></template>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
        </div>
    `,
});

export const ButtonContentSlot = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            <FInfo>
                <template #button-content>
                    Info
                </template>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
        </div>
    `,
});

export const Variations = () => ({
    components: { FInfo },
    template: `
        <div class="pat-5">
            <FInfo secondary :tertiary="false" :round="false">
                <template #button-content>
                    Info
                </template>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
            Lorem ipsum
            <FInfo with-header title="Info">
                dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
            </FInfo>
            dolor sit amet, consectetur adipisicing elit. Aperiam ex fuga fugit inventore libero perspiciatis, suscipit veritatis voluptatum?
        </div>
    `,
});

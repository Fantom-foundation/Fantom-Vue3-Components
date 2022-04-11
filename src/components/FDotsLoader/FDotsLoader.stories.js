import FDotsLoader from './FDotsLoader.vue';

export default {
    title: 'FDotsLoader',
    component: FDotsLoader,
};

export const Default = () => ({
    components: { FDotsLoader },
    template: `
        <div>
            <FDotsLoader />
        </div>
    `,
});

export const Color = () => ({
    components: { FDotsLoader },
    template: `
        <div class="flex ali-center gap-5">
            <FDotsLoader color="crimson" />
            <FDotsLoader color="magenta" />
        </div>
    `,
});

export const Size = () => ({
    components: { FDotsLoader },
    template: `
        <div class="flex ali-center gap-5">
            <FDotsLoader size="24px" />
            <FDotsLoader />
            <FDotsLoader size="3px" />
        </div>
    `,
});

export const Speed = () => ({
    components: { FDotsLoader },
    template: `
        <div class="flex ali-center gap-5">
            <FDotsLoader speed="400ms" />
            <FDotsLoader speed="2s" />
        </div>
    `,
});

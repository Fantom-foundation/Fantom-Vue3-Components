import FImage from './FImage.vue';

export default {
    title: 'FImage',
    components: FImage,
};

export const Default = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div>
            <FImage alt="image" />
        </div>
    `,
});

export const Src = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div>
            <FImage src="avatar.png" alt="image" />
        </div>
    `,
});

export const SrcBig = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div>
            <FImage src="avatar2.jpg" alt="image" />
        </div>
    `,
});

export const WidthAndHeight = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <FImage width="100%" height="100px" alt="image" :style="style" />
            <FImage width="100%" height="100px" src="avatar.png" alt="image" :style="style" />
            <FImage width="100%" height="100px" src="avatar2.jpg" alt="image" :style="style" />
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
        };
    },
});

export const Size = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <FImage size="200px" alt="image" :style="style" />
            <FImage size="200px" src="avatar.png" alt="image" :style="style" />
            <FImage size="200px" src="avatar2.jpg" alt="image" :style="style" />
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
        };
    },
});

export const Fit = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <FImage fit="contain" size="200px" src="avatar2.jpg" alt="image" :style="style" /> <!-- default -->
            <FImage fit="cover" size="200px" src="avatar2.jpg" alt="image" :style="style" />
            <FImage fit="fill" size="200px" src="avatar2.jpg" alt="image" :style="style" />
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
        };
    },
});

export const NoImgSrc = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <FImage no-img-src="avatar.png" src="nonexistingimage" size="200px" alt="image" :style="style" /> <!-- default -->
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
        };
    },
});

export const PlaceholderSlot = () => ({
    components: { FImage },
    //language=HTML
    template: `
        <div class="gridauto">
            <FImage size="200px" :src="src" alt="image" :style="style">
                <template #placeholder>
                    Loading...
                </template>
            </FImage>
        </div>
    `,
    data() {
        return {
            style: {
                border: '1px solid #ddd',
            },
            src: '',
        };
    },
    created() {
        setTimeout(() => {
            this.src = 'avatar.png';
        }, 1500);
    },
});

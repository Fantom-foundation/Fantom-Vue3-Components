import FHamburgerSwitch from './FHamburgerSwitch.vue';

export default {
    title: 'FHamburgerSwitch',
    component: FHamburgerSwitch,
};

export const Default = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <FHamburgerSwitch aria-label="menu switch" />
        </div>
    `,
});

export const Thickness = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <FHamburgerSwitch thickness="1" aria-label="menu switch" />
            <FHamburgerSwitch thickness="2" aria-label="menu switch" />
            <FHamburgerSwitch thickness="3" aria-label="menu switch" />
        </div>
    `,
});

export const TwoLines = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <FHamburgerSwitch two-lines thickness="1" aria-label="menu switch" />
            <FHamburgerSwitch two-lines thickness="2" aria-label="menu switch" />
            <FHamburgerSwitch two-lines thickness="3" aria-label="menu switch" />
        </div>
    `,
});

export const MobileViewBreakpoint = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <h3>Resize viewport under/above 800px</h3>
            <FHamburgerSwitch mobile-view-breakpoint="800px" :on="on" thickness="2" aria-label="menu switch" />
        </div>
    `,
    data() {
        return {
            on: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.on = false;

            setTimeout(() => {
                this.on = true;
            }, 100);
        }, 100);
    },
});

export const Size = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <FHamburgerSwitch :style="bigSize" aria-label="menu switch" />
            <FHamburgerSwitch :style="smallSize" aria-label="menu switch" />
        </div>
    `,
    data() {
        return {
            bigSize: {
                transform: 'scale(1.2, 1.2)',
            },
            smallSize: {
                transform: 'scale(0.5, 0.5)',
            },
        };
    },
});

export const Colors = () => ({
    components: { FHamburgerSwitch },
    template: `
        <div>
            <FHamburgerSwitch :style="blueStyle" thickness="2" aria-label="menu switch" />
            <FHamburgerSwitch :style="purpleStyle" thickness="2" aria-label="menu switch" />
        </div>
    `,
    data() {
        return {
            blueStyle: {
                '--fhamburgerswitch-color': '#08209e',
            },
            purpleStyle: {
                '--fhamburgerswitch-color': '#800E99',
            },
        };
    },
});

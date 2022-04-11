import FCountdown from './FCountdown.vue';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default {
    title: 'FCountdown',
    components: FCountdown,
};

export const Default = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FCountdown :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const Show = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FCountdown :date="date" />
            <h3><code>dh</code></h3>
            <FCountdown show="dh" :date="date" />
            <h3><code>hms</code></h3>
            <FCountdown show="hms" :date="date" />
            <h3><code>ms</code></h3>
            <FCountdown show="ms" :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const WithLabels = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FCountdown with-labels :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const UseTwoDigitNumbers = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FCountdown use-two-digit-numbers with-labels :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const CssClasses = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FCountdown :css-classes="cssClasses" :date="date" />
        </div>
    `,
    data() {
        return {
            cssClasses: [
                {
                    time: MINUTE,
                    cssClass: 'co-red-4',
                },
            ],
            date: Date.now() + MINUTE + 5 * SECOND,
        };
    },
});

export const TimeOutEvent = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <FCountdown :date="date" @time-up="onTimeup" />
            <span>{{ msg }}</span>
        </div>
    `,
    data() {
        return {
            msg: '',
            date: Date.now() + 5 * SECOND,
        };
    },
    methods: {
        onTimeup() {
            this.msg = 'Time is up';
        },
    },
});

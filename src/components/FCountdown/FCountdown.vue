<template>
    <div class="fcountdown" :class="classes">
        <div v-if="show.indexOf('d') > -1">
            <div class="fcountdown_amount" data-testid="days">
                <slot name="days-amount" v-bind="{ days }">{{ days }}</slot>
            </div>
            <div v-if="withLabels" class="fcountdown_label" data-testid="days_label">
                <slot name="days">{{ translate('fcountdown.days') }}</slot>
            </div>
        </div>
        <div v-if="show.indexOf('h') > -1">
            <div class="fcountdown_amount" data-testid="hours">
                <slot name="hours-amount" v-bind="{ hours }">{{ hours }}</slot>
            </div>
            <div v-if="withLabels" class="fcountdown_label" data-testid="hours_label">
                <slot name="hours">{{ translate('fcountdown.hours') }}</slot>
            </div>
        </div>
        <div v-if="show.indexOf('m') > -1">
            <div class="fcountdown_amount" data-testid="minutes">
                <slot name="minutes-amount" v-bind="{ minutes }">{{ minutes }}</slot>
            </div>
            <div v-if="withLabels" class="fcountdown_label" data-testid="minutes_label">
                <slot name="minutes">{{ translate('fcountdown.minutes') }}</slot>
            </div>
        </div>
        <div v-if="show.indexOf('s') > -1">
            <div class="fcountdown_amount" data-testid="seconds">
                <slot name="seconds-amount" v-bind="{ seconds }">{{ seconds }}</slot>
            </div>
            <div v-if="withLabels" class="fcountdown_label" data-testid="seconds_label">
                <slot name="seconds">{{ translate('fcountdown.seconds') }}</slot>
            </div>
        </div>
    </div>
</template>

<script>
import { translationsMixin } from '../../mixins/translations.js';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default {
    name: 'FCountdown',

    mixins: [translationsMixin],

    emits: ['time-up'],

    props: {
        /** Valid value for Date object, greater than now */
        date: {
            type: [String, Number],
            default: '',
            required: true,
        },
        /** Specifies what to show - 'd' - days, 'h' - hours, 'm' - minutes, 's' - seconds */
        show: {
            type: String,
            default: 'dhms',
        },
        /** Speed of countdown updating in milliseconds */
        updateSpeed: {
            type: Number,
            default: 1000,
        },
        /**
         * If current countdown time (diff) is less than `time` property in milliseconds,
         * `cssClass` property will be added to the cointainer element.
         * @type {{time: number, cssClass: string}[]}
         */
        cssClasses: {
            type: Array,
            default() {
                return [];
            },
        },
        /** Show time labels */
        withLabels: {
            type: Boolean,
            default: false,
        },
        /** 1 -> 01 */
        useTwoDigitNumbers: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            dateTs: 0,
            // difference between now and dateTs in milliseconds
            diff: 0,
            timerId: -1,
        };
    },

    computed: {
        days() {
            const { diff } = this;

            return this.formatNumber(diff > 0 ? Math.floor(diff / DAY) : 0);
        },

        hours() {
            const { diff } = this;

            return this.formatNumber(diff > 0 ? Math.floor((diff % DAY) / HOUR) : 0);
        },

        minutes() {
            const { diff } = this;

            return this.formatNumber(diff > 0 ? Math.floor((diff % HOUR) / MINUTE) : 0);
        },

        seconds() {
            const { diff } = this;

            return this.formatNumber(diff > 0 ? Math.floor((diff % MINUTE) / SECOND) : 0);
        },

        cCssClasses() {
            const { cssClasses } = this;

            return cssClasses.sort(function (a, b) {
                return a.time - b.time;
            });
        },

        classes() {
            const { diff } = this;
            const cls = this.cCssClasses.find((c) => {
                return diff <= c.time;
            });

            return cls ? [cls.cssClass] : null;
        },
    },

    watch: {
        date: {
            handler(value) {
                this.init(value);
            },
            immediate: true,
        },
    },

    beforeUnmount() {
        this.clearTimer();
    },

    methods: {
        /**
         * @param {string|number} date
         */
        init(date) {
            this.setDate(date);
            this.setDiff();

            this.setTimer(() => {
                this.update();
            }, this.updateSpeed);
        },

        update() {
            this.setDiff();
        },

        /**
         * @param {string|number} date
         */
        setDate(date) {
            const ERROR_MSG = 'Bad date';

            if (!date) {
                throw new Error(ERROR_MSG);
            }

            const d = new Date(date);

            if (d.toString() === 'Invalid Date') {
                throw new Error(ERROR_MSG);
            }

            this.dateTs = d.valueOf();
        },

        setDiff() {
            if (this.dateTs > 0) {
                this.diff = this.dateTs - Date.now();

                if (this.diff <= 0) {
                    this.clearTimer();

                    this.$emit('time-up');
                }
            }
        },

        formatNumber(n) {
            return this.useTwoDigitNumbers && n < 10 ? `0${n}` : n;
        },

        /**
         * @param {function} callback
         * @param {number} speed
         */
        setTimer(callback, speed) {
            this.clearTimer();

            this.timerId = setInterval(callback, speed);
        },

        clearTimer() {
            if (this.timerId > -1) {
                clearInterval(this.timerId);
                this.timerId = -1;
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>

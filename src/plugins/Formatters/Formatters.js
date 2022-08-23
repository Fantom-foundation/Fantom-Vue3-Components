import { getDatesDiff, DAY, HOUR, MINUTE, SECOND } from '../../utils/date/date.js';

/**
 * Various formatters using Intl (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 */
export class Formatters {
    #formats = {
        dateTime: {
            default: {},
        },
        relativeTime: {
            default: {},
        },
    };
    #localeTag = 'en';
    #formattersCache = {};

    /**
     * @param {Object} dateTimeFormats
     * @param {Object} relativeTimeFormats
     */
    setup({ dateTimeFormats = {}, relativeTimeFormats = {} }) {
        const formats = this.#formats;

        formats.dateTime = { ...formats.dateTime, ...dateTimeFormats };
        formats.relativeTime = { ...formats.relativeTime, ...relativeTimeFormats };
    }

    /**
     * @param {string} tag
     */
    setLocale(tag = '') {
        this.#localeTag = tag;
    }

    /**
     * @param {Date} date
     * @param {string} [dateTimeFormatKey] Key from #formats.dateTime object
     * @return {string}
     */
    dateTime(date, dateTimeFormatKey = 'default') {
        return this.#getDateTimeFormatter(dateTimeFormatKey).format(date);
    }

    /**
     * @param {number} time
     * @param {"year"|"quarter"|"month"|"week"|"day"|"hour"|"minute"|"second"} unit
     * @param {string} [relativeTimeFormatKey]
     * @return {string}
     */
    relativeTime(time, unit, relativeTimeFormatKey = 'default') {
        return this.#getRelativeTimeFormatter(relativeTimeFormatKey).format(time, unit);
    }

    /**
     * @param {Date|number|string} date
     * @param {string} [relativeTimeFormatKey]
     * @return {string}
     */
    fromNow(date, relativeTimeFormatKey = 'default') {
        let diff = getDatesDiff(date, Date.now());
        let unit = 'seconds';
        let equals = true;
        const tresholds = {
            minute: 60, // seconds
            hour: 60, // minutes
            day: 24, // hours
            month: 31, // days
            year: 365, // days
        };

        if (Math.abs(diff) >= tresholds.year * DAY) {
            equals = Math.abs(diff) % (tresholds.year * DAY) === 0;

            unit = 'year';
            diff /= tresholds.year * DAY;
        } else if (Math.abs(diff) >= tresholds.month * DAY) {
            equals = Math.abs(diff) % (tresholds.month * DAY) === 0;

            unit = 'month';
            diff /= tresholds.month * DAY;
        } else if (Math.abs(diff) >= tresholds.day * HOUR) {
            equals = Math.abs(diff) % (tresholds.day * HOUR) === 0;

            unit = 'day';
            diff /= tresholds.day * HOUR;
        } else if (Math.abs(diff) >= tresholds.hour * MINUTE) {
            equals = Math.abs(diff) % (tresholds.hour * MINUTE) === 0;

            unit = 'hour';
            diff /= tresholds.hour * MINUTE;
        } else if (Math.abs(diff) >= tresholds.minute * SECOND) {
            equals = Math.abs(diff) % (tresholds.minute * SECOND) === 0;

            unit = 'minute';
            diff /= tresholds.minute * SECOND;
        } else {
            diff /= SECOND;
        }

        if (!equals) {
            diff += diff < 0 ? 1 : -1;
        }

        return this.relativeTime(Math.floor(diff), unit, relativeTimeFormatKey);
    }

    /**
     * @param {string} dateTimeFormatKey Key from #formats.dateTime object
     * @return {DateTimeFormat}
     */
    #getDateTimeFormatter(dateTimeFormatKey = '') {
        const datetimeFormat = this.#formats?.dateTime[dateTimeFormatKey];

        if (!datetimeFormat) {
            throw new Error(`Can't find datetime format '${dateTimeFormatKey}'`);
        }

        return this.#getCachedFormatter({
            localeTag: this.#localeTag,
            format: datetimeFormat,
            formatKey: dateTimeFormatKey,
            type: 'dateTime',
        });
    }

    /**
     * @param {string} relativeTimeFormatKey Key from #formats.dateTime object
     * @return {DateTimeFormat}
     */
    #getRelativeTimeFormatter(relativeTimeFormatKey = '') {
        const relativeTimeFormat = this.#formats?.relativeTime[relativeTimeFormatKey];

        if (!relativeTimeFormat) {
            throw new Error(`Can't find relative time format '${relativeTimeFormatKey}'`);
        }

        return this.#getCachedFormatter({
            localeTag: this.#localeTag,
            format: relativeTimeFormat,
            formatKey: relativeTimeFormatKey,
            type: 'relativeTime',
        });
    }

    /**
     * @param {string} localeTag
     * @param {Object} format
     * @param {string} formatKey
     * @param {string} type
     * @return {DateTimeFormat}
     */
    #getCachedFormatter({ localeTag = '', format = {}, formatKey = '', type = '' }) {
        const cacheKey = this.#getCacheKey({ localeTag, formatKey, type });
        let formatter = this.#formattersCache[cacheKey];

        if (!formatter) {
            if (type === 'dateTime') {
                formatter = new Intl.DateTimeFormat(localeTag, format);
            } else if (type === 'relativeTime') {
                formatter = new Intl.RelativeTimeFormat(localeTag, format);
            }

            this.#formattersCache[cacheKey] = formatter;
        }

        return formatter;
    }

    /**
     * @param {string} localeTag
     * @param {string} formatKey
     * @param {string} type
     * @return {string}
     */
    #getCacheKey({ localeTag = '', formatKey = '', type = '' }) {
        return `${type}_${localeTag}_${formatKey}`;
    }
}

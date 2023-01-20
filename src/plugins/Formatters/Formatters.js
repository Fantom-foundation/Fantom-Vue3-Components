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
        number: {
            default: {},
        },
        currency: {
            default: {},
        },
    };
    #localeTag = 'en';
    #defaultCurrency = 'USD';
    #formattersCache = {};

    /**
     * @param {Object} dateTimeFormats
     * @param {Object} relativeTimeFormats
     * @param {Object} numberFormats
     * @param {Object} currencyFormats
     * @param {string} defaultCurrency
     * @param {boolean} addCustomFormatsToPrototype
     */
    setup({
        dateTimeFormats = {},
        relativeTimeFormats = {},
        numberFormats = {},
        currencyFormats = {},
        defaultCurrency = 'USD',
        addCustomFormatsToPrototype = false,
    }) {
        const formats = this.#formats;

        formats.dateTime = { ...formats.dateTime, ...dateTimeFormats };
        formats.relativeTime = { ...formats.relativeTime, ...relativeTimeFormats };
        formats.number = { ...formats.number, ...numberFormats };
        formats.currency = { ...formats.currency, ...currencyFormats };

        this.setDefaulCurrency(defaultCurrency);

        if (addCustomFormatsToPrototype) {
            this.#addCustomFormatsToPrototype();
        }
    }

    /**
     * @param {string} tag
     */
    setLocale(tag = '') {
        this.#localeTag = tag;
    }

    /**
     * @param {string} currency
     */
    setDefaulCurrency(currency) {
        this.#defaultCurrency = currency;
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
        const thresholds = {
            minute: 60, // seconds
            hour: 60, // minutes
            day: 24, // hours
            month: 31, // days
            year: 365, // days
        };

        if (Math.abs(diff) >= thresholds.year * DAY) {
            equals = Math.abs(diff) % (thresholds.year * DAY) === 0;
            unit = 'year';
            diff /= thresholds.year * DAY;
        } else if (Math.abs(diff) >= thresholds.month * DAY) {
            equals = Math.abs(diff) % (thresholds.month * DAY) === 0;
            unit = 'month';
            diff /= thresholds.month * DAY;
        } else if (Math.abs(diff) >= thresholds.day * HOUR) {
            equals = Math.abs(diff) % (thresholds.day * HOUR) === 0;
            unit = 'day';
            diff /= thresholds.day * HOUR;
        } else if (Math.abs(diff) >= thresholds.hour * MINUTE) {
            equals = Math.abs(diff) % (thresholds.hour * MINUTE) === 0;
            unit = 'hour';
            diff /= thresholds.hour * MINUTE;
        } else if (Math.abs(diff) >= thresholds.minute * SECOND) {
            equals = Math.abs(diff) % (thresholds.minute * SECOND) === 0;
            unit = 'minute';
            diff /= thresholds.minute * SECOND;
        } else {
            diff /= SECOND;
        }

        if (!equals) {
            diff += diff < 0 ? 1 : -1;
        }

        return this.relativeTime(Math.floor(diff), unit, relativeTimeFormatKey);
    }

    /**
     * @param {number} value
     * @param {string} [numberFormatKey] Key from #formats.number object
     * @param {number} [maximumFractionDigits]
     * @return {string}
     */
    number(value, maximumFractionDigits = 20, numberFormatKey = 'default') {
        return this.#getNumberFomatter(numberFormatKey, maximumFractionDigits).format(value);
    }

    /**
     * @param {number} value
     * @param {string} [currency]
     * @param {string} [currencyFormatKey] Key from #formats.currency object
     * @return {string}
     */
    currency(value, currency = this.#defaultCurrency, currencyFormatKey = 'default') {
        return this.#getCurrencyFomatter(currencyFormatKey, currency).format(value);
    }

    /**
     * @param {string} dateTimeFormatKey Key from #formats.dateTime object
     * @return {Intl.DateTimeFormat}
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
     * @return {Intl.RelativeTimeFormat}
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
     * @param {string} numberFormatKey Key from #formats.number object
     * @param {number} [maximumFractionDigits]
     * @return {Intl.NumberFormat}
     */
    #getNumberFomatter(numberFormatKey = '', maximumFractionDigits = 20) {
        const numberFormat = this.#formats?.number[numberFormatKey];
        const format = {
            maximumFractionDigits,
            ...numberFormat,
        };

        if (!numberFormat) {
            throw new Error(`Can't find number format '${numberFormatKey}'`);
        }

        if (!('minimumFractionDigits' in format)) {
            format.minimumFractionDigits = 0;
        }

        return this.#getCachedFormatter({
            localeTag: this.#localeTag,
            format,
            formatKey: numberFormatKey,
            type: 'number',
        });
    }

    /**
     * @param {string} currencyFormatKey Key from #formats.currency object
     * @param {string} currency
     * @return {Intl.NumberFormat}
     */
    #getCurrencyFomatter(currencyFormatKey = '', currency = '') {
        const currencyFormat = this.#formats?.currency[currencyFormatKey];

        if (!currencyFormat) {
            throw new Error(`Can't find currency format '${currencyFormatKey}'`);
        }

        return this.#getCachedFormatter({
            localeTag: this.#localeTag,
            format: {
                style: 'currency',
                currency,
                ...currencyFormat,
            },
            formatKey: currencyFormatKey,
            type: 'number',
        });
    }

    /**
     * @param {string} localeTag
     * @param {Object} format
     * @param {string} formatKey
     * @param {string} type
     * @return {Intl.DateTimeFormat|Intl.RelativeTimeFormat|Intl.NumberFormat}
     */
    #getCachedFormatter({ localeTag = '', format = {}, formatKey = '', type = '' }) {
        const cacheKey = this.#getCacheKey({ localeTag, formatKey, type, format });
        let formatter = this.#formattersCache[cacheKey];

        if (!formatter) {
            formatter = this.#getFormatter({ localeTag, format, type });
            this.#formattersCache[cacheKey] = formatter;
        }

        return formatter;
    }

    /**
     * @param {string} localeTag
     * @param {Object} format
     * @param {string} type
     * @return {Intl.DateTimeFormat|Intl.RelativeTimeFormat|Intl.NumberFormat}
     */
    #getFormatter({ localeTag = '', format = {}, type = '' }) {
        let formatter = null;

        if (type === 'dateTime') {
            formatter = new Intl.DateTimeFormat(localeTag, format);
        } else if (type === 'relativeTime') {
            formatter = new Intl.RelativeTimeFormat(localeTag, format);
        } else if (type === 'number') {
            formatter = new Intl.NumberFormat(localeTag, format);
        } else {
            throw new Error(`Bad formatter type '${type}'`);
        }

        return formatter;
    }

    #addCustomFormatsToPrototype() {
        const formats = this.#formats;

        Object.keys(formats).forEach((key) => {
            const format = formats[key];

            Object.keys(format).forEach((name) => {
                if (name !== 'default') {
                    if (!(name in Formatters.prototype)) {
                        Formatters.prototype[name] = function (...args) {
                            if ((key === 'number' || key === 'currency') && args.length < 2) {
                                return this[key](...args, undefined, name);
                            }

                            return this[key](...args, name);
                        };
                    } else {
                        throw new Error(`A formater named '${name}' already exists`);
                    }
                }
            });
        });
    }

    /**
     * @param {string} localeTag
     * @param {string} formatKey
     * @param {string} type
     * @param {Object} format
     * @return {string}
     */
    #getCacheKey({ localeTag = '', formatKey = '', type = '', format = {} }) {
        return `${type}_${localeTag}_${formatKey}_${JSON.stringify(format)}`;
    }
}

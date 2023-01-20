import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Formatters } from './Formatters.js';

let formatters = null;

function createFormatters() {
    formatters = new Formatters();
    formatters.setup({
        dateTimeFormats: {
            shortDatetime: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            },
        },
        relativeTimeFormats: {
            short: {
                style: 'short',
            },
        },
        numberFormats: {
            myNumber: {
                maximumFractionDigits: 2,
                signDisplay: 'exceptZero',
            },
        },
        currencyFormats: {
            myCurrency: {
                signDisplay: 'exceptZero',
            },
        },
    });
}

function destroyFormatters() {
    formatters = null;
}

beforeEach(() => {
    vi.useFakeTimers();
    createFormatters();
});

afterEach(() => {
    destroyFormatters();
    vi.useRealTimers();
});

describe('Formatters', () => {
    describe('dateTime()', () => {
        it('should use default date/time format if no datetime format key is given', () => {
            expect(formatters.dateTime(new Date(Date.UTC(2022, 7, 22, 3, 50)))).toBe('8/22/2022');
        });

        it('should format date/time according to given datetime format key', () => {
            expect(formatters.dateTime(new Date(Date.UTC(2022, 7, 22, 3, 50)), 'shortDatetime')).toBe(
                '8/22/2022, 5:50 AM'
            );
        });

        it('should format date/time according to given datetime format key and selected locale', () => {
            formatters.setLocale('cs');

            expect(formatters.dateTime(new Date(Date.UTC(2022, 7, 22, 3, 50)), 'shortDatetime')).toBe(
                '22. 8. 2022 5:50'
            );
        });

        it('should throw an error if given datetime format is not found', () => {
            expect(() => {
                formatters.dateTime(new Date(), 'fooFormat');
            }).toThrowError();
        });
    });

    describe('relativeTime()', () => {
        it('should use default relative time format if no relative time format key is given', () => {
            expect(formatters.relativeTime(-1, 'second')).toBe('1 second ago');
        });

        it('should format relative time according to given relative time format key', () => {
            expect(formatters.relativeTime(-1, 'second', 'short')).toBe('1 sec. ago');
        });

        it('should format relative time according to given relative time format key and selected locale', () => {
            formatters.setLocale('cs');

            expect(formatters.relativeTime(-1, 'second')).toBe('před 1 sekundou');
        });

        it('should throw an error if given datetime format is not found', () => {
            expect(() => {
                formatters.relativeTime(-1, 'second', 'fooFormat');
            }).toThrowError();
        });
    });

    describe('fromNow()', () => {
        it('should format relative time from now with default format', () => {
            vi.setSystemTime(new Date(Date.UTC(2022, 7, 23, 3)));

            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 59, 59)))).toBe('1 second ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 59, 57)))).toBe('3 seconds ago');

            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 59, 0)))).toBe('1 minute ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 58, 30)))).toBe('1 minute ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 58, 0)))).toBe('2 minutes ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 57, 55)))).toBe('2 minutes ago');

            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 2, 0, 0)))).toBe('1 hour ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 1, 30, 0)))).toBe('1 hour ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 1, 0, 0)))).toBe('2 hours ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 0, 55, 0)))).toBe('2 hours ago');

            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 22, 3, 0, 0)))).toBe('1 day ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 22, 2, 0, 0)))).toBe('1 day ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 21, 3, 0, 0)))).toBe('2 days ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 21, 1, 0, 0)))).toBe('2 days ago');

            expect(formatters.fromNow(new Date(Date.UTC(2022, 6, 23, 3, 0, 0)))).toBe('1 month ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 6, 22, 3, 0, 0)))).toBe('1 month ago');
            expect(formatters.fromNow(new Date(Date.UTC(2022, 5, 22, 3, 0, 0)))).toBe('2 months ago');

            expect(formatters.fromNow(new Date(Date.UTC(2021, 7, 23, 3, 0, 0)))).toBe('1 year ago');
            expect(formatters.fromNow(new Date(Date.UTC(2021, 6, 23, 3, 0, 0)))).toBe('1 year ago');
            expect(formatters.fromNow(new Date(Date.UTC(2020, 7, 23, 3, 0, 0)))).toBe('2 years ago');
            expect(formatters.fromNow(new Date(Date.UTC(2020, 6, 23, 3, 0, 0)))).toBe('2 years ago');
        });

        it('should format relative time from now with given relative time format key', () => {
            vi.setSystemTime(new Date(Date.UTC(2022, 7, 23, 1)));

            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 0, 59, 0)), 'short')).toBe('1 min. ago');
        });

        it('should format relative time from now with given relative time format key and selected locale', () => {
            vi.setSystemTime(new Date(Date.UTC(2022, 7, 23, 1)));

            formatters.setLocale('cs');

            expect(formatters.fromNow(new Date(Date.UTC(2022, 7, 23, 0, 59, 0)))).toBe('před 1 minutou');
        });
    });

    describe('number()', () => {
        it('should use default number format if no number format key is given', () => {
            expect(formatters.number(123456.789)).toBe('123,456.789');
        });

        it('should round number to the given maximum fraction digits', () => {
            expect(formatters.number(123456.789, 1)).toBe('123,456.8');
        });

        it('should format number according to given number format key', () => {
            expect(formatters.number(123456.789, null, 'myNumber')).toBe('+123,456.79');
        });

        it('should format number according to given number format key and selected locale', () => {
            formatters.setLocale('cs');

            expect(formatters.number(123456.789)).toBe('123 456,789');
        });

        it('should throw an error if given number format is not found', () => {
            expect(() => {
                formatters.number(123456.789, null, 'fooFormat');
            }).toThrowError();
        });
    });

    describe('currency()', () => {
        it('should use default currency format if no currency format key is given', () => {
            expect(formatters.currency(123456.789)).toBe('$123,456.79');
        });

        it('should format currency according to given currency format key', () => {
            expect(formatters.currency(123456.789, 'EUR', 'myCurrency')).toBe('+€123,456.79');
        });

        it('should format currency according to given currency format key and selected locale', () => {
            formatters.setLocale('cs');

            expect(formatters.currency(123456.789, 'EUR')).toBe('123 456,79 €');
        });

        it('should throw an error if given currency format is not found', () => {
            expect(() => {
                formatters.currency(123456.789, 'EUR', 'fooFormat');
            }).toThrowError();
        });

        it('should be able to set default currency', () => {
            formatters.setDefaulCurrency('EUR');

            expect(formatters.currency(123456.789)).toBe('€123,456.79');
        });
    });

    describe('adding custom formats to prototype', () => {
        it('should add custom formats to prototype if `addCustomFormatsToPrototype` option is true', () => {
            destroyFormatters();
            formatters = new Formatters();
            formatters.setup({
                addCustomFormatsToPrototype: true,
                numberFormats: {
                    EUR: {
                        style: 'currency',
                        currency: 'EUR',
                    },
                },
                relativeTimeFormats: {
                    relativeTimeShort: {
                        style: 'short',
                    },
                },
            });

            expect(formatters.EUR(123456.789)).toBe('€123,456.789');
            expect(formatters.EUR(123456.789, 1)).toBe('€123,456.8');
            expect(formatters.relativeTimeShort(-1, 'second')).toBe('1 sec. ago');
        });

        it('should throw an error if custom format name collides with one existing in prototype', () => {
            destroyFormatters();
            formatters = new Formatters();

            expect(() => {
                formatters.setup({
                    addCustomFormatsToPrototype: true,
                    numberFormats: {
                        number: {
                            maximumFractionDigits: 2,
                        },
                    },
                });
            }).toThrowError();
        });
    });
});

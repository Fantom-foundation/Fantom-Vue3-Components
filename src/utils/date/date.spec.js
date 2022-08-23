import { describe, it, expect } from 'vitest';
import { getDatesDiff, timestampToSeconds, timestampToMilliseconds } from '@/utils/date/date.js';

describe('date utils', () => {
    describe('getDatesDiff()', () => {
        it('should return difference between two dates in milliseconds', () => {
            const date1 = new Date(Date.UTC(2022, 7, 23, 1, 0, 0));
            const date2 = new Date(Date.UTC(2022, 7, 23, 2, 0, 0));

            expect(getDatesDiff(date1, date2)).toBe(-3600000);
            expect(getDatesDiff(date2.valueOf(), date1)).toBe(3600000);
        });
    });

    describe('timestampToSeconds()', () => {
        it('should leave given timestamp as is if it is already in seconds', () => {
            expect(timestampToSeconds(1653488111)).toBe(1653488111);
            expect(timestampToSeconds(16534881110)).toBe(16534881110);
        });

        it('should convert given timestamp to seconds if it is in milliseconds', () => {
            expect(timestampToSeconds(1653488111000)).toBe(1653488111);
            expect(timestampToSeconds(16534881110000)).toBe(16534881110);
        });

        it('should convert given timestamp to seconds if it is in microseconds', () => {
            expect(timestampToSeconds(1653488111000000)).toBe(1653488111);
            expect(timestampToSeconds(16534881110000000)).toBe(16534881110);
        });
    });

    describe('timestampToMilliseconds()', () => {
        it('should leave given timestamp as is if it is already in milliseconds', () => {
            expect(timestampToMilliseconds(1653488111000)).toBe(1653488111000);
            expect(timestampToMilliseconds(16534881110000)).toBe(16534881110000);
        });

        it('should convert given timestamp to milliseconds if it is in seconds', () => {
            expect(timestampToMilliseconds(1653488111)).toBe(1653488111000);
            expect(timestampToMilliseconds(16534881110)).toBe(16534881110000);
        });

        it('should convert given timestamp to milliseconds if it is in microseconds', () => {
            expect(timestampToMilliseconds(1653488111000000)).toBe(1653488111000);
        });
    });
});

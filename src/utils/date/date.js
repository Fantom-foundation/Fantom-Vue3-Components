export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * @param {Date|number|string} date
 * @return {Date}
 */
export function getDate(date) {
    return new Date(date);
}

/**
 * @param {Date|number|string} date1
 * @param {Date|number|string} date2
 * @return {number}
 */
export function getDatesDiff(date1, date2) {
    const d1 = getDate(date1);
    const d2 = getDate(date2);

    return d1.valueOf() - d2.valueOf();
}

/**
 * @param {number} timestamp
 * @return {number}
 */
export function timestampToSeconds(timestamp) {
    let ts = timestamp;

    if (ts >= 1e15) {
        ts = Math.floor(ts / 1000000);
    } else if (ts >= 1e12) {
        ts = Math.floor(ts / 1000);
    }

    return ts;
}

/**
 * @param {number} timestamp
 * @return {number}
 */
export function timestampToMilliseconds(timestamp) {
    let ts = timestamp;

    if (ts >= 1e15) {
        ts = Math.floor(ts / 1000);
    } else if (ts < 1e12) {
        ts *= 1000;
    }

    return ts;
}

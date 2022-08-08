import { vi } from 'vitest';

/**
 * @param {function|string} value
 * @return {SpyInstance<[], (WorkerNavigator | Navigator)[string]>}
 */
export function spyNavigatorLanguage(value) {
    return vi
        .spyOn(navigator, 'language', 'get')
        .mockImplementation(() => (typeof value === 'function' ? value() : value));
}

/**
 * @param {function|array} value
 * @return {SpyInstance<[], (WorkerNavigator | Navigator)[string]>}
 */
export function spyNavigatorLanguages(value) {
    return vi
        .spyOn(navigator, 'languages', 'get')
        .mockImplementation(() => (typeof value === 'function' ? value() : value));
}

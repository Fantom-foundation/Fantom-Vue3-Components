import jazzicon from './jazzicon-bundle.js';

/**
 * Keys are user addresses + diameters, values are jazzicons - svg
 */
const jazziconsCache = {};

/**
 * @param {string} address
 * @param {number} [diameter]
 * @return {string}
 */
export function getJazzicon(address, diameter = 24) {
    const key = address ? `${address.toLowerCase()}_${diameter}` : '';

    if (!key) {
        return '';
    }

    if (!(key in jazziconsCache)) {
        jazziconsCache[key] = jazzicon(diameter, parseInt(address.slice(2, 10), 16)).outerHTML;
    }

    return jazziconsCache[key];
}

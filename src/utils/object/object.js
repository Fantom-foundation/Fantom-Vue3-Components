/**
 * @param {Object} object
 * @param {Object} expected Keys are expected property names, values are expected property types
 * @return {{key: string, errType: 'missing'|'bad_type'}[]} Errors
 */
export function checkObjectProperties(object = {}, expected = {}) {
    const errors = [];

    Object.keys(expected).forEach((key) => {
        if (!(key in object)) {
            errors.push({
                key,
                errType: 'missing',
            });
        } else {
            const expectedType = expected[key].toLowerCase();
            const value = object[key];
            let badType = false;

            if (value === null) {
                badType = true;
            } else if (expectedType === 'array') {
                badType = !Array.isArray(value);
            } else {
                badType = typeof value !== expectedType;
            }

            if (badType) {
                errors.push({
                    key,
                    errType: 'bad_type',
                });
            }
        }
    });

    return errors;
}

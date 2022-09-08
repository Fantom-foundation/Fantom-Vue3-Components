/**
 * @param {Object} classOrInstance
 * @param {Array} interf
 * @return {boolean}
 */
export function implementsInterface(classOrInstance, interf = []) {
    const notFound = [];
    const isClass = !!classOrInstance.prototype;

    interf.forEach((item) => {
        const isProperty = item.includes(':property');
        const name = isProperty ? item.split(':')[0] : item;

        if (isClass) {
            if (
                !isProperty &&
                typeof classOrInstance.prototype[name] !== 'function' &&
                typeof classOrInstance[name] !== 'function'
            ) {
                notFound.push(name);
            }
        } else {
            if (isProperty) {
                if (typeof classOrInstance[name] === 'undefined' || typeof classOrInstance[name] === 'function') {
                    notFound.push(name);
                }
            } else {
                if (typeof classOrInstance[name] !== 'function') {
                    notFound.push(name);
                }
            }
        }
    });

    if (notFound.length > 0) {
        throw new Error(`Class ${classOrInstance.name} must implement methods: ${notFound.join(', ')}`);
    }

    return true;
}

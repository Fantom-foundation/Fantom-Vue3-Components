function getMissingMethods(InterfaceClass, classInstance) {
    const missingMethods = [];

    if (classInstance) {
        const InterfaceClassMethods = Object.getOwnPropertyNames(InterfaceClass.prototype);
        InterfaceClassMethods.forEach((method) => {
            if (method !== 'constructor' && !classInstance[method]) {
                missingMethods.push(method);
            }
        });
    }

    return missingMethods;
}

function getMissingStaticMethods(InterfaceClass, Class) {
    const missingStaticMethods = [];

    const InterfaceClassStaticMethods = Object.getOwnPropertyNames(InterfaceClass).filter(
        (prop) => typeof InterfaceClass[prop] === 'function'
    );
    InterfaceClassStaticMethods.forEach((method) => {
        if (!Class[method]) {
            missingStaticMethods.push(`static ${method}`);
        }
    });

    return missingStaticMethods;
}

function getErrorMessage(Class, missingMethods) {
    return `The following methods are not implemented in the ${Class.name} class : ${missingMethods.join(', ')}`;
}

function alreadyChecked(Class) {
    let checked = !!Class.__interface_checked__;

    if (!checked) {
        Class.__interface_checked__ = true;
    }

    return checked;
}
function checkInterface(InterfaceClass, ClassInstance, Class) {
    const missingMethods = [
        ...getMissingMethods(InterfaceClass, ClassInstance),
        ...getMissingStaticMethods(InterfaceClass, Class),
    ];

    if (missingMethods.length > 0) {
        throw new Error(getErrorMessage(Class, missingMethods));
    }
}

/**
 * Check if interface (defined by a class) is implemented on class of instance of a class
 *
 * @param {Object} InterfaceClass
 * @param {Object} Class
 * @param {Object} [ClassInstance]
 */
export function implementsInterface(InterfaceClass, Class, ClassInstance) {
    if (!alreadyChecked(Class)) {
        checkInterface(InterfaceClass, ClassInstance, Class);
    }
}

/**
 * Mixin
 *
 * @param {Object} InterfaceClass
 * @param {Object} BaseClass
 * @return {{new(): {}, prototype: {}}}
 * @constructor
 */
export const Implements = (InterfaceClass, BaseClass) =>
    class extends (BaseClass || class {}) {
        constructor() {
            super();

            implementsInterface(InterfaceClass, this.constructor, this);
        }
    };

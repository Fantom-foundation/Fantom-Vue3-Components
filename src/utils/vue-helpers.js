import { getDefaultValue, getUniqueId } from './index.js';
import { nextTick } from 'vue';

export function getComponentName(_component) {
    return _component ? _component?.type?.name || _component?.$?.type?.name : '';
}

/**
 * @param {Object} obj
 * @param {string} action
 * @param {*} value
 * @return {Promise<unknown>}
 */
export function actionHandler(obj, action, value) {
    return new Promise((resolve) => {
        if (action in obj) {
            if (action === 'getState') {
                obj.states = [];
            }

            obj[action] = value;

            nextTick(() => {
                resolve();

                obj[action] = getDefaultValue(value);
            });
        }
    });
}

/**
 * Call function and wait for the next tick.
 *
 * @param {Function} fn
 * @return {Promise<unknown>}
 */
export function callAndWait(fn) {
    return new Promise((resolve) => {
        if (typeof fn === 'function') {
            fn();
        }

        nextTick(() => {
            resolve();
        });
    });
}

/**
 * @param {Object} component Vue component
 * @param {string} parentName
 * @return {Object|null} Vue component or null
 */
export function findParentByName(component, parentName) {
    let parent = component ? component.$parent : null;

    while (parent) {
        if (getComponentName(parent) === parentName) {
            return parent;
        }

        parent = parent.$parent;
    }

    return null;
}

export function valueOrNull(value) {
    return !value ? null : value;
}

/**
 * Generate unique id if there is no 'id' property in object.
 *
 * @param {Object[]} _items
 * @param {string} [_key]
 */
export function setIds(_items, _key = 'id') {
    let item;

    if (_items && _items.length) {
        for (let i = 0, len1 = _items.length; i < len1; i += 1) {
            item = _items[i];
            if (!(_key in item) || item[_key] === null) {
                item[_key] = getUniqueId();
            }
        }
    }
}

/**
 * Copy component's methods.
 *
 * @param {Object} component Vue component
 * @param {string[]} methods
 * @param {string} refName
 * @return {Object} Keys are method names, values are functions
 */
export function copyMethods(component, methods, refName = '') {
    const cMethods = {};
    const compMethods = component.methods;

    if (compMethods && methods) {
        methods.forEach((methodName) => {
            if (methodName in compMethods) {
                if (refName) {
                    cMethods[methodName] = function (...args) {
                        // this.$refs[refName][methodName](...args);
                        const ref = this.$refs[refName];

                        if (ref) {
                            compMethods[methodName].apply(ref, args);
                        }
                    };
                } else {
                    cMethods[methodName] = compMethods[methodName];
                }
            }
        });
    }

    return cMethods;
}

/**
 * Copy component's properties.
 *
 * @param {Object} component Vue component
 * @param {Object} props Keys are prop names, values are default values or null (default value won't be set)
 * @return {Object} Keys are prop names, values prop definition objects
 */
export function copyProps(component, props = {}) {
    const cProps = {};
    const compProps = component.props;

    if (compProps) {
        Object.keys(props).forEach((propName) => {
            const prop = props[propName];

            if (propName in compProps) {
                cProps[propName] = { ...compProps[propName] };

                if (prop !== null) {
                    // cProps[propName].default = clone(prop);
                    cProps[propName].default = prop;
                }
            }
        });
    }

    return cProps;
}

/**
 * Check for non-empty slot existence.
 *
 * @param {Object} component Vue component
 * @param {string} name
 * @return {boolean}
 */
export function hasSlot(component, name = 'default') {
    // return !!this.$slots[_name] || (this.$scopedSlots && !!this.$scopedSlots[_name]);
    return !!component.$slots[name];
}

/**
 * @param {Object} _component Vue component
 * @param {function} _callback
 * @return {boolean}
 */
/*
export function traverseVueTree(_component, _callback) {
    const children = _component.$slots ? _component.$slots.default() : null;
    let child;
    let goOn = true;

    if (children && children.length > 0) {
        for (let i = 0, len = children.length; i < len; i++) {
            child = children[i];

            if (_callback(child)) {
                goOn = traverseVueTree(child, _callback);
            } else {
                goOn = false;
                break;
            }
        }
    }

    return goOn;
}
*/

/**
 * Check the subtree of the vue component tree with the root `_startComponent`, if a component has `isChanged` method
 * and if it returns `true`.
 *
 * @param {Object} _startComponent Vue component
 * @param {Object} _messages Kyes are component names in kebab case, values are messages.
 * @param {boolean} [_noConfirmation] If `true`, no confirmation prompt will be raised
 * @returns {boolean|string} Wether to continue with an action or not.
 */
/*
export function isAnyComponentChanged(_startComponent, _messages = {}, _noConfirmation = false) {
    let changedComponentName = '';

    traverseVueTree(_startComponent, (_component) => {
        if ('isChanged' in _component && typeof _component.isChanged === 'function' && _component.isChanged()) {
            changedComponentName = getComponentName(_component);
            return false;
        }

        return true;
    });

    if (changedComponentName) {
        if (!_noConfirmation) {
            return !confirm(_messages[changedComponentName]);
        } else {
            return _messages[changedComponentName];
        }
    }

    return !!changedComponentName;
}
*/

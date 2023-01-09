import { onUnmounted } from 'vue';

const methodsStore = {};

/**
 * Stores methods of a vue component by id for later usage in another vue component
 *
 * @param {string} id
 * @param {boolean} [registrar] Registrar calling this method
 * @param {boolean} [usedOutsideOfComponent] Set it to `true` if you use this function outside of a component
 * @return {{getMethods(): *, registerMethods: register}|*|{}}
 */
export function useMethods(id = '', registrar = false, usedOutsideOfComponent = false) {
    function registerMethods(methods) {
        if (!(id in methodsStore)) {
            methodsStore[id] = methods;
        }
    }

    function unregisterMethods(id) {
        delete methodsStore[id];
    }

    if (registrar && !usedOutsideOfComponent) {
        onUnmounted(() => {
            unregisterMethods(id);
        });
    }

    return {
        registerMethods,
        unregisterMethods,
        getMethods() {
            return methodsStore[id] || {};
        },
    };
}

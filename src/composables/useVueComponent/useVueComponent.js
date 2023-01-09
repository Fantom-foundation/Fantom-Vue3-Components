import { useMethods } from '../index.js';

/**
 * Use methods of a Vue component with given id
 *
 * @param {string} id Component id
 * @return {{}|(function(...[*]): *)}
 */
export function useVueComponent(id) {
    return new Proxy(
        {},
        {
            get(target, prop) {
                return function (...args) {
                    const method = useMethods(id).getMethods()[prop];

                    if (typeof method !== 'function') {
                        throw new Error(`Method '${prop}' doesn't exists for the component with the id '${id}'`);
                    }

                    return method(...args);
                };
            },
        }
    );
}

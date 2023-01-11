/**
 * Stores async vue components by name
 */
export class AsyncComponents {
    static #components = {};

    static register(componentName, asyncComponent) {
        AsyncComponents.#components[componentName] = asyncComponent;
    }

    static registerComponents(components) {
        AsyncComponents.#components = { ...AsyncComponents.#components, ...components };
    }

    static get(componentName) {
        return AsyncComponents.#components[componentName];
    }
}

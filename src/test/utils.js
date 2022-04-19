/**
 * Utility functions for testing
 */

import { createApp } from 'vue';

export function withSetup({ composable = null } = {}) {
    let composableResult = {};

    const app = createApp({
        setup() {
            if (typeof composable === 'function') {
                composableResult = composable();
            }
            // suppress missing template warning
            return () => {};
        },
    });

    app.mount(document.createElement('div'));

    return { composableResult, app };
}

/**
 * @param {function} func Function to be called
 * @param {int} [n] Number of calls
 * @param {int} [interval] Time span between two calls in milliseconds
 * @return {Promise<unknown>}
 */
export function callFunctionNTimes(func, n = 3, interval = 25) {
    return new Promise((resolve) => {
        let counter = n;
        const intervalId = setInterval(() => {
            if (counter-- <= 0) {
                clearInterval(intervalId);
                resolve();
            } else {
                func();
            }
        }, interval);
    });
}

/**
 * Disable console error messages.
 *
 * @param {function} func
 */
export function disableErrorMessages(func) {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = () => {};
    console.warn = () => {};

    func();

    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
}

/**
 * Playground for testing v-model of a Vue component.
 *
 * @param {Vue} component
 * @param {Object} data
 * @return {{dValue}|{template: `<${string} v-model="dValue" ${string} />`, components: {}, data(): {dValue: *}, props: string[]}}
 */
export function getVModelComponent(component, data = {}, prop = 'value') {
    const componentName = component.name;
    let attributes = [];

    Object.keys(data).forEach((key) => {
        attributes.push(`:${key}="${key}"`);
    });

    return {
        components: { [componentName]: component },
        template: `<${componentName} v-model:${prop}="dValue" ${attributes.join(' ')} />`,
        props: [prop],
        data() {
            return {
                dValue: this[prop],
                ...data,
            };
        },
    };
}

/**
 * @param {Object} wrapper
 */
export function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.unmount();
        wrapper = null;
    }
}

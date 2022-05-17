import { useStorage as _useStorage } from '@vueuse/core';

export class StoreUtils {
    constructor(namespace) {
        this.namespace = namespace;

        if (!this.namespace) {
            throw new Error('No namespace is given');
        }
    }

    getNamespace() {
        return this.namespace;
    }

    getStorageKey(key) {
        return `${this.namespace}-${key}`;
    }

    useInLocalStorage(key, initialValue) {
        return {
            [key]: this.useStorage(key, initialValue, 'local'),
        };
    }

    useInSessionStorage(key, initialValue) {
        return {
            [key]: this.useStorage(key, initialValue, 'session'),
        };
    }

    useStorage(key, initialValue, storageType = 'local') {
        return _useStorage(
            this.getStorageKey(key),
            initialValue,
            storageType === 'session' ? window.sessionStorage : null
        );
    }
}

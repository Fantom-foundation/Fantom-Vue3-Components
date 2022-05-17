import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StoreUtils } from './StoreUtils.js';

let store = null;

beforeEach(() => {
    store = new StoreUtils('namespace');
});

vi.mock('@vueuse/core', () => {
    return {
        useStorage: vi.fn(),
    };
});

describe('StoreUtils', () => {
    it('should save storage namespace', () => {
        expect(store.getNamespace()).toBe('namespace');
    });

    it('should throw an error if no storage namespace is given', () => {
        expect(() => {
            new StoreUtils();
        }).toThrowError();
    });

    it('should get storage key with namespace', () => {
        expect(store.getStorageKey('key')).toBe('namespace-key');
    });

    it('should return object with reactive value that is stored in local storage when set', () => {
        expect(JSON.stringify(store.useInLocalStorage('key', ''))).toBe(
            JSON.stringify({ key: store.useStorage('key', '', 'local') })
        );
    });

    it('should return object with reactive value that is stored in local session when set', () => {
        expect(JSON.stringify(store.useInSessionStorage('key', ''))).toBe(
            JSON.stringify({ key: store.useStorage('key', '', 'session') })
        );
    });
});

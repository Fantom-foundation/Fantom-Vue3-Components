import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useLanguage } from './useLanguage.js';
import { Language } from '@/plugins/Language/Language.js';

let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useLanguage() });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useLanguage', () => {
    it('should return instance of Language class', () => {
        expect(composableResult.language).toBeInstanceOf(Language);
    });
});

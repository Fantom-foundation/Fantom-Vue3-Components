import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useLocale } from '@/composables/useLocale/useLocale.js';
import { Locale } from '@/plugins/Locale/Locale.js';

let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useLocale() });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useLocale', () => {
    it('should return instance of Locale class', () => {
        expect(composableResult.locale).toBeInstanceOf(Locale);
    });
});

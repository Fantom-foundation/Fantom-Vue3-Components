import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useFormatters } from './useFormatters.js';
import { Formatters } from '@/plugins/index.js';

let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useFormatters() });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useFormatters', () => {
    it('should return instance of Formatters class', () => {
        expect(composableResult.formatters).toBeInstanceOf(Formatters);
    });
});

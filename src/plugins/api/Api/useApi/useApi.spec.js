import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useApi } from './useApi.js';
import { Api } from '../Api.js';

let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useApi() });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useApi', () => {
    it('should return instance of Api class', () => {
        expect(composableResult.api).toBeInstanceOf(Api);
    });
});

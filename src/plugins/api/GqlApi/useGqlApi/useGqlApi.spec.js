import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useGqlApi } from './useGqlApi.js';
import { GqlApi } from '../GqlApi.js';

let composableResult = null;
let app = null;

beforeEach(() => {
    const result = withSetup({ composable: () => useGqlApi() });
    composableResult = result.composableResult;
    app = result.app;
});

afterEach(() => {
    app.unmount();
    composableResult = null;
    app = null;
});

describe('useGqlApi', () => {
    it('should return', () => {
        expect(composableResult.gqlApi).toBeInstanceOf(GqlApi);
    });
});

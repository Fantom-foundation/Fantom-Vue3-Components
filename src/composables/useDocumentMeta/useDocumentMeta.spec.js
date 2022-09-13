import { describe, it, expect } from 'vitest';
import { withSetup } from '@/test/utils.js';
import { useDocumentMeta } from './useDocumentMeta.js';
import { DocumentMeta } from '@/plugins/index.js';

describe('useDocumentMeta', () => {
    it('should return instance of DocumentMeta', () => {
        const { composableResult, app } = withSetup({ composable: () => useDocumentMeta({ pageInfo: {} }) });

        expect(composableResult.documentMeta instanceof DocumentMeta).toBe(true);

        app.unmount();
    });
});

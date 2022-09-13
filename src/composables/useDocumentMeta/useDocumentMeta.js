import { DocumentMeta } from '../../plugins/DocumentMeta/DocumentMeta.js';

const documentMeta = new DocumentMeta();

export function useDocumentMeta() {
    return {
        documentMeta,
    };
}

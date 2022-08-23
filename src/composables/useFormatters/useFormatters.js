import { Formatters } from '../../plugins/index.js';

const formatters = new Formatters();

export function useFormatters() {
    return { formatters };
}

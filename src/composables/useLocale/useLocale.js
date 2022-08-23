import { Locale } from '../../plugins/index.js';

const locale = new Locale();

export function useLocale() {
    return { locale };
}

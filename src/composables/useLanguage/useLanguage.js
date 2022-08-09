import { Language } from '../../plugins/Language/Language.js';

const language = new Language();

export function useLanguage() {
    return { language };
}

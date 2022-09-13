export class DocumentMeta {
    constructor({ mainTitle = '' } = {}) {
        this.mainTitle = mainTitle;
    }

    /**
     * @param {string|array} title
     * @param {boolean} [addMainTitle] Add main title at the end of the title
     */
    setTitle(title, addMainTitle = false) {
        let t = '';

        if (title !== undefined) {
            if (Array.isArray(title)) {
                t = title.map((str) => str.trim()).join(' | ');
            } else {
                t = title;
            }

            if (addMainTitle && this.mainTitle) {
                t += t !== '' ? ` | ${this.mainTitle}` : this.mainTitle;
            }

            document.title = t;
            DocumentMeta.#setMetaContentAttribute('og:title', t);
            DocumentMeta.#setMetaContentAttribute('twitter:title', t);
        }
    }

    /**
     * @param {string} description
     */
    setDescription(description) {
        if (description !== undefined) {
            DocumentMeta.#setMetaContentAttribute('og:description', description);
            DocumentMeta.#setMetaContentAttribute('twitter:description', description);
        }
    }

    /**
     * @param {string} mainTitle
     */
    setMainTitle(mainTitle = '') {
        this.mainTitle = mainTitle;
    }

    /**
     * @return {string[]}
     */
    getSplittedTitle() {
        return document.title.split('|').map((title) => title.trim());
    }

    /**
     * @param {string} property
     * @param {string} value
     */
    static #setMetaContentAttribute(property, value = '') {
        if (property) {
            const elem = document.querySelector(`meta[property="${property}"]`);
            if (elem) {
                elem.setAttribute('content', value);
            }
        }
    }
}

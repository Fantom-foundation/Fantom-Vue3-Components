import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DocumentMeta } from './DocumentMeta.js';

let dm = null;
const TEST_TITLE = 'Test title';
const TEST_DESCRIPTION = 'Test description';

function createMetaElement(property = '', content = '') {
    const elem = document.createElement('meta');

    if (property) {
        elem.setAttribute('property', property);
    }

    if (content) {
        elem.setAttribute('content', content);
    }

    return elem;
}

beforeEach(() => {
    dm = new DocumentMeta();
});

afterEach(() => {
    dm = null;
});

describe('DocumentMeta', () => {
    it('should set html document title', () => {
        dm.setTitle(TEST_TITLE);

        expect(document.title).toEqual(TEST_TITLE);
    });

    it('should set og and twitter meta title', () => {
        const ogMetaTitle = createMetaElement('og:title');
        const twitterMetaTitle = createMetaElement('twitter:title');

        document.head.appendChild(ogMetaTitle);
        document.head.appendChild(twitterMetaTitle);

        dm.setTitle(TEST_TITLE);

        expect(ogMetaTitle.getAttribute('content')).toEqual(TEST_TITLE);
        expect(twitterMetaTitle.getAttribute('content')).toEqual(TEST_TITLE);

        ogMetaTitle.remove();
        twitterMetaTitle.remove();
    });

    it('should set og and twitter meta description', () => {
        const ogMetaDescription = createMetaElement('og:description');
        const twitterMetaDescription = createMetaElement('twitter:description');

        document.head.appendChild(ogMetaDescription);
        document.head.appendChild(twitterMetaDescription);

        dm.setDescription(TEST_DESCRIPTION);

        expect(ogMetaDescription.getAttribute('content')).toEqual(TEST_DESCRIPTION);
        expect(twitterMetaDescription.getAttribute('content')).toEqual(TEST_DESCRIPTION);

        ogMetaDescription.remove();
        twitterMetaDescription.remove();
    });

    it('should set title by given array and display it separated with `|`', () => {
        dm.setTitle([' part1 ', 'part2']);

        expect(document.title).toEqual('part1 | part2');
    });

    it('should add main title at the end of the title, separated by `|`', () => {
        const mainTitle = 'MyApp';

        dm = new DocumentMeta({ mainTitle });

        dm.setTitle(TEST_TITLE, true);
        expect(document.title).toEqual(`${TEST_TITLE} | ${mainTitle}`);

        dm.setTitle('', true);
        expect(document.title).toEqual(`${mainTitle}`);
    });

    it('should be able to set main title', () => {
        const mainTitle = 'MyApp';

        dm.setMainTitle(mainTitle);
        dm.setTitle(TEST_TITLE, true);

        expect(document.title).toEqual(`${TEST_TITLE} | ${mainTitle}`);
    });

    it('should get current title splitted by `|`', () => {
        dm.setTitle(`${TEST_TITLE} | ${TEST_TITLE}`);

        expect(dm.getSplittedTitle()).toEqual([TEST_TITLE, TEST_TITLE]);
    });
});

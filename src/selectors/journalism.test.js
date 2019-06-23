
import {
  selectJournalismArticles,
  selectJournalismArticlesReverse,
  filterJournalismArticlesArticle,
  selectJournalismArticlesArticle,
  selectSelectedJournalismArticle,
  selectSelectedJournalismArticleTitle,
  selectSelectedJournalismArticleCopy,
  selectSelectedJournalismArticleExternalLink,
  selectSelectedJournalismArticleMainImageUrl,
  selectSelectedJournalismArticleReleaseDate,
} from './journalism';

const mockArticles = [
  {
    _id: 'xcxcxcxcxccx1234',
    title: 'hello',
    createdAt: new Date(),
    mainBody: '<p>test</p>',
  },
  {
    _id: 'asdf1234',
    title: 'hi',
    createdAt: new Date(),
    mainBody: '<p>hello world</p>',
    miniGallery: ['asdf', 'asdf', 'asdf'],
    socialShare: {
      hashtags: ['something', 'somethingElse']
    },
    mainImageUrl: 'http://something/test.jpg'
  },
  {
    _id: 'zxcv789',
    title: 'crazy',
    createdAt: new Date(),
    mainBody: '<p>testing</p>',
    miniGallery: ['asdf', 'asdf', 'asdf'],
    socialShare: {
      hashtags: ['something', 'somethingElse']
    }
  }
];

const mockState = {
  journalism: {
    articles: mockArticles
  },
  selectedJournalismArticle: mockArticles[1]
};

describe('(Selectors) journalism', () => {
  const articleId = 'asdf1234';

  describe('selectJournalismArticles', () => {
    it('should return articles', () => {
      const actual = selectJournalismArticles(mockState);
      expect(actual).to.deep.equal(mockState.journalism.articles);
    });
  });

  describe('selectJournalismArticlesReverse', () => {
    it('should return articles in reverse', () => {
      const actual = selectJournalismArticlesReverse(mockState);
      expect(actual).to.deep.equal(mockState.journalism.articles.reverse());
    });
  });

  describe('filterJournalismArticlesArticle', () => {
    it('should filter articles by id', () => {
      const actual = filterJournalismArticlesArticle(mockState, articleId);
      const expected = mockState.journalism.articles.filter(p => p._id === articleId);
      expect(actual).to.deep.eq(expected);
    });
  });

  describe('selectJournalismArticlesArticle', () => {
    it('should return article by id', () => {
      const actual = selectJournalismArticlesArticle(mockState, articleId);
      const filtered = mockState.journalism.articles.filter(p => p._id === articleId);
      const expected = filtered[0];
      expect(actual).to.deep.eq(expected);
    });
  });

  describe('selectSelectedJournalismArticle', () => {
    it('should return selected/active article', () => {
      const actual = selectSelectedJournalismArticle(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle);
    });
  });

  describe('selectSelectedJournalismArticleTitle', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedJournalismArticleTitle(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.title);
    });
  });

  describe('selectSelectedJournalismArticleCopy', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedJournalismArticleCopy(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.copy);
    });
  });

  describe('selectSelectedJournalismArticleExternalLink', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedJournalismArticleExternalLink(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.externalLink);
    });
  });

  describe('selectSelectedJournalismArticleMainImageUrl', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedJournalismArticleMainImageUrl(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.mainImageUrl);
    });
  });

  describe('selectSelectedJournalismArticleReleaseDate', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedJournalismArticleReleaseDate(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.releaseDate);
    });
  });

});

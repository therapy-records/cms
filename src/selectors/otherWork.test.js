
import {
  selectOtherWorkArticles,
  selectOtherWorkArticlesReverse,
  filterOtherWorkArticlesArticle,
  selectOtherWorkArticlesArticle,
  selectSelectedOtherWorkArticle,
  selectSelectedOtherWorkArticleTitle,
  selectSelectedOtherWorkArticleCopy,
  selectSelectedOtherWorkArticleExternalLink,
  selectSelectedOtherWorkArticleMainImageUrl,
  selectSelectedOtherWorkArticleReleaseDate,
} from './otherWork';

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
    mainImageUrl: 'http://something/test.jpg',
    quotes: [
      { quote: 'amazing!', author: 'joe bloggs' },
      { quote: 'yay!', author: 'someone' }
    ]
  },
  {
    _id: 'zxcv789',
    title: 'crazy',
    createdAt: new Date(),
    mainBody: '<p>testing</p>',
    miniGallery: ['asdf', 'asdf', 'asdf'],
    socialShare: {
      hashtags: ['something', 'somethingElse']
    },
    quotes: [
      { quote: 'amazing!', author: 'joe bloggs' },
      { quote: 'yay!', author: 'someone' }
    ]
  }
];

const mockState = {
  otherWork: {
    articles: mockArticles
  },
  selectedOtherWorkArticle: mockArticles[1]
};

describe('(Selectors) otherWork', () => {
  const articleId = 'asdf1234';

  describe('selectOtherWorkArticles', () => {
    it('should return articles', () => {
      const actual = selectOtherWorkArticles(mockState);
      expect(actual).to.deep.equal(mockState.otherWork.articles);
    });
  });

  describe('selectOtherWorkArticlesReverse', () => {
    it('should return articles in reverse', () => {
      const actual = selectOtherWorkArticlesReverse(mockState);
      expect(actual).to.deep.equal(mockState.otherWork.articles.reverse());
    });
  });

  describe('filterOtherWorkArticlesArticle', () => {
    it('should filter articles by id', () => {
      const actual = filterOtherWorkArticlesArticle(mockState, articleId);
      const expected = mockState.otherWork.articles.filter(p => p._id === articleId);
      expect(actual).to.deep.eq(expected);
    });
  });

  describe('selectOtherWorkArticlesArticle', () => {
    it('should return article by id', () => {
      const actual = selectOtherWorkArticlesArticle(mockState, articleId);
      const filtered = mockState.otherWork.articles.filter(p => p._id === articleId);
      const expected = filtered[0];
      expect(actual).to.deep.eq(expected);
    });
  });

  describe('selectSelectedOtherWorkArticle', () => {
    it('should return selected/active article', () => {
      const actual = selectSelectedOtherWorkArticle(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedOtherWorkArticle);
    });
  });

  describe('selectSelectedOtherWorkArticleTitle', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedOtherWorkArticleTitle(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedOtherWorkArticle.title);
    });
  });

  describe('selectSelectedOtherWorkArticleCopy', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedOtherWorkArticleCopy(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedOtherWorkArticle.copy);
    });
  });

  describe('selectSelectedOtherWorkArticleExternalLink', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedOtherWorkArticleExternalLink(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedOtherWorkArticle.externalLink);
    });
  });

  describe('selectSelectedOtherWorkArticleMainImageUrl', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedOtherWorkArticleMainImageUrl(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedOtherWorkArticle.mainImageUrl);
    });
  });

  describe('selectSelectedOtherWorkArticleReleaseDate', () => {
    it('should return selected/active article title', () => {
      const actual = selectSelectedOtherWorkArticleReleaseDate(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedOtherWorkArticle.releaseDate);
    });
  });

});

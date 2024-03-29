
import {
  selectJournalismHasFetched,
  selectJournalismEditSuccess,
  selectJournalismArticles,
  selectJournalismArticlesReverse,
  filterJournalismArticlesArticle,
  selectJournalismArticlesArticle,
  selectSelectedJournalismArticle,
  selectSelectedJournalismArticleTitle,
  selectSelectedJournalismArticleCopy,
  selectSelectedJournalismArticleExternalLink,
  selectSelectedJournalismArticleCategoryId,
  selectSelectedJournalismArticleImage,
  selectSelectedJournalismArticleReleaseDate
} from './journalism';

const mockArticles = [
  {
    _id: 'xcxcxcxcxccx1234',
    title: 'hello',
    createdAt: new Date(),
    image: {
      cloudinaryUrl: 'test1.jpg'
    },
    categoryId: 1
  },
  {
    _id: 'asdf1234',
    title: 'hi',
    createdAt: new Date(),
    image: {
      cloudinaryUrl: 'http://something/test.jpg',
      cloudinaryPublicId: '1234'
    },
    categoryId: 2
  },
  {
    _id: 'zxcv789',
    title: 'crazy',
    createdAt: new Date(),
    image: {
      cloudinaryUrl: 'http://something/test.jpg',
      cloudinaryPublicId: '1234'
    },
    categoryId: 3
  }
];

const mockState = {
  journalism: {
    articles: mockArticles,
    hasFetched: false,
    editSuccess: false
  },
  selectedJournalismArticle: mockArticles[1]
};

describe('(Selectors) journalism', () => {
  const articleId = 'asdf1234';

  describe('selectJournalismHasFetched', () => {
    it('should return articles', () => {
      const actual = selectJournalismHasFetched(mockState);
      expect(actual).to.deep.equal(mockState.journalism.hasFetched);
    });
  });

  describe('selectJournalismEditSuccess', () => {
    it('should return boolean', () => {
      const actual = selectJournalismEditSuccess(mockState);
      expect(actual).to.deep.equal(mockState.journalism.editSuccess);
    });
  });

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
    it('should return selected/active article copy', () => {
      const actual = selectSelectedJournalismArticleCopy(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.copy);
    });
  });

  describe('selectSelectedJournalismArticleExternalLink', () => {
    it('should return selected/active article externalLink', () => {
      const actual = selectSelectedJournalismArticleExternalLink(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.externalLink);
    });
  });

  describe('selectSelectedJournalismArticleCategoryId', () => {
    it('should return selected/active article externalLink', () => {
      const actual = selectSelectedJournalismArticleCategoryId(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.categoryId);
    });
  });

  describe('selectSelectedJournalismArticleImage', () => {
    it('should return selected/active article image object', () => {
      const actual = selectSelectedJournalismArticleImage(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.image);
    });
  });

  describe('selectSelectedJournalismArticleImage', () => {
    it('should return selected/active article imageUrl', () => {
      const actual = selectSelectedJournalismArticleImage(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.image);
    });
  });

  describe('selectSelectedJournalismArticleReleaseDate', () => {
    it('should return selected/active article releaseDate', () => {
      const actual = selectSelectedJournalismArticleReleaseDate(mockState, articleId);
      expect(actual).to.deep.eq(mockState.selectedJournalismArticle.releaseDate);
    });
  });
});

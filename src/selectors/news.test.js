
import {
  selectNewsArticles,
  selectNewsArticlesReverse,
  filterNewsArticlesArticle,
  selectNewsArticlesArticle,
  selectSelectedNewsArticle,
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleSections
} from './news';

const mockSelectedNewsArticle = {
  title: 'June',
  sections: [
    {
      images: [
        { url: '' }
      ],
      copy: ''
    }
  ]
}

const mockArticles = [
  {
    _id: 'xcxcxcxcxccx1234',
    title: 'hello',
    createdAt: new Date(),
    
  },
  {
    _id: 'asdf1234',
    title: 'hi',
    createdAt: new Date(),
    ...mockSelectedNewsArticle.sections
  },
  {
    _id: 'zxcv789',
    title: 'crazy',
    createdAt: new Date(),
    ...mockSelectedNewsArticle.sections
  }
];

const mockState = {
  news: {
    articles: mockArticles
  },
  selectedNewsArticle: mockSelectedNewsArticle
};

describe('(Selectors) news', () => {
  const articleId = 'asdf1234';
  let _newsArticle,
    _mockSelectedNewsArticle,
    newsArticle,
    mockSelectedNewsArticle;
  beforeEach(() => {
    _newsArticle = selectSelectedNewsArticle(mockState, articleId);
    _mockSelectedNewsArticle = selectSelectedNewsArticle(mockState)
    newsArticle = _newsArticle;
    mockSelectedNewsArticle = _mockSelectedNewsArticle
  });

  describe('selectNewsArticles', () => {
    it('should return news articles', () => {
      const actual = selectNewsArticles(mockState);
      const expected = mockArticles;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsArticlesReverse', () => {
    it('should return news articles', () => {
      const actual = selectNewsArticlesReverse(mockState);
      const expected = mockArticles.reverse();
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('filterNewsArticlesArticle', () => {
    it('should filter articles by id', () => {
      const actual = filterNewsArticlesArticle(mockState, articleId);
      const expected = mockState.news.articles.filter(p => p._id === articleId);
      expect(actual).to.deep.eq(expected);
    });
  });

  describe('selectNewsArticlesArticle', () => {
    it('should return a post in array', () => {
      const actual = selectNewsArticlesArticle(mockState, articleId);
      const filtered = mockState.news.articles.filter(p => p._id === articleId);
      const expected = filtered[0];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectSelectedNewsArticle', () => {
    it('should return selectedNewsArticle', () => {
      const actual = selectSelectedNewsArticle(mockState);
      const expected = mockSelectedNewsArticle;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleTitle', () => {
    it('should return a title', () => {
      const actual = selectSelectedNewsArticleTitle(mockState, articleId);
      const expected = newsArticle.title;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleSections', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleSections(mockState, articleId);
      const expected = newsArticle.sections;
      expect(actual).to.deep.equal(expected);
    });
  });
});

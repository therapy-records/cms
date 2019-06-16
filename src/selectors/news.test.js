
import {
  selectNewsArticles,
  selectNewsArticlesReverse,
  filterNewsArticlesArticle,
  selectNewsArticlesArticle,
  selectSelectedNewsArticle,
  selectSelectedNewsArticleSections
  // selectSelectedNewsArticleTitle,
  // selectSelectedNewsArticleBodyMain,
  // selectSelectedNewsArticleQuotes,
  // selectSelectedNewsArticleMainImageUrl,
  // selectSelectedNewsArticleMainImageExternalLink,
  // selectSelectedNewsArticleSecondaryImageUrl,
  // selectSelectedNewsArticleTicketsLink,
  // selectSelectedNewsArticleVenueLink,
  // selectSelectedNewsArticleMiniGalleryImages,
  // selectSelectedNewsArticleVideoEmbed,
  // selectSelectedNewsArticleSocialShare,
  // selectSelectedNewsArticleSocialShareHashtags
} from './news';

const mockSelectedNewsArticle = {
  month: 'June',
  sections: [
    {
      images: [],
      copy: []
    }
  ]
}

const mockArticles = [
  {
    _id: 'xcxcxcxcxccx1234',
    title: 'hello',
    createdAt: new Date(),
    mainBody: '<p>test</p>',
    miniGallery: ['asdf', 'asdf', 'asdf'],
    socialShare: {
      hashtags: ['something', 'somethingElse']
    },
    quotes: [
      { quote: 'amazing!', author: 'joe bloggs' },
      { quote: 'yay!', author: 'someone' }
    ]
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
    mainImage: {
      url: 'http://something/test.jpg',
      externalLink: 'http://google.com'
    },
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

  describe('selectSelectedNewsArticleSections', () => {
    it('should return selectedNewsArticle.sections', () => {
      const actual = selectSelectedNewsArticleSections(mockState);
      const expected = mockSelectedNewsArticle.sections;
      expect(actual).to.equal(expected);
    });
  });

  // describe('selectSelectedNewsArticleTitle', () => {
  //   it('should return a title', () => {
  //     const actual = selectSelectedNewsArticleTitle(mockState, articleId);
  //     const expected = newsArticle.title;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleBodyMain', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleBodyMain(mockState, articleId);
  //     const expected = newsArticle.bodyMain;
  //     expect(actual).to.deep.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleQuotes', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleQuotes(mockState, articleId);
  //     const expected = newsArticle.quotes;
  //     expect(actual).to.deep.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleMainImageUrl', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleMainImageUrl(mockState, articleId);
  //     const expected = newsArticle.mainImage.url;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleMainImageExternalLink', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleMainImageExternalLink(mockState, articleId);
  //     const expected = newsArticle.mainImage.externalLink;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleSecondaryImageUrl', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleSecondaryImageUrl(mockState, articleId);
  //     const expected = newsArticle.mainImageUrl;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleTicketsLink', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleTicketsLink(mockState, articleId);
  //     const expected = newsArticle.ticketsLink;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleVenueLink', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleVenueLink(mockState, articleId);
  //     const expected = newsArticle.venueLink;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleMiniGalleryImages', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleMiniGalleryImages(mockState, articleId);
  //     const expected = newsArticle.miniGalleryImages;
  //     expect(actual).to.deep.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleVideoEmbed', () => {
  //   it('should return bodyMain', () => {
  //     const actual = selectSelectedNewsArticleVideoEmbed(mockState, articleId);
  //     const expected = newsArticle.videoEmbed;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleSocialShare', () => {
  //   it('should return socialShare', () => {
  //     const actual = selectSelectedNewsArticleSocialShare(mockState, articleId);
  //     const expected = newsArticle.socialShare;
  //     expect(actual).to.equal(expected);
  //   });
  // });

  // describe('selectSelectedNewsArticleSocialShareHashtags', () => {
  //   it('should return socialShare.hashtags', () => {
  //     const actual = selectSelectedNewsArticleSocialShareHashtags(mockState, articleId);
  //     const expected = newsArticle.socialShare.hashtags;
  //     expect(actual).to.equal(expected);
  //   });
  // });
});

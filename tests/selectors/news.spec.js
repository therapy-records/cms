import {
  selectNewsArticles,
  selectNewsArticlesReverse,
  selectNewsArticlesQueue,
  selectNewsArticlesQueueReverse,
  filterNewsArticlesArticle,
  selectSelectedNewsArticle,
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleBodyMain,
  selectSelectedNewsArticleMainImageUrl,
  selectSelectedNewsArticleMainImageExternalLink,
  selectSelectedNewsArticleSecondaryImageUrl,
  selectSelectedNewsArticleTicketsLink,
  selectSelectedNewsArticleVenueLink,
  selectSelectedNewsArticleMiniGalleryImages,
  selectSelectedNewsArticleVideoEmbed,
  selectSelectedNewsArticleScheduledTime,
  selectSelectedNewsArticleSocialShare,
  selectSelectedNewsArticleSocialShareHashtags
} from 'selectors/news';

const mockArticles = [
  {
    _id: 'xcxcxcxcxccx1234',
    title: 'hello',
    createdAt: new Date(),
    mainBody: '<p>test</p>',
    miniGallery: ['asdf', 'asdf', 'asdf'],
    socialShare: {
      hashtags: ['something', 'somethingElse']
    }
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
    }
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
  news: {
    articles: mockArticles,
    articlesQueue: mockArticles
  },
  selectedNewsArticle: mockArticles[1]
};

describe('(Selectors) news', () => {
  const postId = 'asdf1234';
  let _newsArticle,
      _mockSelectedNewsArticle,
      newsArticle,
      mockSelectedNewsArticle;
  beforeEach(() => {
    _newsArticle = selectSelectedNewsArticle(mockState, postId);
    _mockSelectedNewsArticle = selectSelectedNewsArticle(mockState)
    newsArticle = _newsArticle;
    mockSelectedNewsArticle = _mockSelectedNewsArticle
  });

  describe('selectNewsArticlesQueue', () => {
    it('should return news articles', () => {
      const actual = selectNewsArticlesQueue(mockState);
      const expected = mockArticles;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsArticlesQueueReverse', () => {
    it('should return news articles', () => {
      const actual = selectNewsArticlesQueueReverse(mockState);
      const expected = mockArticles.reverse();
      expect(actual).to.deep.equal(expected);
    });
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
    it('should return a post in array', () => {
      const actual = filterNewsArticlesArticle(mockState, postId);
      const expected = [newsArticle];
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
      const actual = selectSelectedNewsArticleTitle(mockState, postId);
      const expected = newsArticle.title;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleBodyMain', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleBodyMain(mockState, postId);
      const expected = newsArticle.bodyMain;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleMainImageUrl', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleMainImageUrl(mockState, postId);
      const expected = newsArticle.mainImage.url;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleMainImageExternalLink', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleMainImageExternalLink(mockState, postId);
      const expected = newsArticle.mainImage.externalLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleSecondaryImageUrl', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleSecondaryImageUrl(mockState, postId);
      const expected = newsArticle.mainImageUrl;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleTicketsLink', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleTicketsLink(mockState, postId);
      const expected = newsArticle.ticketsLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleVenueLink', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleVenueLink(mockState, postId);
      const expected = newsArticle.venueLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleMiniGalleryImages', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleMiniGalleryImages(mockState, postId);
      const expected = newsArticle.miniGalleryImages;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleVideoEmbed', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsArticleVideoEmbed(mockState, postId);
      const expected = newsArticle.videoEmbed;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleScheduledTime', () => {
    it('should return scheduledTime', () => {
      const actual = selectSelectedNewsArticleScheduledTime(mockState, postId);
      const expected = newsArticle.scheduledTime;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleSocialShare', () => {
    it('should return scheduledTime', () => {
      const actual = selectSelectedNewsArticleSocialShare(mockState, postId);
      const expected = newsArticle.socialShare;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsArticleSocialShareHashtags', () => {
    it('should return scheduledTime', () => {
      const actual = selectSelectedNewsArticleSocialShareHashtags(mockState, postId);
      const expected = newsArticle.socialShare.hashtags;
      expect(actual).to.equal(expected);
    });
  });
});

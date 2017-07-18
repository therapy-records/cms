import {
  filterNewsPostsPost,
  selectNewsPostsPost,
  selectNewsPostsPostTitle,
  selectNewsPostsPostBodyMain,
  selectNewsPostsPostMainImageUrl,
  selectNewsPostsPostTicketsLink,
  selectNewsPostsPostVenueLink,
  selectNewsPostsPostMiniGalleryImages,
  selectNewsPostsPostVideoEmbed,
  selectNewsPostsPostScheduledTime
} from 'selectors/news';

const mockState = {
  news: {
    posts: [
      {
        _id: 'xcxcxcxcxccx1234',
        title: 'hello',
        createdAt: new Date(),
        mainBody: '<p>test</p>',
        miniGallery: ['asdf', 'asdf', 'asdf']
      },
      {
        _id: 'asdf1234',
        title: 'hi',
        createdAt: new Date(),
        mainBody: '<p>hello world</p>',
        miniGallery: ['asdf', 'asdf', 'asdf']
      },
      {
        _id: 'zxcv789',
        title: 'crazy',
        createdAt: new Date(),
        mainBody: '<p>testing</p>',
        miniGallery: ['asdf', 'asdf', 'asdf']
      }
    ]
  }
};

describe('(Selectors) news', () => {
  const postId = 'asdf1234';
  let _newsPost,
      newsPost;
  beforeEach(() => {
    _newsPost = selectNewsPostsPost(mockState, postId);
    newsPost = _newsPost;
  });

  describe('filterNewsPostsPost', () => {
    it('should return a post in array', () => {
      const actual = filterNewsPostsPost(mockState, postId);
      const expected = [newsPost];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPostsPost', () => {
    it('should return a newsPost', () => {
      const actual = selectNewsPostsPost(mockState, postId);
      const expected = newsPost;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPostsPostTitle', () => {
    it('should return a title', () => {
      const actual = selectNewsPostsPostTitle(mockState, postId);
      const expected = newsPost.title;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectNewsPostsPostBodyMain', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostBodyMain(mockState, postId);
      const expected = newsPost.bodyMain;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPostsPostMainImageUrl', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostMainImageUrl(mockState, postId);
      const expected = newsPost.mainImageUrl;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectNewsPostsPostTicketsLink', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostTicketsLink(mockState, postId);
      const expected = newsPost.ticketsLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectNewsPostsPostVenueLink', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostVenueLink(mockState, postId);
      const expected = newsPost.venueLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectNewsPostsPostMiniGalleryImages', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostMiniGalleryImages(mockState, postId);
      const expected = newsPost.miniGalleryImages;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPostsPostVideoEmbed', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostVideoEmbed(mockState, postId);
      const expected = newsPost.videoEmbed;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectNewsPostsPostScheduledTime', () => {
    it('should return scheduledTime', () => {
      const actual = selectNewsPostsPostScheduledTime(mockState, postId);
      const expected = newsPost.scheduledTime;
      expect(actual).to.equal(expected);
    });
  });
});

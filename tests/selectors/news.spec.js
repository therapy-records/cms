import {
  selectNewsPosts,
  selectNewsPostsReverse,
  selectNewsPostsQueue,
  selectNewsPostsQueueReverse,
  filterNewsPostsPost,
  selectSelectedNewsPost,
  selectSelectedNewsPostTitle,
  selectSelectedNewsPostBodyMain,
  selectSelectedNewsPostMainImageUrl,
  selectSelectedNewsPostTicketsLink,
  selectSelectedNewsPostVenueLink,
  selectSelectedNewsPostMiniGalleryImages,
  selectSelectedNewsPostVideoEmbed,
  selectSelectedNewsPostScheduledTime
} from 'selectors/news';

const mockPosts = [
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
];

const mockState = {
  news: {
    posts: mockPosts,
    postsQueue: mockPosts
  },
  selectedNewsPost: mockPosts[1]
};

describe('(Selectors) news', () => {
  const postId = 'asdf1234';
  let _newsPost,
      _selectedNewsPost,
      newsPost,
      mockSelectedNewsPost;
  beforeEach(() => {
    _newsPost = selectSelectedNewsPost(mockState, postId);
    _selectedNewsPost = selectSelectedNewsPost(mockState)
    newsPost = _newsPost;
    mockSelectedNewsPost = _selectedNewsPost
  });

  describe('selectNewsPostsQueue', () => {
    it('should return news posts', () => {
      const actual = selectNewsPostsQueue(mockState);
      const expected = mockPosts;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPostsQueueReverse', () => {
    it('should return news posts', () => {
      const actual = selectNewsPostsQueueReverse(mockState);
      const expected = mockPosts.reverse();
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPosts', () => {
    it('should return news posts', () => {
      const actual = selectNewsPosts(mockState);
      const expected = mockPosts;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectNewsPostsReverse', () => {
    it('should return news posts', () => {
      const actual = selectNewsPostsReverse(mockState);
      const expected = mockPosts.reverse();
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('filterNewsPostsPost', () => {
    it('should return a post in array', () => {
      const actual = filterNewsPostsPost(mockState, postId);
      const expected = [newsPost];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectSelectedNewsPost', () => {
    it('should return selectedNewsPost', () => {
      const actual = selectSelectedNewsPost(mockState);
      const expected = mockSelectedNewsPost;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsPostTitle', () => {
    it('should return a title', () => {
      const actual = selectSelectedNewsPostTitle(mockState, postId);
      const expected = newsPost.title;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsPostBodyMain', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsPostBodyMain(mockState, postId);
      const expected = newsPost.bodyMain;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectSelectedNewsPostMainImageUrl', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsPostMainImageUrl(mockState, postId);
      const expected = newsPost.mainImageUrl;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsPostTicketsLink', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsPostTicketsLink(mockState, postId);
      const expected = newsPost.ticketsLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsPostVenueLink', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsPostVenueLink(mockState, postId);
      const expected = newsPost.venueLink;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsPostMiniGalleryImages', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsPostMiniGalleryImages(mockState, postId);
      const expected = newsPost.miniGalleryImages;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectSelectedNewsPostVideoEmbed', () => {
    it('should return bodyMain', () => {
      const actual = selectSelectedNewsPostVideoEmbed(mockState, postId);
      const expected = newsPost.videoEmbed;
      expect(actual).to.equal(expected);
    });
  });

  describe('selectSelectedNewsPostScheduledTime', () => {
    it('should return scheduledTime', () => {
      const actual = selectSelectedNewsPostScheduledTime(mockState, postId);
      const expected = newsPost.scheduledTime;
      expect(actual).to.equal(expected);
    });
  });
});

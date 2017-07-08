import { createSelector } from 'reselect'
import { 
  selectNewsPostsPost,
  selectNewsPostsPostTitle,
  selectNewsPostsPostBodyMain,
  selectNewsPostsPostMainImageUrl,
  selectNewsPostsPostTicketsLink,
  selectNewsPostsPostVenueLink,
  selectNewsPostsPostMiniGallery,
  selectNewsPostsPostVideoEmbed
} from 'selectors/news';
import newsReducer from 'reducers/news';

const mockState = {
  news: {
    posts: [
      {
        _id: 'xcxcxcxcxccx1234',
        title: 'hello',
        createdAt: new Date(),
        mainBody: '<p>test</p>'
      },
      {
        _id: 'asdf1234',
        title: 'hi',
        createdAt: new Date(),
        mainBody: '<p>hello world</p>'
      },
      {
        _id: 'zxcv789',
        title: 'crazy',
        createdAt: new Date(),
        mainBody: '<p>testing</p>'
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
    newsPost = _newsPost[0];
  });

  describe('selectNewsPostsPost', () => {
    it('should return a newsPost', () => {
      const actual = selectNewsPostsPost(mockState, postId);
      const expected = [newsPost];
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


  describe('selectNewsPostsPostMiniGallery', () => {
    it('should return bodyMain', () => {
      const actual = selectNewsPostsPostMiniGallery(mockState, postId);
      const expected = newsPost.miniGallery;
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



});

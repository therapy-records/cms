import 'core-js';
import journalismReducer from './journalism';
import {
  fetchJournalismArticlesSuccess,
  postJournalismSuccess,
  editJournalismSuccess
} from '../actions/journalism';

let mockArticle = {
  _id: 'asdfsaf',
  title: 'hello',
  copy: 'world',
  imageUrl: 'http://image.com',
  externalLink: 'test.com',
  releaseDate: new Date()
};

const mockState = {
  journalism: {
    articles: [
      { title: 'test' }
    ],
    hasFetched: false,
    editSuccess: false
  },
  form: {
    JOURNALISM_FORM: {
      values: mockArticle
    }
  }
};

describe('(Reducer) news', () => {
  it('should be a function', () => {
    expect(journalismReducer).to.be.a('function')
  });

  it('should initialize with correct state', () => {
    const state = journalismReducer(undefined, {});
    expect(state).to.deep.equal({
      articles: null,
      hasFetched: false,
      editSuccess: false
    });
  });

  describe('FETCH_JOURNALISM_ARTICLES_SUCCESS', () => {
    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = journalismReducer(mockState.journalism, fetchJournalismArticlesSuccess(mockData1));
      expect(state).to.deep.eq({
        articles: mockData1,
        hasFetched: true,
        editSuccess: false
      });
      state = journalismReducer(state.journalism, fetchJournalismArticlesSuccess(mockData2))
      expect(state).to.deep.eq({
        articles: mockData2,
        hasFetched: true,
        editSuccess: false
      });
    });
  });

  describe('POST_JOURNALISM_FORM_SUCCESS', () => {
    it('should update state', () => {
      const mockArticle = { title: 'something' };
      const mockArticle2 = { title: 'something else' };
      let state = journalismReducer(mockState.journalism, postJournalismSuccess(mockArticle));
      expect(state).to.deep.eq({
        articles: [
          ...mockState.journalism.articles,
          mockArticle
        ],
        hasFetched: false,
        editSuccess: false
      });
      state = journalismReducer(mockState.journalism, postJournalismSuccess(mockArticle2));
      expect(state).to.deep.eq({
        articles: [
          ...mockState.journalism.articles,
          mockArticle2
        ],
        hasFetched: false,
        editSuccess: false
      });
    });
  });

  describe('EDIT_JOURNALISM_SUCCESS', () => {
    it('should update state', () => {
      let state = journalismReducer(mockState.journalism, editJournalismSuccess(true));
      expect(state).to.deep.eq({
        articles: mockState.journalism.articles,
        hasFetched: false,
        editSuccess: true
      });
      state = journalismReducer(mockState.journalism, editJournalismSuccess(false));
      expect(state).to.deep.eq({
        articles: mockState.journalism.articles,
        hasFetched: false,
        editSuccess: false
      });
    });
  });
});

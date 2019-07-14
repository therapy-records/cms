import newsArticleReducer from './newsArticle';
import {
  selectedNewsArticle,
  selectedNewsArticleDeleted,
  deleteSuccess,
  deleteError,
  destroySelectedNewsArticle,
  INITIAL_STATE
} from '../actions/newsArticle';
const mockState = INITIAL_STATE;

describe('(Reducer) newsArticle', () => {

  it('should be a function', () => {
    expect(newsArticleReducer).to.be.a('function')
  });

  it('should initialize with correct state', () => {
    const state = newsArticleReducer(undefined, {});
    const expectedInitialState = INITIAL_STATE;
    expect(state).to.deep.eq(expectedInitialState);
  });


  describe('SET_SELECTED_NEWS_ARTICLE', () => {
    it('should update state', () => {
      const mockData1 = { title: 'hello' };
      const mockData2 = { title: 'bonjour' };
      let state = newsArticleReducer(mockState, selectedNewsArticle(mockData1));
      expect(state).to.deep.eq(mockData1);
      state = newsArticleReducer(state, selectedNewsArticle(mockData2));
      expect(state).to.deep.eq(mockData2);
    });
  });

  describe('SET_SELECTED_NEWS_ARTICLE_DELETED', () => {
    it('should update state', () => {
      let state = newsArticleReducer(mockState, selectedNewsArticleDeleted());
      expect(state).to.deep.eq({ isDeleted: true });
    });
  });

  describe('DESTROY_SELECTED_NEWS_ARTICLE', () => {
    it('should update state', () => {
      let state = newsArticleReducer(mockState, destroySelectedNewsArticle());
      expect(state).to.deep.eq(INITIAL_STATE);
    });
  });

  describe('DELETE_SINGLE_NEWS_ARTICLE_SUCCESS', () => {
    it('should update state', () => {
      const mockData = { title: 'hello', imageUrl: 'aurl' };
      let state = newsArticleReducer(mockState, deleteSuccess(mockData));
      expect(state).to.deep.eq(mockData);
    });
  });

  describe('DELETE_SINGLE_NEWS_ARTICLE_ERROR', () => {
    it('should update state', () => {
      let state = newsArticleReducer(mockState, deleteError());
      expect(state).to.deep.eq({ error: true });
    });
  });

  describe('DESTROY_SELECTED_NEWS_ARTICLE', () => {
    it('should update state', () => {
      let state = newsArticleReducer(mockState, destroySelectedNewsArticle());
      expect(state).to.deep.eq(INITIAL_STATE);
    });
  });
});

import journalismArticleReducer, {INITIAL_STATE } from './journalismArticle';
import {
  selectedJournalismArticle,
  selectedJournalismArticleDeleted,
  deleteSuccess,
  deleteError,
  setSelectedJournalismArticle,
  fetchSingleJournalismArticle,
  deleteJournalismArticle,
  destroySelectedJournalismArticle
} from '../actions/journalismArticle';

const mockState = INITIAL_STATE;

describe('(Reducer) journalismArticle', () => {

  it('should be a function', () => {
    expect(journalismArticleReducer).to.be.a('function')
  });

  it('should initialize with correct state', () => {
      const state = journalismArticleReducer(undefined, {});
      const expectedInitialState = INITIAL_STATE;
      expect(state).to.deep.eq(expectedInitialState);
  });

  describe('SET_SELECTED_JOURNALISM_ARTICLE', () => {
    it('should update state', () => {
      const mockData1 = { title: 'hello', imageUrl: 'aurl' };
      const mockData2 = { title: 'bonjour', imageUrl: 'test' };
      let state = journalismArticleReducer(mockState, selectedJournalismArticle(mockData1));
      expect(state).to.deep.eq(mockData1);
      state = journalismArticleReducer(state, selectedJournalismArticle(mockData2));
      expect(state).to.deep.eq(mockData2);
    });
  });

  describe('SET_SELECTED_JOURNALISM_ARTICLE_DELETED', () => {
    it('should update state', () => {
      let state = journalismArticleReducer(mockState, selectedJournalismArticleDeleted());
      expect(state).to.deep.eq({ isDeleted: true });
    });
  });

  describe('DESTROY_SELECTED_JOURNALISM_ARTICLE', () => {
    it('should update state', () => {
      let state = journalismArticleReducer(mockState, destroySelectedJournalismArticle());
      expect(state).to.deep.eq(INITIAL_STATE);
    });
  });

  describe('DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS', () => {
    it('should update state', () => {
      const mockData = { title: 'hello', imageUrl: 'aurl' };
      let state = journalismArticleReducer(mockState, deleteSuccess(mockData));
      expect(state).to.deep.eq(mockData);
    });

  });

  describe('DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR', () => {
    it('should update state', () => {
      let state = journalismArticleReducer(mockState, deleteError());
      expect(state).to.deep.eq({ error: true });
    });
  });
  
});

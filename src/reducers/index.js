import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errorAlertReducer from './errorAlert';
import userReducer from './user';
import uiStateReducer from './uiState';
import newsReducer from './news';
import journalismReducer from './journalism';
import selectedNewsArticleReducer from './newsArticle';
import selectedJournalismArticleReducer from './journalismArticle';

const rootReducers = combineReducers({
  errorAlert: errorAlertReducer,
  user: userReducer,
  uiState: uiStateReducer,
  form: formReducer,
  news: newsReducer,
  journalism: journalismReducer,
  selectedNewsArticle: selectedNewsArticleReducer,
  selectedJournalismArticle: selectedJournalismArticleReducer
});

export default rootReducers;

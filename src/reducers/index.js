import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import uiStateReducer from './uiState';
import userReducer from './user';
import newsReducer from './news';
import otherWorkReducer from './otherWork';
import selectedNewsArticleReducer from './newsArticle';
import selectedOtherWorkArticleReducer from './otherWorkArticle';

const rootReducers = combineReducers({
  uiState: uiStateReducer,
  form: formReducer,
  user: userReducer,
  news: newsReducer,
  otherWork: otherWorkReducer,
  selectedNewsArticle: selectedNewsArticleReducer,
  selectedOtherWorkArticle: selectedOtherWorkArticleReducer
});

export default rootReducers;

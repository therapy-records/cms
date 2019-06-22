import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import genericErrorReducer from './genericError';
import userReducer from './user';
import uiStateReducer from './uiState';
import newsReducer from './news';
import otherWorkReducer from './otherWork';
import selectedNewsArticleReducer from './newsArticle';
import selectedOtherWorkArticleReducer from './otherWorkArticle';

const rootReducers = combineReducers({
  genericError: genericErrorReducer,
  user: userReducer,
  uiState: uiStateReducer,
  form: formReducer,
  news: newsReducer,
  otherWork: otherWorkReducer,
  selectedNewsArticle: selectedNewsArticleReducer,
  selectedOtherWorkArticle: selectedOtherWorkArticleReducer
});

export default rootReducers;

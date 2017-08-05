import { connect } from 'react-redux'
import { selectSelectedNewsArticle } from '../../../../selectors/news';
import { resetPromiseState } from '../../../../reducers/uiState';
import {
  editNews,
  editNewsQueue
} from '../../../../reducers/news';
import { destroySelectedNewsArticle } from '../../../../reducers/newsArticle';
import ArticleEdit from '../components/ArticleEdit';

const mapDispatchToProps = {
  onEditArticle: (article) => editNews(article),
  onEditArticleQueue: (article) => editNewsQueue(article),
  onDestroyArticle: () => destroySelectedNewsArticle(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)

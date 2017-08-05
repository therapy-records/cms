import { connect } from 'react-redux';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNewsArticles } from '../../../../reducers/news';
import {
  selectSelectedNewsArticle
} from '../../../../selectors/news';
import {
  deleteNewsArticle,
  deleteScheduledArticle
} from '../../../../reducers/newsArticle';
import Article from '../components/Article'

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onDeleteArticle: (id) => deleteNewsArticle(id),
  onDeleteScheduledArticle: (id) => deleteScheduledArticle(id),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)


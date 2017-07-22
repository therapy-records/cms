import { connect } from 'react-redux'
import { selectSelectedNewsPost } from '../../../../selectors/news';
import { resetPromiseState } from '../../../../reducers/uiState';
import {
  editNews,
  editNewsQueue
} from '../../../../reducers/news';
import ArticleEdit from '../components/ArticleEdit'

const mapDispatchToProps = {
  // onPostForm: (post) => editNews(post),
  onEditNews: () => editNews(),
  onEditQueueNews: () => editNewsQueue(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsPost(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)

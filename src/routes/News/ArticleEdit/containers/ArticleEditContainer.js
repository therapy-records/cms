import { connect } from 'react-redux'
import { selectNewsPostsPost } from '../../../../selectors/news';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNews, editNews } from '../../../../reducers/news';
import ArticleEdit from '../components/ArticleEdit'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onPostForm: (post) => editNews(post),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectNewsPostsPost(state, props.params.id)[0] || {},
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)

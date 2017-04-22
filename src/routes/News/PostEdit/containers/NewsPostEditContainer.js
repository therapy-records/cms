import { connect } from 'react-redux'
import { selectNewsPostsPost } from '../../../../selectors/news';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNews, editNews } from '../../../../reducers/news';
import NewsPostEdit from '../components/NewsPostEdit'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onPostForm: (post) => editNews(post),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  newsPost: selectNewsPostsPost(state, props.params.id)[0] || {},
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPostEdit)

import { connect } from 'react-redux';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNewsPosts } from '../../../../reducers/news';
import { selectNewsPostsPost } from '../../../../selectors/news';
import { deleteNewsPost } from '../../../../reducers/newsPost';
import Article from '../components/Article'

const mapDispatchToProps = {
  onFetchNewsPosts: () => fetchNewsPosts(),
  onDeleteArticle: (id) => deleteNewsPost(id),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectNewsPostsPost(state, props.params.id) || {},
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)


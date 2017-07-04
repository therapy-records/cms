import { connect } from 'react-redux';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNews } from '../../../../reducers/news';
import { selectNewsPostsPost } from '../../../../selectors/news';
import { deleteNewsPost } from '../modules/article';
import Article from '../components/Article'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onDeleteArticle: (id) => deleteNewsPost(id),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectNewsPostsPost(state, props.params.id)[0] || {},
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)


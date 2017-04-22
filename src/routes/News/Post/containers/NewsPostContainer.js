import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNews } from '../../../../reducers/news';
import { selectNewsPostsPost } from '../../../../selectors/news';
import { deleteNewsPost } from '../modules/news';
import NewsPost from '../components/NewsPost'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onDeleteNewsPost: (id) => deleteNewsPost(id),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  newsPost: selectNewsPostsPost(state, props.params.id)[0] || {},
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)


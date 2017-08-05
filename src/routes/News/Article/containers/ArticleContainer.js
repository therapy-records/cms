import { connect } from 'react-redux';
import { resetPromiseState } from '../../../../reducers/uiState';
import { fetchNewsPosts } from '../../../../reducers/news';
import {
  selectSelectedNewsPost
} from '../../../../selectors/news';
import {
  deleteNewsPost,
  deleteScheduledArticle
} from '../../../../reducers/newsPost';
import Article from '../components/Article'

const mapDispatchToProps = {
  onFetchNewsPosts: () => fetchNewsPosts(),
  onDeleteArticle: (id) => deleteNewsPost(id),
  onDeleteScheduledArticle: (id) => deleteScheduledArticle(id),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsPost(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)


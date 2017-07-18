import { connect } from 'react-redux'
import { postNews, postNewsQueue } from '../../../../reducers/news'
import { resetPromiseState } from '../../../../reducers/uiState'
import ArticleCreate from '../components/ArticleCreate'

const mapDispatchToProps = {
  onPostNews: () => postNews(),
  onPostQueueNews: () => postNewsQueue(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

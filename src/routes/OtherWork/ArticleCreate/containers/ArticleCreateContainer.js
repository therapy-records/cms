import { connect } from 'react-redux'
// import { postNews } from '../../../../reducers/news'
// import { resetPromiseState } from '../../../../reducers/uiState'
import ArticleCreate from '../components/ArticleCreate'

const mapDispatchToProps = {
  // onPostArticle: () => postNews(),
  // resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

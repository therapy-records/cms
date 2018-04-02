import { connect } from 'react-redux'
import { postOtherWork } from '../../../../reducers/otherWork'
import { resetPromiseState } from '../../../../reducers/uiState'
import ArticleCreate from '../components/ArticleCreate'

const mapDispatchToProps = {
  onPostArticle: () => postOtherWork(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

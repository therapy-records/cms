import { connect } from 'react-redux'
import { postNews } from '../../../../reducers/news'
import { resetPromiseState } from '../../../../reducers/uiState'
import NewsCreate from '../components/NewsCreate'

const mapDispatchToProps = {
  onPostNews: () => postNews(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsCreate)

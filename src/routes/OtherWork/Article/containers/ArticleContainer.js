import { connect } from 'react-redux';
import { resetPromiseState } from '../../../../reducers/uiState';
import { selectSelectedOtherWorkArticle } from '../../../../selectors/otherWork';
import {
  deleteOtherWorkArticle,
  fetchSingleOtherWorkArticle,
  destroySelectedOtherWorkArticle
} from '../../../../reducers/otherWorkArticle';
import Article from '../components/Article'

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleOtherWorkArticle(id),
  onDeleteArticle: (id) => deleteOtherWorkArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedOtherWorkArticle()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedOtherWorkArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)


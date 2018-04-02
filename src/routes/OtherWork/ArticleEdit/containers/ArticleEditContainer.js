import { connect } from 'react-redux'
import { resetPromiseState } from '../../../../reducers/uiState';
import { editOtherWork } from '../../../../reducers/otherWorkArticle';
import { destroySelectedOtherWorkArticle } from '../../../../reducers/otherWork';
import { selectSelectedOtherWorkArticle } from '../../../../selectors/otherWork';
import ArticleEdit from '../components/ArticleEdit';

const mapDispatchToProps = {
  onEditArticle: (article) => editOtherWork(article),
  onDestroyArticle: () => destroySelectedOtherWorkArticle(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedOtherWorkArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)

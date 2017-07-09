import { connect } from 'react-redux';
import ArticlePreview from './ArticlePreview';
import {
  selectNewsPostFormValues,
  selectNewsPostFormSyncErrors
} from '../../selectors/form';

const mapStateToProps = (state) => ({
  post: selectNewsPostFormValues(state),
  disabled: !selectNewsPostFormValues(state) || selectNewsPostFormSyncErrors(state)
});

export default connect(mapStateToProps, {})(ArticlePreview)

import { connect } from 'react-redux';
import ArticlePreview from './ArticlePreview';
import {
  selectNewsPostFormValues,
  selectNewsPostFormSyncErrors
} from '../../selectors/form';

const mapStateToProps = (state) => {
  const formValues = selectNewsPostFormValues(state);
  const formErrors = selectNewsPostFormSyncErrors(state);
  const isDisabled = !formValues.title ||
                     !formValues.bodyMain ||
                     formErrors.title ||
                     formErrors.bodyMain;

  return {
    post: selectNewsPostFormValues(state),
    disabled: !!selectNewsPostFormValues(state) || isDisabled
  }
};

export default connect(mapStateToProps, {})(ArticlePreview)

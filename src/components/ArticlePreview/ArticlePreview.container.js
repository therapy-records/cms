import { connect } from 'react-redux';
import ArticlePreview from './ArticlePreview';
import {
  selectNewsArticleFormValues,
  selectNewsArticleFormSyncErrors
} from '../../selectors/form';

const mapStateToProps = (state) => {
  const formValues = selectNewsArticleFormValues(state);
  const formErrors = selectNewsArticleFormSyncErrors(state);
  const isDisabled = !formValues.title ||
                     !formValues.bodyMain ||
                     formErrors.title ||
                     formErrors.bodyMain;

  return {
    article: selectNewsArticleFormValues(state),
    disabled: isDisabled
  }
};

export default connect(null, {})(ArticlePreview)

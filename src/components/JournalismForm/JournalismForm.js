import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { deleteJournalismArticle } from '../../actions/journalismArticle'
import {
  selectSelectedJournalismArticleTitle,
  selectSelectedJournalismArticleCopy,
  selectSelectedJournalismArticleExternalLink,
  selectSelectedJournalismArticleImageUrl,
  selectSelectedJournalismArticleReleaseDate
} from '../../selectors/journalism';
import { selectJournalismFormValues } from '../../selectors/form';
import { selectUiStateLoading } from '../../selectors/uiState';
import ArticleHeader from '../ArticleHeader';
import Datepicker from '../Datepicker/Datepicker';
import DropzoneImageUpload from '../DropzoneImageUpload';
import TextInput from '../TextInput';
import { required } from '../../utils/form';
import {
  JOURNALISM_FORM,
  JOUNALISM_FIELD_COPY_MAX_LENGTH
} from '../../constants';

export const JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 600,
  height: 600
};

export class JournalismForm extends React.Component {
  handleSubmit() {
    this.props.onSubmitForm();
  }

  render() {
    const {
      error,
      pristine,
      submitting,
      invalid,
      formValues,
      location,
      promiseLoading,
      articleId,
      onDeleteArticle
    } = this.props;

    if (!formValues) return null;

    let isEditForm;
    if (location && location.pathname.includes('edit')) {
      isEditForm = true;
    } else {
      isEditForm = false;
    }

    const submitButtonCopy = isEditForm ? 'Update article' : 'Post article';

    return (
      <section className='article-create'>

        <ArticleHeader
          baseUrl='/journalism'
          article={formValues}
          onDeleteArticle={isEditForm ? () => onDeleteArticle(articleId) : () => { }}
          promiseLoading={promiseLoading}
          heading={isEditForm ? `Editing ${formValues && formValues.title} ✍️` : 'Create Journalism ✍️'}
          showDeleteButton={isEditForm}
        />

        <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data'>

          <div className='col-clear' />

          <div className='row-large'>
            <Field name='title'
                   component={TextInput}
                   type='text'
                   placeholder='The Essence of Michel Camilo'
                   label='Title'
                   validate={required}
                   required
            />
          </div>

          <div className='row-large'>

          <Field name='copy'
                 component={TextInput}
                 type='text'
                 placeholder='Jazz In Europe Magazine'
                 label='Short excerpt'
                 maxLength={JOUNALISM_FIELD_COPY_MAX_LENGTH}
                 validate={required}
                 required
          />
          </div>

          <div className='row-large'>
            <Field name='externalLink'
                   component={TextInput}
                   type='Link to article'
                   label='Link to article'
                   placeholder='http://bbc.co.uk/fiona-ross'
                   validate={required}
                   required
            />
          </div>

          <div className='row-large'>
            <Field name='imageUrl'
                   component={DropzoneImageUpload}
                   title='Article screenshot'
                   existingImages={formValues && formValues.imageUrl && [formValues.imageUrl]}
                   validate={required}
                   minImageDimensions={JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS}
                   ctaCopy='Drag & drop image'
                   required
            />
          </div>

          <div className='row-large'>

            <Field name='releaseDate'
                   component={Datepicker}
                   initTime={formValues && formValues.releaseDate}
                   title='Release date'
                   validate={required}
                   required
            />
          </div>

          {error && <p>{error}</p>}

          <div className='row-large'>
            <button type='submit'
              className='btn-lg'
              disabled={error || pristine || submitting || error || invalid}
              onClick={() => this.handleSubmit()}>
              {submitButtonCopy}
            </button>
          </div>

        </form>
      </section>
    )
  }
}

JournalismForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  location: PropTypes.object,
  promiseLoading: PropTypes.bool,
  articleId: PropTypes.string
};

let InitFromStateForm = reduxForm({
  form: JOURNALISM_FORM,
  enableReinitialize: true
})(JournalismForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: selectSelectedJournalismArticleTitle(state),
      copy: selectSelectedJournalismArticleCopy(state),
      externalLink: selectSelectedJournalismArticleExternalLink(state),
      imageUrl: selectSelectedJournalismArticleImageUrl(state),
      releaseDate: selectSelectedJournalismArticleReleaseDate(state)
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectJournalismFormValues(state),
  promiseLoading: selectUiStateLoading(state)
});

const mapDispatchToProps = {
  onDeleteArticle: (id) => deleteJournalismArticle(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(InitFromStateForm)

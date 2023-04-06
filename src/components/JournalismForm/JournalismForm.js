import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { deleteJournalismArticle } from '../../actions/journalismArticle'
import {
  selectSelectedJournalismArticleTitle,
  selectSelectedJournalismArticleCopy,
  selectSelectedJournalismArticleExternalLink,
  selectSelectedJournalismArticleImage,
  selectSelectedJournalismArticleReleaseDate
} from '../../selectors/journalism';
import { selectJournalismFormValues } from '../../selectors/form';
import { selectUiStateLoading } from '../../selectors/uiState';
import PageHeader from '../PageHeader';
import Datepicker from '../Datepicker/Datepicker';
import ImageUploadContainer from '../../components/FormElements/ImageUpload/ImageUploadContainer';
import TextInput from '../TextInput';
import Select from '../FormElements/Select';
import { required } from '../../utils/form';
import {
  JOURNALISM_FORM,
  JOUNALISM_FIELD_COPY_MAX_LENGTH
} from '../../constants';

export const JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 650,
  height: 650
};

export class JournalismForm extends React.Component {
  handleSubmit() {
    this.props.onSubmitForm();
  }

  onUploadImage(imageObj) {
    const newImage = {
      cloudinaryUrl: imageObj.cloudinaryUrl,
      cloudinaryPublicId: imageObj.cloudinaryPublicId
    };

    this.props.updateImage(JOURNALISM_FORM, 'image', newImage);
  }

  onRemoveImage() {
    this.props.updateImage(JOURNALISM_FORM, 'image', {});
  }

  onCategoryChange(newCategory) {
    this.props.updateImage(JOURNALISM_FORM, 'category', newCategory);
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
      onDeleteEntity
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

        <PageHeader
          entityName='journalism'
          entity={formValues}
          heading={isEditForm ? `Editing ${formValues && formValues.title} ✍️` : 'Create Journalism ✍️'}
          onDeleteEntity={isEditForm ? () => onDeleteEntity(articleId) : () => { }}
          promiseLoading={promiseLoading}
          renderDeleteButton={isEditForm}
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
              type='text'
              label='Link to article'
              placeholder='http://bbc.co.uk/fiona-ross'
              validate={required}
              required
            />
          </div>

          <div className='row-large'>
            <Field name='category'
              component={Select}
              type='select'
              label='Category'
              options={[
                {
                  text: 'Please select',
                  value: null
                },
                {
                  text: 'Women in Jazz Media',
                  value: 'Women in Jazz Media'
                },
                {
                  text: 'Jazz in Europe',
                  value: 'Jazz in Europe'
                },
                {
                  text: 'Kind of Jazz',
                  value: 'Kind of Jazz'
                },
                {
                  text: 'Jazz Quarterly',
                  value: 'Jazz Quarterly'
                },
                {
                  text: 'Other',
                  value: 'Other'
                }
              ]}
              validate={required}
              required
              hideLabel={false}
            />
          </div>

          <div className='row-large'>
            <Field
              name='image'
              component={ImageUploadContainer}
              title='Article screenshot'
              existingImages={[ formValues.image ]}
              minImageDimensions={JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS}
              handleOnUpload={(imageObj, sectionImageIndex) =>
                this.onUploadImage(imageObj)
              }
              handleOnRemove={() => this.onRemoveImage()}
              required
              validate={required}
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
  onDeleteEntity: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
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
      image: selectSelectedJournalismArticleImage(state),
      releaseDate: selectSelectedJournalismArticleReleaseDate(state)
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectJournalismFormValues(state),
  promiseLoading: selectUiStateLoading(state)
});

const mapDispatchToProps = {
  onDeleteEntity: (id) => deleteJournalismArticle(id),
  updateImage: (...args) => change(...args)
};

export default connect(mapStateToProps, mapDispatchToProps)(InitFromStateForm)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  selectSelectedJournalismArticleTitle,
  selectSelectedJournalismArticleCopy,
  selectSelectedJournalismArticleExternalLink,
  selectSelectedJournalismArticleImageUrl,
  selectSelectedJournalismArticleReleaseDate
} from '../../selectors/journalism';
import { selectJournalismArticleFormValues } from '../../selectors/form';
import Datepicker from '../Datepicker/Datepicker';
import DropzoneImageUpload from '../NewsArticleForm/DropzoneImageUpload';
import TextInput from '../TextInput';
import { required } from '../../utils/form';
import { JOURNALISM_ARTICLE_FORM } from '../../constants';

export const JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 500,
  height: 500
};

export class JournalismArticleForm extends React.Component {
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
      location
    } = this.props;

    let isEditForm;
    if (location && location.pathname.includes('edit')) {
      isEditForm = true;
    } else {
      isEditForm = false;
    }

    return (
      <section className='root article-create'>

        <div className='heading-action-btns'>
          <div className='heading-with-btn'>
            <h2>{isEditForm ? 'Edit Journalism ✍️' : 'Create Journalism ✍️'}</h2>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data'>

          <div className='col-clear' />

          <div className='row-large'>
            <Field name='title'
                   component={TextInput}
                   type='text'
                   placeholder='Hello World'
                   label='Title'
                   validate={required}
                   required
            />
          </div>

          <div className='row-large'>

          <Field name='copy'
                 component={TextInput}
                 type='text'
                 placeholder='Short excerpt'
                 label='Copy'
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
                   existingImage={formValues && formValues.imageUrl}
                   validate={required}
                  minImageDimensions={JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS}
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
              className='btn-lg btn-submit'
              disabled={error || pristine || submitting || error || invalid}
              onClick={() => this.handleSubmit()}>Submit
            </button>
          </div>

        </form>
      </section>
    )
  }
}

JournalismArticleForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  onSubmitForm: PropTypes.func.isRequired,
  location: PropTypes.object
};

let InitFromStateForm = reduxForm({
  form: JOURNALISM_ARTICLE_FORM,
  enableReinitialize: true
})(JournalismArticleForm);

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
  formValues: selectJournalismArticleFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)

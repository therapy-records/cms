import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  selectSelectedOtherWorkArticleTitle,
  selectSelectedOtherWorkArticleCopy,
  selectSelectedOtherWorkArticleExternalLink,
  selectSelectedOtherWorkArticleMainImageUrl,
  selectSelectedOtherWorkArticleReleaseDate
} from '../../selectors/otherWork';
import { selectOtherWorkArticleFormValues } from '../../selectors/form';
import Datepicker from '../Datepicker/Datepicker';
import DropzoneImageUpload from '../NewsArticleForm/DropzoneImageUpload';
import TextInput from '../TextInput';
import { required } from '../../utils/form';
import { OTHER_WORK_ARTICLE_FORM } from '../../constants';

export const OTHER_WORK_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 500,
  height: 500
};

export class OtherWorkArticleForm extends React.Component {
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
      <section className='root'>
        <div className='heading'>
          <h2>{isEditForm ? 'Edit Other Work' : 'Create Other Work'}</h2>
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
            />
          </div>

          <div className='row-large'>

          <Field name='copy'
            component={TextInput}
            type='text'
            placeholder='Short excerpt'
            label='Copy'
            validate={required}
          />
          </div>

          <div className='row-large'>
            <Field name='externalLink'
              component={TextInput}
              type='Link to article'
              label='Link to article'
              placeholder='http://bbc.co.uk/fiona-ross'
              validate={required}
            />
          </div>

          <div className='row-large'>
            <Field name='mainImageUrl'
              component={DropzoneImageUpload}
              title='Main image'
              existingImage={formValues && formValues.mainImageUrl}
              validate={required}
              minImageDimensions={OTHER_WORK_ARTICLE_MIN_IMAGE_DIMENSIONS}
            />
          </div>

          <div className='row-large'>

            <Field name='releaseDate'
              component={Datepicker}
              initTime={formValues && formValues.releaseDate}
              title='Release date'
              validate={required}
            />
          </div>

          {/* isEditForm &&
            <div>
              <br />
              <br />
              <p>NOTE: Any images previously uploaded will <b>not be overriden</b></p>
              <p><small>To remove previous images contact admin</small></p>
            </div>
          */}

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

OtherWorkArticleForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  onSubmitForm: PropTypes.func.isRequired,
  location: PropTypes.object
};

let InitFromStateForm = reduxForm({
  form: OTHER_WORK_ARTICLE_FORM,
  enableReinitialize: true
})(OtherWorkArticleForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: selectSelectedOtherWorkArticleTitle(state),
      copy: selectSelectedOtherWorkArticleCopy(state),
      externalLink: selectSelectedOtherWorkArticleExternalLink(state),
      mainImageUrl: selectSelectedOtherWorkArticleMainImageUrl(state),
      releaseDate: selectSelectedOtherWorkArticleReleaseDate(state)
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectOtherWorkArticleFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)

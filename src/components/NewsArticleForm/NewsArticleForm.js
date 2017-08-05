import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import {
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleBodyMain,
  selectSelectedNewsArticleMainImageUrl,
  selectSelectedNewsArticleTicketsLink,
  selectSelectedNewsArticleVenueLink,
  selectSelectedNewsArticleMiniGalleryImages,
  selectSelectedNewsArticleVideoEmbed,
  selectSelectedNewsArticleScheduledTime
} from '../../selectors/news';
import { selectNewsArticleFormValues } from '../../selectors/form';
import './NewsArticleForm.scss';
import DropzoneImageUpload from './DropzoneImageUpload';
import Datepicker from '../Datepicker/Datepicker';
import ArticlePreview from '../ArticlePreview/ArticlePreview.container';

export const textInput = ({ input, label, type, placeholder, props, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} {...props} />
    {touched && error && <span>{label} is {error}</span>}
  </div>
);

textInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired
}

export const bodyMainRTE = ({ input, onChange, props, meta: { touched, error } }) => (
  <div>
    <p><strong>Main content</strong></p>
    {touched && error && (<p>Main content is {error}</p>)}
    <RichTextEditor value={input.value} onChange={e => { input.onChange(e) }} {...props} />
  </div>
);

bodyMainRTE.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired
}

export const required = value => value ? undefined : 'required';

export class NewsArticleForm extends React.Component {

  handleSubmit() {
    if (this.props.formValues.scheduledTime) {
      this.props.onSubmitFormQueue();
    } else {
      this.props.onSubmitForm();
    }
  }

  render() {
    const {
      error,
      pristine,
      submitting,
      invalid,
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
          <h2>{isEditForm ? 'Edit article' : 'Create article'}</h2>
          <ArticlePreview />
        </div>

        <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data'>

          <div className='cols-container'>

            <div className='col-1'>

              <div className='col-clear' />

              <Field name='title'
                    component={textInput}
                    type='text'
                    placeholder='Hello World'
                    label='Title'
                    validate={required} />

              <br />

              <Field name='mainImageUrl'
                    component={DropzoneImageUpload}
                    title='Main image' />

            </div>

            <div className='col-2'>

              <Field name='ticketsLink'
                    component={textInput}
                    type='text'
                    placeholder='http://www...'
                    label='Link to get tickets ' />

              <br />

              <Field name='venueLink'
                    component={textInput}
                    type='text'
                    placeholder='http://www...'
                    label='Link to venue' />

              <Field name='videoEmbed'
                    component={textInput}
                    type='text'
                    placeholder='https://www.youtube.com/embed/45JLCGLplvk'
                    label='YouTube video link' />

            </div>

          </div>

          <br />
          <br />

          <Field name='bodyMain'
                component={bodyMainRTE}
                validate={required} />

          <br />
          <br />

          <Field name='miniGalleryImages'
                component={DropzoneImageUpload}
                title='Mini gallery images'
                multiple />

          <br />

          {error && <strong>{error}</strong>}

          <br />

          <Field name='scheduledTime'
                component={Datepicker}
                initTime={this.props.formValues && this.props.formValues.scheduledTime}
                title='Scheduler (optional)'
                titleSub='Post live on a date of choosing' />

          <br />
          <br />

          <button type='submit'
                  disabled={error || pristine || submitting || error || invalid}
                  onClick={() => this.handleSubmit()}>Submit
          </button>

        </form>
      </section>
    )
  }
}

NewsArticleForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormQueue: PropTypes.func.isRequired,
  location: PropTypes.object
};

let InitFromStateForm = reduxForm({
  form: 'NEWS_ARTICLE_FORM',
  enableReinitialize : true
})(NewsArticleForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: selectSelectedNewsArticleTitle(state),
      bodyMain: selectSelectedNewsArticleBodyMain(state),
      mainImageUrl: selectSelectedNewsArticleMainImageUrl(state),
      ticketsLink: selectSelectedNewsArticleTicketsLink(state),
      venueLink: selectSelectedNewsArticleVenueLink(state),
      videoEmbed: selectSelectedNewsArticleVideoEmbed(state),
      miniGalleryImages: selectSelectedNewsArticleMiniGalleryImages(state),
      scheduledTime: selectSelectedNewsArticleScheduledTime(state)
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectNewsArticleFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)

import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import {
  selectNewsPostsPostTitle,
  selectNewsPostsPostBodyMain,
  selectNewsPostsPostMainImageUrl,
  selectNewsPostsPostTicketsLink,
  selectNewsPostsPostVenueLink,
  selectNewsPostsPostMiniGalleryImages,
  selectNewsPostsPostVideoEmbed
} from '../../selectors/news';
import './NewsPostForm.scss';
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
  onChange: PropTypes.func.isRequired,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired
}

export const required = value => value ? undefined : 'required';

export class NewsPostForm extends React.Component {
  render() {
    const {
      error,
      pristine,
      submitting,
      onSubmit,
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
          <h2>{isEditForm ? 'Edit post' : 'Create post'}</h2>
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

          {!isEditForm &&
            <Field name='scheduledTime'
                  component={Datepicker}
                  togglePicker
                  title='Schedule Time' />
          }
          
          <br />
          <br />

          <button type='submit'
                  disabled={error || pristine || submitting || error || invalid}
                  onClick={() => onSubmit()}>Submit
          </button>


        </form>
      </section>
    )
  }
}

NewsPostForm.propTypes = {
  post: PropTypes.object,
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func,
  location: PropTypes.object.isRequired
};

let InitFromStateForm = reduxForm({
  form: 'NEWS_POST_FORM',
  enableReinitialize : true
})(NewsPostForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: props.post && selectNewsPostsPostTitle(state, props.post._id),
      bodyMain: props.post && selectNewsPostsPostBodyMain(state, props.post._id),
      mainImageUrl: props.post && selectNewsPostsPostMainImageUrl(state, props.post._id),
      ticketsLink: props.post && selectNewsPostsPostTicketsLink(state, props.post._id),
      venueLink: props.post && selectNewsPostsPostVenueLink(state, props.post._id),
      miniGalleryImages: props.post && selectNewsPostsPostMiniGalleryImages(state, props.post._id),
      videoEmbed: props.post && selectNewsPostsPostVideoEmbed(state, props.post_id)
    }
  })
)(InitFromStateForm);

export default InitFromStateForm;

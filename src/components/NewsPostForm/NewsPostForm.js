/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import {
  selectNewsPostsPostTitle,
  selectNewsPostsPostBodyMain,
  selectNewsPostsPostMainImageUrl,
  selectNewsPostsPostTicketsLink,
  selectNewsPostsPostVenueLink,
  selectNewsPostsPostMiniGallery,
  selectNewsPostsPostVideoEmbed
} from '../../selectors/news';
import './NewsPostForm.scss';
import DropzoneImageUpload from './DropzoneImageUpload';

const textInput = ({ input, label, type, placeholder, props, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} {...props} />
    {touched && error && <span>{label} is {error}</span>}
  </div>
);

export const bodyMainRTE = ({ input, onChange, props, meta: { touched, error } }) => (
  <div>
    <p><strong>Main content</strong></p>
    {touched && error && (<p>Main content is {error}</p>)}
    <RichTextEditor value={input.value} onChange={e => { input.onChange(e) }} {...props} />
  </div>
);

export const required = value => value ? undefined : 'required';

export class NewsPostForm extends React.Component {
  render() {
    const {
      error,
      pristine,
      submitting,
      onSubmit,
      location
    } = this.props;

    let isEditForm;
    if (location.pathname.includes('edit')) {
      isEditForm = true;
    } else {
      isEditForm = false;
    }

    return (
      <section className='news-post-form'>
        <h2>{isEditForm ? 'Edit post' : 'Create post'}</h2>

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

          <div>
            <button type='submit' disabled={error || pristine || submitting} onClick={() => onSubmit()}>Submit</button>
          </div>

        </form>
      </section>
    )
  }
}

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
      miniGallery: props.post && selectNewsPostsPostMiniGallery(state, props.post._id),
      videoEmbed: props.post && selectNewsPostsPostVideoEmbed(state, props.post_id)
    }
  })
)(InitFromStateForm);

export default InitFromStateForm;
/* eslint-enable react/prop-types */

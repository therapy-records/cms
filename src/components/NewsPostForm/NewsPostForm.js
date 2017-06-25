import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import RichTextEditor from '../RichTextEditor'
import {
  selectNewsPostsPostTitle,
  selectNewsPostsPostBodyMain,
  selectNewsPostsPostMainImageUrl,
  selectNewsPostsPostTicketsLink,
  selectNewsPostsPostVenueLink
} from '../../selectors/news';
import './NewsPostForm.scss'

const CLOUDINARY_UPLOAD_PRESET_ID = 'g668btkv';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dswia8t5y/upload';

class renderDropzoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileUrl: ''
    };
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET_ID)
                        .field('file', file);
    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileUrl: response.body.secure_url
        });
        this.props.input.onChange(this.state.uploadedFileUrl);
      }
    });
  }

  onImageDrop(files){
    this.handleImageUpload(files[0]);
  }

  render() {
    const {
      input,
      meta
    } = this.props;

    return (
      <div>
      <p><strong>Main image</strong></p>
        <Dropzone
          name={input.name}
          onDrop={this.onImageDrop.bind(this)}
          className='dropzone'
          activeClassName='dropzone-active'
        >
          {!this.state.uploadedFileUrl &&
            <div className='dropzone-cta'>Drag &amp; Drop or click &amp; select</div>
          }
          {this.state.uploadedFileUrl &&
            <img src={this.state.uploadedFileUrl} /> 
          }
        </Dropzone>
        {meta.touched &&
          meta.error &&
          <span className="error">{meta.error}</span>
        }
      </div>
    );
  }
}

const textInput = ({ input, label, type, placeholder, props, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} {...props}/>
    {touched && error && <span>{label} is {error}</span>}
  </div>
)

const bodyMainRTE = ({ input, onChange, props, meta: { error }}) => (
  <div>
    <p><strong>Main content</strong></p>
    {error && (<p>Main content is {error}</p>)}
    <RichTextEditor value={input.value} onChange={e => { input.onChange(e) }} {...props} />
  </div>
);

const required = value => value ? undefined : 'required';

class NewsPostForm extends React.Component {

  render() {
    
    const { error, handleSubmit, pristine, reset, submitting, onSubmit } = this.props

    return (
    <section className='news-post-form'>
      <h2>Create/edit post</h2>

        <form onSubmit={(e) => e.preventDefault()}>

          <div className='cols-container'>

            <div className='col-1'>

              <Field name="title"
                    component={textInput}
                    type="text"
                    placeholder="Hello World"
                    label="Title"
                    validate={required}/>

              <br/>

              <Field name="mainImageUrl"
                    component={renderDropzoneInput} />

            </div>

            <div className='col-2'>

              <Field name="ticketsLink"
                    component={textInput}
                    type="text"
                    placeholder="http://www..."
                    label="Link to get tickets " />

              <br/>

              <Field name="venueLink"
                    component={textInput}
                    type="text"
                    placeholder="http://www..."
                    label="Link to venue" />

            </div>

          </div>

          <br/>
          <br/>

          <Field name="bodyMain"
                 component={bodyMainRTE}
                 validate={required} />

          <br/>

          {error && <strong>{error}</strong>}

          <br/>

          <div>
            <button type="submit" disabled={error || pristine || submitting} onClick={() => onSubmit()}>Submit</button>
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
      venueLink: props.post && selectNewsPostsPostVenuLink(state, props.post._id)
    }
  })
)(InitFromStateForm);

export default InitFromStateForm;

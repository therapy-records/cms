import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import Dropzone from 'react-dropzone'
import {
  selectNewsPostsPostTitle,
  selectNewsPostsPostBodyMain 
} from '../../selectors/news';
import './NewsPostForm.scss'

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
    <p><strong>Main image</strong></p>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Drag &amp; Drop or click &amp; select</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}> <img src={file.preview} /></li>) }
        </ul>
      )}
    </div>
  );
}

const textInput = ({ input, label, type, props, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} {...props}/>
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

          <Field name="imageUrl"
                 component={renderDropzoneInput} />

          <br/>

          <Field name="title"
                 component={textInput}
                 type="text"
                 placeholder="Hello World"
                 label="Title"
                 validate={required}/>

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
      imageUrl: props.post && selectNewsPostsPostImageUrl(state, props.post._id)
    }
  })
)(InitFromStateForm);

export default InitFromStateForm;

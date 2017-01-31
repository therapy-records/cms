import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import RichTextEditor from '../RichTextEditor';

const textInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type}/>
    {touched && error && <span>{label} is {error}</span>}
  </div>
)

const textarea = ({ input, label, type, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <textarea {...input}></textarea>
    {touched && error && <span>{label} is {error}</span>}
  </div>
)

const mainBodyRTE = ({ input, onChange, meta: { error }}) => (
  <div>
    <p><strong>Main content</strong></p>
    {error && (<p>Main content is {error}</p>)}
    <RichTextEditor value={input} onChange={e => { input.onChange(e) }}/>
  </div>
)

const required = value => value ? undefined : 'required';

class NewsPostForm extends React.Component {

  render() {

    const { error, handleSubmit, pristine, reset, submitting, onSubmit, postSuccess } = this.props

    return (
    <section>
      <h2>New post</h2>

      {postSuccess ? (
        <h2>Successfully posted! <br/><br/>🚀</h2>
      ) : (

        <form onSubmit={(e) => e.preventDefault()}>

          <Field name="title"
                 component={textInput}
                 type="text"
                 placeholder="Hello World"
                 label="Title"
                 validate={required}/>

          <br/>

          <Field name="mainBody"
                 component={mainBodyRTE}
                 validate={required}/>

          <br/>

          {error && <strong>{error}</strong>}

          <br/>

          <div>
            <button type="submit" disabled={error || pristine || submitting} onClick={() => onSubmit()}>Submit</button>
          </div>

        </form>
      )}

    </section>
    )
  }
}

export default reduxForm({
  form: 'NEWS_POST_FORM'
})(NewsPostForm)

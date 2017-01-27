import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import './NewsPostForm.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values) => {
  console.log('submit!');
}

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

const required = value => value ? undefined : 'required';


class NewsPostForm extends React.Component {

  render() {

    const { error, handleSubmit, pristine, reset, submitting } = this.props

    return (
    <section>
      <h2>New news post</h2>

      <form onSubmit={handleSubmit(submit)}>

        <Field name="title"
               component={textInput}
               type="text"
               placeholder="Hello World"
               label="Title"
               validate={required}/>

        <br/>

        <Field name="subHeading"
               component={textInput}
               type="text"
               placeholder="From Earth"
               label="Sub heading"
               validate={required}/>

        <br/>

        <div>
          <Field name="mainContent"
                 component={textarea}
                 placeholder="Main content"
                 label="Main content"
                 validate={required} />
        </div>

        <br/>

        {error && <strong>{error}</strong>}

        <br/>

        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>

      </form>

    </section>
    )
  }
}

export default reduxForm({
  form: 'NEWS_POST_FORM'
})(NewsPostForm)

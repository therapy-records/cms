import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import {
  selectNewsPostsPostTitle,
  selectNewsPostsPostMainBody 
} from '../../selectors/news';
import './NewsPostForm.scss'

const textInput = ({ input, label, type, props, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} {...props}/>
    {touched && error && <span>{label} is {error}</span>}
  </div>
)

const mainBodyRTE = ({ input, onChange, props, meta: { error }}) => (
  <div>
    <p><strong>Main content</strong></p>
    {error && (<p>Main content is {error}</p>)}
    <RichTextEditor value={input.value} onChange={e => { input.onChange(e) }} {...props}/>
  </div>
);

const required = value => value ? undefined : 'required';

class NewsPostForm extends React.Component {

  render() {
    
    const { error, handleSubmit, pristine, reset, submitting, onSubmit, postSuccess } = this.props

    return (
    <section className='news-post-form'>
      <h2>Create/edit post</h2>

      {postSuccess ? (
        <div>
          <h2>Successfully posted! <br/><br/>🚀</h2>
          <Link to='news' className='news-link'>Go to news</Link>
        </div>
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
                 validate={required} />

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

let InitFromStateForm = reduxForm({
  form: 'NEWS_POST_FORM',
  enableReinitialize : true
})(NewsPostForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: props.post && selectNewsPostsPostTitle(state, props.post._id),
      mainBody: props.post && selectNewsPostsPostMainBody(state, props.post._id)
    }
  })
)(InitFromStateForm);

export default InitFromStateForm;

import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import RichTextEditor from 'react-rte';

class MainContentEditor extends Component {

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        autoFocus/>
    );
  }
}

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

const mainContentRTE = ({ input, onChange, meta: { error }}) => (
  <div>
    {error && (<p>Main content is {error}</p>)}
    <MainContentEditor value={input} onChange={e => { input.onChange(e) }} />
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

        <Field name="mainContent"
               component={mainContentRTE}
               validate={required}/>

        <br/>

        {error && <strong>{error}</strong>}

        <br/>

        <div>
          <button type="submit" disabled={error || pristine || submitting}>Submit</button>
        </div>

      </form>

    </section>
    )
  }
}

export default reduxForm({
  form: 'NEWS_POST_FORM'
})(NewsPostForm)

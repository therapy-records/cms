import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './NewsPostForm.scss'

export const NewsPostForm = (props) => {

  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <section>
      <h2>New news post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <Field name="title" component="input" type="text" placeholder="Hello World" />
        </div>

        <br/>

        <div>
          <label>Sub heading</label>
          <Field name="subHeading" component="input" type="text" placeholder="From Earth"/>
        </div>

        <br/>

        <div>
          <label>Main content</label>
          <Field name="mainContent" component="textarea" type="text" placeholder="Main content"/>
        </div>

        <br/>

        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>

      </form>

    </section>
  );
}

// export default NewsPostForm
export default reduxForm({
  form: 'NEWS_POST_FORM'
})(NewsPostForm)

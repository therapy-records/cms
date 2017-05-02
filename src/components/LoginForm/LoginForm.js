import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import './LoginForm.scss'

const textInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type}/>
    {touched && error && <span>{label} is {error}</span>}
  </div>
)

const required = value => value ? undefined : 'required';

class LoginForm extends React.Component {

  render() {

    const { error, handleSubmit, pristine, reset, submitting, onSubmit } = this.props

    return (
      <section className='login-form'>
          <h2>Login</h2>
          <form onSubmit={(e) => e.preventDefault()}>

            <Field name='username'
                    component={textInput}
                    type='text'
                    placeholder='username'
                    label='Username'
                    validate={required}/>

            <br/>

            <Field name='password'
                    component={textInput}
                    type='password'
                    placeholder='password'
                    label='Password'
                    validate={required}/>

            {error && <strong>{error}</strong>}

            <br/>

            <div>
              <button type='submit' disabled={error || pristine || submitting} onClick={() => onSubmit()}>Submit</button>
            </div>

          </form>
      </section>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default reduxForm({
  form: 'LOGIN_FORM'
})(LoginForm)

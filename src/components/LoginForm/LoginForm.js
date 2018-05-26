import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import LoadingSpinner from '../LoadingSpinner';

export const textInput = ({ input, label, placeholder, hideLabel, autoFocus, type, meta: { touched, error } }) => (
  <div>
    {(label && !hideLabel) && <label>{label}</label>}
    <input {...input} placeholder={placeholder} type={type} autoFocus={autoFocus} />
    {touched && error && <span className='form-error'>{label} is {error}</span>}
  </div>
);

textInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string
};

export const required = value => value ? undefined : 'required';

export class LoginForm extends React.Component {
  render() {
    const {
      error,
      pristine,
      submitting,
      onSubmit,
      authError,
      promiseLoading
    } = this.props

    return (
      <section className='login-form'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        <form onSubmit={(e) => e.preventDefault()}>

          <Field name='username'
                 component={textInput}
                 type='text'
                 placeholder='Username'
                 label='Username'
                 validate={required}
                 hideLabel
                 autoFocus
          />

          <br />

          <Field name='password'
                 component={textInput}
                 type='password'
                 placeholder='Password'
                 label='Password'
                 validate={required}
                 hideLabel
          />

          {error && <p className='form-error'>{error}</p>}

          {authError && <p className='form-error'>{authError}</p>}

          <br />

          <div>
            <button
              type='submit'
              className='btn-lg btn-submit'
              disabled={error || pristine || submitting}
              onClick={() => onSubmit()}>Login
            </button>
          </div>

        </form>
      </section>
    )
  }
}

LoginForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  authError: PropTypes.string
}

export default reduxForm({
  form: 'LOGIN_FORM'
})(LoginForm)

import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import LoadingSpinner from '../LoadingSpinner';
import TextInput from '../TextInput';
import { required } from '../../utils/form';
import './LoginForm.css';

export class LoginForm extends React.Component {
  onFormSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const {
      error,
      pristine,
      invalid,
      submitting,
      onSubmit,
      promiseLoading
    } = this.props

    return (
      <section className='login-form'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreenIgnoreSidebar
        />

        <form onSubmit={this.onFormSubmit}>

          <Field name='username'
            component={TextInput}
            type='text'
            placeholder='Username'
            label='Username'
            validate={required}
            hideLabel
            autoFocus
          />

          <br />

          <Field name='password'
            component={TextInput}
            type='password'
            placeholder='Password'
            label='Password'
            validate={required}
            hideLabel
          />

          {error && <p className='form-error'>{error}</p>}

          <br />

          <div>
            <button
              type='submit'
              className='btn-lg'
              disabled={error || pristine || submitting || promiseLoading || invalid}
              onClick={onSubmit}>Login
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
  invalid: PropTypes.bool,
  promiseLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'LOGIN_FORM'
})(LoginForm);

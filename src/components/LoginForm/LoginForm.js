import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import LoadingSpinner from '../LoadingSpinner';
import TextInput from '../TextInput';
import { required } from '../../utils/form';

export class LoginForm extends React.Component {
  onFormSubmit(ev) {
    ev.preventDefault();
  }

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

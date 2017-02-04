import React from 'react'
import { browserHistory } from 'react-router'
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

  componentWillUpdate(props) {
    if (props.postSuccess === true) {
      browserHistory.push('/dashboard');
    }
  }

  render() {

    const { error, handleSubmit, pristine, reset, submitting, onSubmit, postSuccess } = this.props

    return (
      <section className='login-form'>
      {postSuccess ? (
        <div>success!</div>
      ) : (
        <div>
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
        </div>
        )}

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

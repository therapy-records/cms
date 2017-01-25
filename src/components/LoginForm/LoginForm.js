import React from 'react'
import { Link } from 'react-router'
import './LoginForm.scss'

export const LoginForm = () => (
  <div className="login-form">
    <form>
      <input type="text" placeholder="email" />
      <br/>
      <input type="password" placeholder="password" />
      <br/>
      <button>Login</button>
    </form>
  </div>
)

export default LoginForm

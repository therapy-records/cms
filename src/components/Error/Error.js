import React from 'react'
import { browserHistory } from 'react-router'

export class ErrorComponent extends React.Component {

  redirectToHome() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <h3>Oh no, 404 :(</h3>
        <button onClick={() => this.redirectToHome()} className='btn-logout'>Go home</button>
      </div>
    )
  }
}
export default ErrorComponent

import React from 'react'
import { browserHistory } from 'react-router'

export class ErrorComponent extends React.Component {

  redirectToHome() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <h3>Oh no :(</h3>
        <p>Sorry, we couldn't find that page.</p>
        <br />
        <button className='btn btn-logout'
                onClick={() => this.redirectToHome()}>Go home
        </button>
      </div>
    )
  }
}
export default ErrorComponent

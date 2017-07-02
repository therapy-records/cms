import React from 'react'
import { Link, browserHistory } from 'react-router'

class ErrorComponent extends React.Component {

  redirectToHome(){
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <h3>Oh no, 404 :(</h3>
        <button onClick={() => this.redirectToHome()} className="btn-logout">Go home</button>
      </div>
    )
  }
}

export default ErrorComponent

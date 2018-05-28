import React from 'react'
import { Link } from 'react-router-dom';

export class ErrorComponent extends React.Component {
  render() {
    return (
      <div>
        <h3>Oh no :(</h3>
        <p>Sorry, we couldn't find that page.</p>
        <br />
        <Link to='/'>Go home</Link>

      </div>
    )
  }
}
export default ErrorComponent

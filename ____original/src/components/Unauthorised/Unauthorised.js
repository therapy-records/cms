import React from 'react';
import { Link } from 'react-router';

class Unauthorised extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: '200px' }}>
        <p>Session expired</p>
        <p>Please <Link to='/'>login</Link> to continue.</p>
      </div>
    )
  }
}

export default Unauthorised;

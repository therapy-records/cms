import React from 'react';
import { Link } from 'react-router-dom';

class Collaborators extends React.Component {
  render() {
    return (
      <div className='container'>

        <div className='heading-with-btns'>
          <div>
            <h2>Collaborators 🌈</h2>
          </div>
          <div className='action-btns'>
            <Link to='journalism/create' className='btn'>Create</Link>
          </div>
        </div>

      </div>
    )
  }
}

export default Collaborators

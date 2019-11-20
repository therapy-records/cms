import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COLLABORATORS } from '../../../queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import List from '../../../components/List';
import ErrorMessage from '../../../components/ErrorMessage';

const Collaborators = () => {
  const {
    loading,
    error,
    data
  } = useQuery(GET_COLLABORATORS);

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

      <LoadingSpinner
        active={loading}
        fullScreen
      />

      {error && <ErrorMessage />}

      {(data && data.collaborators) && (
        <List
          data={data.collaborators}
          route='collaborators'
        />
      )}

      {/* 
        {data && data.collaborators.map(collab => (
          <li
            key={collab._id}
            className='article-card'
          >

            <div className='img-container'>
              <img src={collab.avatarUrl} alt={collab.name} />
            </div>

            <div>
              <h3><Link to={`/collaborators/${collab._id}`}>{collab.name}</Link></h3>
              <div className='btns-always-inline'>
                <Link to={`/collaborators/${collab._id}`} className='btn btn-sm btn-view'>View</Link>
                <Link to={`/collaborators/${collab._id}/edit`} className='btn btn-sm btn-edit'>Edit</Link>
              </div>
            </div>

          </li>
        ))}
      */}

    </div>
  );
}

export default Collaborators

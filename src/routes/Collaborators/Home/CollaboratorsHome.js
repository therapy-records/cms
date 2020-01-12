import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COLLABORATORS } from '../../../queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import List from '../../../components/List';
import ErrorMessage from '../../../components/ErrorMessage';

const CollaboratorsHome = () => {
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
          <Link to='collaborators/create' className='btn'>Create</Link>
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
          columns
        />
      )}

    </div>
  );
}

export default CollaboratorsHome;

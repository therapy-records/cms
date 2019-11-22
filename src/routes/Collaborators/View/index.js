import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COLLABORATOR } from '../../../queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';

const CollaboratorView = ({match}) => {
  const { id: collabId } = match.params;

  console.log('collab id: ', collabId);

  const {
    loading,
    error,
    data
  } = useQuery(GET_COLLABORATOR, {
    variables: {
      id: collabId
    }
  });

  return (
    <article className='container'>

      <LoadingSpinner
        active={loading}
        fullScreen
      />

      {error && <ErrorMessage />}

      {(data && data.collaborator) && (
        <div>
          <div className='heading-with-btns'>
            <div>
              <h2>{data.collaborator.name}</h2>
            </div>

            <div className='action-btns'>
              <button
                className='btn btn-danger'
              >Delete
              </button>

              <Link
                to='/test'
                className='btn btn-edit'
              >Edit
              </Link>
            </div>
            
          </div>

          <div>
            <img
              src={data.collaborator.avatarUrl}
              alt={data.collaborator.name}
            />

            <p>{data.collaborator.about}</p>

            {data.collaborator.collabOn && <p>collab on: {data.collaborator.collabOn}</p>}


            {/* TODO: urls.other.map */}

            {data.collaborator.urls && (
              <ul>
                {Object.keys(data.collaborator.urls).map(urlKey => {
                  const urlValue = data.collaborator.urls[urlKey];
                  if (urlValue) {
                    return (
                      <li key={urlKey}>
                        {urlKey}:&nbsp;
                        <a
                          href={urlValue}
                          target='_blank'
                        >
                          {urlValue}
                        </a>
                      </li>
                    )
                  }
                  return null;
                })}
              </ul>
            )}

          </div>

        </div>
      )}


    </article>
  );
};


CollaboratorView.propTypes = {
  match: PropTypes.shape({ 
    params: PropTypes.object
  })
};

export default CollaboratorView;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COLLABORATOR } from '../../../queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import './CollaboratorsView.css';

const CollaboratorView = ({match}) => {
  const { id: collabId } = match.params;

  const {
    loading,
    error,
    data
  } = useQuery(GET_COLLABORATOR, {
    variables: {
      id: collabId
    }
  });

  const renderHtml = data => {
    return { __html: data };
  };

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

            <div dangerouslySetInnerHTML={renderHtml(data.collaborator.about)} />

            {(data.collaborator.collabOn && data.collaborator.collabOn.length > 0) && <p>Collaborations: {data.collaborator.collabOn}</p>}

            {data.collaborator.urls && (
              <ul>
                {Object.keys(data.collaborator.urls).map(urlKey => {
                  const urlValue = data.collaborator.urls[urlKey];

                  if (urlValue && urlKey !== 'other') {
                    return (
                      <li key={urlKey}>
                        
                        <span>{urlKey}:&nbsp;</span>

                        {urlKey === 'phone' && (
                          <span>{urlValue}</span>
                        )}

                        {urlKey !== 'phone' && (
                          <a
                            href={urlValue}
                            target='_blank'
                          >
                            {urlValue}
                          </a>
                        )}

                      </li>
                    )
                  } else if (urlKey === 'other' && urlValue.length > 0) {
                    return (
                      <li key={urlKey}>
                        <ul className="collaborator-urls-other">
                          {urlValue.map((urlObj) => (
                            <li key={urlObj.title}>
                              {urlObj.title}:&nbsp;
                              <a
                                href={urlObj.url}
                                target='_blank'
                              >
                                {urlObj.url}
                              </a>
                            </li>
                          ))}
                        </ul>
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

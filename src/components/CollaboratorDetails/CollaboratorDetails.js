import React from 'react';
import PropTypes from 'prop-types';
import { arrayOfStringsHasValues } from '../../utils/arrays';
import CollaboratorUrls from './CollaboratorUrls';

const CollaboratorDetails = ({
  name,
  role,
  avatarUrl,
  about,
  collabOn,
  urls
}) => {
  const renderHtml = htmlData => {
    return { __html: htmlData };
  };

  const hasCollabOn = arrayOfStringsHasValues(collabOn);

  return (
    <div className='entity-container'>

      <div className='flex-root'>

        <div className='entity-image-container'>
          <img
            src={avatarUrl}
            alt={name}
          />
        </div>

        <div>

          {role && (
            <div className='collaborator-role'>
              <h4>What they do</h4>
              <p>{role}</p>
            </div>
          )}

          {about && (
            <div className='collaborator-about'>
              <h4>About</h4>
              <div dangerouslySetInnerHTML={renderHtml(about)} />
            </div>
          )}

          {hasCollabOn && (
            <div>
              <h4>Collaborations</h4>
              <ul>
                {collabOn.map(collab => (
                  <li key={collab}>{collab}</li>
                ))}
              </ul>
            </div>
          )}

          {urls &&
            <CollaboratorUrls urls={urls} />
          }

        </div>

      </div>

    </div>
  );
};

CollaboratorDetails.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  about: PropTypes.string,
  collabOn: PropTypes.arrayOf(PropTypes.string),
  urls: PropTypes.object
};

CollaboratorDetails.defaultProps = {
  role: '',
  about: '',
  collabOn: [],
  urls: {}
};

export default CollaboratorDetails;

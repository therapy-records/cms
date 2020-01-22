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
    <div>
      <img
        src={avatarUrl}
        alt={name}
      />

      {role && <p>{role}</p>}

      {about && <div dangerouslySetInnerHTML={renderHtml(about)} />}

      {hasCollabOn && (
        <div>
          <p>Collaborations:</p>
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

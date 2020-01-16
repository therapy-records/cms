import React from 'react';
import PropTypes from 'prop-types';
import { arrayOfStringsHasValues } from '../../utils/arrays';

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
        <ul>
          {Object.keys(urls).map(urlKey => {
            const urlValue = urls[urlKey];

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

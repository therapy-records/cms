import React from 'react';
import PropTypes from 'prop-types';
import { objectHasValues } from '../../utils/objects'

const CollaboratorUrls = ({ urls }) => {
  if (objectHasValues(urls)) {
    return (
      <div>
        <h4>Links</h4>

        <ul>
          {Object.keys(urls).map(urlKey => {
            const urlValue = urls[urlKey];
            const isPhone = key => key === 'phone';

            if (urlValue) {
              return (
                <li key={urlKey}>

                  <span>{urlKey}:&nbsp;</span>

                  {isPhone(urlKey) ? (
                    <span>{urlValue}</span>
                  ) : (
                    <a
                      href={urlValue}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {urlValue}
                    </a>
                  )}

                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
  return null;
};

CollaboratorUrls.propTypes = {
  urls: PropTypes.object.isRequired
};

export default CollaboratorUrls;

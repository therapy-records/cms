import React from 'react';
import PropTypes from 'prop-types';

const CollaboratorUrls = ({ urls }) => (
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
                >
                  {urlValue}
                </a>
            )}

          </li>
        )
      }

      return null;
    })}
  </ul>
)

CollaboratorUrls.propTypes = {
  urls: PropTypes.object.isRequired
};

export default CollaboratorUrls;

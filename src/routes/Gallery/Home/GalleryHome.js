import React from 'react';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_GALLERY } from '../../../queries';
import GalleryHomeContent from './GalleryHomeContent';

const GalleryHome = () => {
  return (
    <div className='container'>

      <QueryContainer
        query={GET_GALLERY}
        entityName='gallery'
        render={(queryData) => (
          <GalleryHomeContent
            listItems={queryData}
          />
        )}
      />

    </div>
  );
};

export default GalleryHome;

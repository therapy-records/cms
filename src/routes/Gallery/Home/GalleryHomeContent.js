import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import List from '../../../components/List';
import GalleryListItem from './GalleryListItem';

const GalleryHomeContent = ({ listItems }) => {
  const buttonDisabled = false;
  const showSortableList = false;

  return (
    <div>
      <PageHeader
        heading='Gallery 🌻'
        entityCollection='gallery'
        bespokeButton={
          <button
            // onClick={() => {
            //   if (showSortableList) {
            //     executeMutation()
            //   } else {
            //     toggleShowSortableList(true)
            //   }
            // }}
            className='btn'
            disabled={buttonDisabled}
          >
            {showSortableList ? 'Update order' : 'Change order'}
          </button>
        }
        renderCreateButton={!showSortableList}
        createButtonCopy='Upload'
      />

      <List
        data={listItems}
        route='gallery'
        columns
        columnnsPerRow={4}
        listItemComponent={GalleryListItem}
      />

    </div>
  );
};

GalleryHomeContent.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default GalleryHomeContent

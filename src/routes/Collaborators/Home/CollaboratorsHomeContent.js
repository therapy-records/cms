import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import CollaboratorsList from '../../../components/CollaboratorsList';

const CollaboratorsHomeContent = ({
  listItems,
  executeMutation,
  onListOrderChanged,
  listOrderHasChanged
}) => {
  const [showSortableList, toggleShowSortableList] = useState(false);

  const buttonDisabled = (showSortableList && !listOrderHasChanged);

  return (
    <div>

      <PageHeader
        heading='Collaborators 🌈'
        entityCollection='collaborators'
        bespokeButton={
          <button
            onClick={() => {
              if (showSortableList) {
                executeMutation()
              } else {
                toggleShowSortableList(true)
              }
            }}
            className='btn'
            disabled={buttonDisabled}
          >
            {showSortableList ? 'Update order' : 'Change order'}
          </button>
        }
        renderCreateButton={!showSortableList}
      />

      <CollaboratorsList
        listItems={listItems}
        showSortableList={showSortableList}
        onOrderChanged={onListOrderChanged}
      />

    </div>
  );
}

CollaboratorsHomeContent.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  executeMutation: PropTypes.func.isRequired,
  onListOrderChanged: PropTypes.func.isRequired,
  listOrderHasChanged: PropTypes.bool
};

CollaboratorsHomeContent.defaultProps = {
  listOrderHasChanged: false
};

export default CollaboratorsHomeContent;

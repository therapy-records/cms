import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CollaboratorsList from '../../../components/CollaboratorsList';

const CollaboratorsHomeContent = ({
  listItems,
  executeMutation,
  onListOrderChanged
}) => {
  
  const [showSortableList, toggleShowSortableList] = useState(false);

  return (
    <div>

      <div className='heading-with-btns'>

        <div>
          <h2>Collaborators 🌈</h2>
        </div>

        <div className='action-btns'>
          <button
            onClick={() => {
              if (showSortableList) {
                executeMutation()
              } else {
                toggleShowSortableList(true)
              }
            }}
            className='btn'
          >
            {showSortableList ? 'Update order' : 'Change order'}
          </button>

          <Link to='collaborators/create' className='btn'>Create</Link>

        </div>
      </div>

      <CollaboratorsList
        listItems={listItems}
        showSortableList={showSortableList}
        // onOrderChanged={(reorderedList) => onListOrderChanged(reorderedList)}
        onOrderChanged={onListOrderChanged}
      />

    </div>
  );
}

CollaboratorsHomeContent.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  executeMutation: PropTypes.func.isRequired,
  onListOrderChanged: PropTypes.func.isRequired
};

export default CollaboratorsHomeContent;

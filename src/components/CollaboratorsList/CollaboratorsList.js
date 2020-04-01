import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import reducer, { initReducerState } from './reducer';
import List from '../List';
import SortableList from '../SortableList';

const CollaboratorsList = ({
  listItems,
  onOrderChanged,
  showSortableList
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    listItems,
    initReducerState
  );

  const handleOnSortingUpdated = (oldIndex, newIndex) => {
    const updatedListItems = arrayMove(state.items, oldIndex, newIndex);

    updatedListItems.map((item, index) => {
      item.orderNumber = index;
    });

    dispatch({
      type: 'setListItems',
      payload: updatedListItems
    });
    onOrderChanged(updatedListItems);
  }

  const sortedItems = state.items.sort((a, b) => {
    return a.orderNumber - b.orderNumber
  });

  return (
    <div>
      {showSortableList ? (
        <SortableList
          items={sortedItems}
          route='collaborators'
          onSortingUpdated={handleOnSortingUpdated}
        />
      ) : (
        <List
          data={sortedItems}
          route='collaborators'
          columns
        />
      )}
    </div>
  )
}

CollaboratorsList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOrderChanged: PropTypes.func.isRequired,
  showSortableList: PropTypes.bool
};

CollaboratorsList.defaultProps = {
  showSortableList: false
};

export default CollaboratorsList;

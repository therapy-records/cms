import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import SortableItem from './SortableItem';

export const SortableListContainer = SortableContainer(({
  children,
  sortingActive
}) => {
  let className = 'list list-with-columns';
  if (sortingActive) {
    className = `${className} sortable-list-active`;
  }

  return (
    <ul className={className}>
      {children}
    </ul>
  )
});

SortableListContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

const SortableListComponent = ({
  items,
  route
}) => {
  const [ listItems, setListItems ] = useState(items);
  const [ sortingActive, setSortingActive ] = useState(false);

  const onSortStart = () => {
    setSortingActive(true);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setListItems(
      arrayMove(listItems, oldIndex, newIndex)
    )
    setSortingActive(false);
  }

  return (
    <SortableListContainer
      onSortStart={onSortStart}
      onSortEnd={onSortEnd}
      axis='xy'
      lockToContainerEdges
      useDragHandle
      helperClass='sortable-list-active-item'
      sortingActive={sortingActive}
    >
      {listItems.map((item, index) => {
        return (
          <SortableItem
            key={`item-${item._id}`}
            index={index}
            item={item}
            route={route}
            cardDesign
            isDraggable
          />
        );
      })}
    </SortableListContainer>
  );
}
SortableListComponent.componentName = 'SortableListContainer';

SortableListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  route: PropTypes.string.isRequired
};

export default SortableListComponent;

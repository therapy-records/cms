import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import './SortableList.css';

export const SortableListContainer = SortableContainer(({
  children,
  sortingActive
}) => {
  let className = 'list list-with-columns sortable-list';
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
  route,
  onSortingUpdated
}) => {

  const [ sortingActive, setSortingActive ] = useState(false);

  const onSortStart = () => {
    setSortingActive(true);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSortingActive(false);
    onSortingUpdated(oldIndex, newIndex);
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
      {items.map((item, index) => {
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

SortableListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  route: PropTypes.string.isRequired,
  onSortingUpdated: PropTypes.func.isRequired
};

export default SortableListComponent;

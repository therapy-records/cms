import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
// import List from '../../../components/List'; 
import ListItem from '../../components/List/ListItem'; 
import { getFirstImageInArticle } from '../../utils/news';
import entityHeading from '../../utils/entityHeading';

// TODO: how to align List and SortableList for classnames and event passings

const SortableItem = SortableElement(({
  item,
  index,
  itemsHaveMultipleImages
}) => {

  const {
    date,
    releaseDate,
    imageUrl,
    avatarUrl
  } = item;

  const itemTitle = entityHeading(item);
  const itemDate = date || releaseDate;
  const itemImageUrl = itemsHaveMultipleImages ? getFirstImageInArticle(item) : (imageUrl || avatarUrl);

  return (
    <ListItem
      index={index}
      key={item._id}
      _id={item._id}
      title={itemTitle}
      imageUrl={itemImageUrl}
      date={itemDate}
      route='collaborators'
      cardDesign
    />
  )
});

const SortableList = SortableContainer(({
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

SortableList.propTypes = {
  children: PropTypes.any.isRequired
};


const SortableComponent = ({ items }) => {
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
    <div>
      <SortableList
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
            />
          );
        })}
      </SortableList>
    </div>
  );
}

SortableComponent.propTypes = {
  items: PropTypes.array.isRequired
};

export default SortableComponent;

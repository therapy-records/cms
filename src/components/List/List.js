import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import listItemPropsHandler from '../../utils/list-item-props-handler';
import './List.css';

const List = ({
  data,
  route,
  onItemClick,
  onViewButtonClick,
  onEditButtonClick,
  itemsHaveMultipleImages,
  columns
}) => {

  let className = 'list ';
  if (columns) {
    className += 'list-with-columns'
  }

  return (
    <ul className={className}>
      {data.map(item => (
        <ListItem
          key={item._id}
          {...listItemPropsHandler({
            item,
            route,
            itemsHaveMultipleImages,
            cardDesign: columns
          })}
          onItemClick={() => onItemClick && onItemClick(item)}
          onViewButtonClick={() => onViewButtonClick && onViewButtonClick(item)}
          onEditButtonClick={() => onEditButtonClick && onEditButtonClick(item)}
        />
      ))}
    </ul>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  route: PropTypes.string.isRequired,
  onItemClick: PropTypes.func,
  onViewButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  itemsHaveMultipleImages: PropTypes.bool,
  columns: PropTypes.bool
};

List.defaultProps = {
  onItemClick: null,
  onViewButtonClick: null,
  onEditButtonClick: null,
  itemsHaveMultipleImages: false,
  columns: false
};

export default List;

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
  columns,
  columnnsPerRow,
  listItemComponent
}) => {
  let className = 'list ';
  if (columns) {
    className += 'list-with-columns';
    if (columnnsPerRow) {
      className += ` columns-${columnnsPerRow}`;
    }
  }

  return (
    <ul className={className}>
      {data.map(item =>
        listItemComponent ? (
          React.createElement(listItemComponent, { key: item._id, ...item })
        ) : (
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
        )
      )}
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
  columns: PropTypes.bool,
  columnnsPerRow: PropTypes.number,
  listItemComponent: PropTypes.func
};

List.defaultProps = {
  onItemClick: null,
  onViewButtonClick: null,
  onEditButtonClick: null,
  itemsHaveMultipleImages: false,
  columns: false,
  columnnsPerRow: 3,
  listItemComponent: null
};

export default List;

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { getFirstImageInArticle } from '../../utils/news';
import './List.css';

// TODO: refactor data models so there is no need for 
// heading || title || name
// date || releaseDate
// imageUrl || avatarUrl
// etc.

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
      {data.map(item => {
        const {
          heading,
          title,
          name,
          date,
          releaseDate,
          imageUrl,
          avatarUrl
        } = item;

        const itemTitle = heading || title || name;
        const itemDate = date || releaseDate;
        const itemImageUrl = itemsHaveMultipleImages ? getFirstImageInArticle(item) : (imageUrl || avatarUrl);

        return (
          <ListItem
            key={item._id}
            _id={item._id}
            title={itemTitle}
            imageUrl={itemImageUrl}
            date={itemDate}
            route={route}
            onItemClick={() => onItemClick && onItemClick(item)}
            onViewButtonClick={() => onViewButtonClick && onViewButtonClick(item)}
            onEditButtonClick={() => onEditButtonClick && onEditButtonClick(item)}
            cardDesign={columns}
          />
        );
      })}
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

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { getFirstImageInArticle } from '../../utils/news';

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
  itemsHaveMultipleImages
}) => {
  return (
    <ul className='cancel-margin'>
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

        const itemHeading = heading || title || name;
        const itemDate = date || releaseDate;
        const itemImageUrl = itemsHaveMultipleImages ? getFirstImageInArticle(item) : (imageUrl || avatarUrl);

        return (
          <ListItem
            key={item._id}
            _id={item._id}
            heading={itemHeading}
            imageUrl={itemImageUrl}
            date={itemDate}
            route={route}
            onItemClick={() => onItemClick(item)}
            onViewButtonClick={() => onViewButtonClick(item)}
            onEditButtonClick={() => onEditButtonClick(item)}
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
  itemsHaveMultipleImages: PropTypes.bool
};

List.defaultProps = {
  onItemClick: () => {},
  onViewButtonClick: () => {},
  onEditButtonClick: () => {},
  itemsHaveMultipleImages: false
};

export default List;

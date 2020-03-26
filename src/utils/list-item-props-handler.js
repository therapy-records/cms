import { getFirstImageInArticle } from './news';
import entityHeading from './entityHeading';

// TODO: refactor data models so there is no need for
// heading || title || name
// date || releaseDate
// imageUrl || avatarUrl
// etc.

const listItemPropsHandler = ({
  item,
  index,
  itemsHaveMultipleImages,
  route,
  cardDesign,
  isDraggable
}) => {
  const {
    _id,
    author,
    imageUrl,
    avatarUrl,
    excerpt,
    date,
    releaseDate
  } = item;

  // TODO: rename itemTitle / item.title to `heading`
  const itemTitle = entityHeading(item);
  const itemDate = date || releaseDate;
  const itemImageUrl = itemsHaveMultipleImages ? getFirstImageInArticle(item) : (imageUrl || avatarUrl);

  return {
    index: index,
    key: _id,
    _id,
    title: itemTitle,
    author,
    excerpt,
    imageUrl: itemImageUrl,
    date: itemDate,
    route,
    cardDesign,
    isDraggable
  };
};

export default listItemPropsHandler;

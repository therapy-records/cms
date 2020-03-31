import { getFirstImageInArticle } from './news';
import entityHeading from './entityHeading';
import moment from 'moment';

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
    releaseDate,
    date,
    location,
    venue,
    externalLink,
    ticketsUrl
  } = item;

  // TODO: rename itemTitle / item.title to `heading`
  const itemTitle = entityHeading(item);
  const itemImageUrl = itemsHaveMultipleImages ? getFirstImageInArticle(item) : (imageUrl || avatarUrl);

  let itemDescription = excerpt;

  if (!excerpt && (venue && location && date)) {
    itemDescription = `${venue}, ${location}, ${moment(new Date(date)).format('LT')}`;
  }
  const itemExternalLink = externalLink || ticketsUrl;

  return {
    index: index,
    key: _id,
    _id,
    title: itemTitle,
    author,
    description: itemDescription,
    imageUrl: itemImageUrl,
    date,
    releaseDate,
    route,
    cardDesign,
    isDraggable,
    externalLink: itemExternalLink
  };
};

export default listItemPropsHandler;

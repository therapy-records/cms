import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DragHandle from '../DragHandle';
import './ListItem.css';

const ListItem = ({
  _id,
  author,
  title,
  imageUrl,
  excerpt,
  date,
  route,
  onItemClick,
  onViewButtonClick,
  onEditButtonClick,
  cardDesign,
  isDraggable,
  location,
  venue,
  ticketsUrl
}) => {

  let containerClassName = cardDesign ? 'list-item-card' : 'list-item-row';

  if (isDraggable) {
    containerClassName += ' list-item-card-is-draggable'
  }

  return (
    <li className={containerClassName}>

      {isDraggable && <DragHandle />}

      {imageUrl &&
        <div className='img-container'>
          <img src={imageUrl} alt={title} />
        </div>
      }

      <div className='content-container'>
        <div className='content'>
          <div>
            <div className='small-tabs-container'>

              
              {location ? location : ''}
              {venue ? venue : ''}
              {ticketsUrl ? ticketsUrl : ''}

              {author && <p className='small-tab author'>{author}</p>}
              {date && <p className='small-tab'>{moment(new Date(date)).format('DD MMM YYYY')}</p>}
            </div>
            <h3>
              <Link
                onClick={onItemClick}
                to={`/${route}/${_id}`}
              >
                <span>{title}</span>
              </Link>
            </h3>
          </div>

          {excerpt && <p>{excerpt}</p>}

          <div className='btns-container btns-always-inline'>

            <Link
              onClick={onViewButtonClick}
              to={`/${route}/${_id}`}
              className='btn btn-xs'
            >
              View
            </Link>

            <Link
              onClick={onEditButtonClick}
              to={`/${route}/${_id}/edit`}
              className='btn btn-xs'
            >
              Edit
            </Link>

          </div>
        </div>
      </div>

    </li>
  );
};

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  route: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  date: PropTypes.string,
  onItemClick: PropTypes.func,
  onViewButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  cardDesign: PropTypes.bool,
  isDraggable: PropTypes.bool,
  location: PropTypes.string,
  venue: PropTypes.string.isRequired,
  ticketsUrl: PropTypes.string
};

ListItem.defaultProps = {
  author: '',
  imageUrl: '',
  excerpt: '',
  date: '',
  onItemClick: null,
  onViewButtonClick: null,
  onEditButtonClick: null,
  cardDesign: false,
  isDraggable: false,
  location: '',
  venue: '',
  ticketsUrl: ''
};

export default ListItem;


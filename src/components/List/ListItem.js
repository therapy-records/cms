import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DragHandle from '../DragHandle';
import './ListItem.css';

const ListItem = ({
  _id,
  title,
  author,
  categoryId,
  imageUrl,
  date,
  releaseDate,
  route,
  onItemClick,
  onViewButtonClick,
  onEditButtonClick,
  cardDesign,
  isDraggable,
  description,
  externalLink
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

      {date &&
        <div className='img-container'>
          <div className="date">
            <p>{moment(new Date(date)).format('ddd')}</p>
            <p>{moment(new Date(date)).format('DD')}</p>
            <p>{moment(new Date(date)).format('MMM')}</p>
          </div>
        </div>
      }

      <div className='content-container'>
        <div className='content'>
          <div>
            <div className='small-tabs-container'>
              <div>
                {categoryId && <p className='small-tab category'>{categoryId}</p>}
                {author && <p className='small-tab author'>{author}</p>}
              </div>
              {releaseDate && <p className='small-tab'>{moment(new Date(releaseDate)).format('DD MMM YYYY')}</p>}
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

          {description && <p>{description}</p>}
          {externalLink && <p><a href={externalLink} target='_blank' rel='noopener noreferrer'>{externalLink}</a></p>}

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
  categoryId: PropTypes.number,
  imageUrl: PropTypes.string,
  route: PropTypes.string.isRequired,
  date: PropTypes.string,
  releaseDate: PropTypes.string,
  onItemClick: PropTypes.func,
  onViewButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  cardDesign: PropTypes.bool,
  isDraggable: PropTypes.bool,
  description: PropTypes.string,
  externalLink: PropTypes.string
};

ListItem.defaultProps = {
  author: '',
  imageUrl: '',
  date: '',
  releaseDate: '',
  onItemClick: null,
  onViewButtonClick: null,
  onEditButtonClick: null,
  cardDesign: false,
  isDraggable: false
};

export default ListItem;

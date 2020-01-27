import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { SortableHandle } from 'react-sortable-hoc';

import './ListItem.css';

const DragHandle = SortableHandle(() => (
  <div className='btn-burger btn-draggable'>&#9776;</div>
));

const ListItem = ({
  _id,
  title,
  imageUrl,
  date,
  route,
  onItemClick,
  onViewButtonClick,
  onEditButtonClick,
  cardDesign
}) => {

  let buttonClassName = 'btn ';
  if (cardDesign) {
    buttonClassName += 'btn-xs';
  }

  const containerClassName = cardDesign ? 'list-item-card' : 'list-item-row';

  return (
    <li className={containerClassName}>

      <DragHandle />

      <div className='img-container'>
        <img src={imageUrl} alt={title} />
      </div>

      <div className='content-container'>
        <div className='content'>
          <div className='heading-with-btn'>
            <h3>
              <Link
                onClick={onItemClick}
                to={`/${route}/${_id}`}
              >
                <span>{title}</span>
                {date && <p className='small-tab'>{moment(date).format('DD MMM YYYY')}</p>}
              </Link>
            </h3>
          </div>

          <div className='btns-container btns-always-inline'>

            <Link
              onClick={onViewButtonClick}
              to={`/${route}/${_id}`}
              className={buttonClassName}
            >
              View
            </Link>

            <Link
              onClick={onEditButtonClick}
              to={`/${route}/${_id}/edit`}
              className={buttonClassName}
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
  imageUrl: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  date: PropTypes.string,
  onItemClick: PropTypes.func,
  onViewButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  cardDesign: PropTypes.bool
};

ListItem.defaultProps = {
  date: '',
  onItemClick: null,
  onViewButtonClick: null,
  onEditButtonClick: null,
  cardDesign: false
};

export default ListItem;


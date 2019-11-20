import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListItem = ({
  _id,
  heading,
  imageUrl,
  date,
  route,
  onItemClick,
  onViewButtonClick,
  onEditButtonClick
}) => {
  return (
    <li className='article-card'>

      <div className='img-container'>
        <img src={imageUrl} alt="" />
      </div>

      <div>
        <div className='heading-with-btn'>
          <h3>
            <Link
              onClick={onItemClick}
              to={`/${route}/${_id}`}
            >
              <span>{heading}</span>
              {date && <p className='small-tab'>{moment(date).format('DD MMM YYYY')}</p>}
            </Link>
          </h3>
        </div>

        <div className='btns-always-inline'>

          <Link
            onClick={onViewButtonClick}
            to={`/${route}/${_id}`}
            className='btn btn-sm btn-view'
          >
            View
          </Link>

          <Link
            onClick={onEditButtonClick}
            to={`/${route}/${_id}/edit`}
            className='btn btn-sm btn-edit'
          >
            Edit
          </Link>

        </div>
      </div>

    </li>
  );
};

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  date: PropTypes.string,
  onItemClick: PropTypes.func,
  onViewButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func
};

ListItem.defaultProps = {
  date: '',
  onItemClick: () => {},
  onViewButtonClick: () => {},
  onEditButtonClick: () => {}
};

export default ListItem;


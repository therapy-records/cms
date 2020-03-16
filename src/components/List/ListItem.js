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
  ticketsUrl,
  tag

}) => {

  let containerClassName = cardDesign ? 'list-item-card' : 'list-item-row';

  if (isDraggable) {
    containerClassName += ' list-item-card-is-draggable'
  }

  // For Gigs date
  let dateArray = date.split(" ");
  console.log(dateArray)
  let dateNumb = dateArray[2];
  let month = dateArray[1];
  let time = dateArray[4];
  console.log(time)
  // let splitted = time.split(":");
  // splitted.pop();
  // let rejoin = splitted.join(":");
  // console.log(rejoin);

  // if there is a venue (means we are in gigs)then render the gigs design.
  if (venue){
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
        <div className="gigs-card">
          <div className="left">
            <p>{dateNumb}</p>
            <p>{month}</p>
          </div>

              <div className="middle">
                <p className="title-gig">
                  <Link to={_id}>{title} at {time} </Link>
                </p>
                {/* <p>{date}</p> */}
                <p>{venue}</p>
                <p>{location}</p>
                <p>Tickets: <a href={ticketsUrl}>{ticketsUrl}</a></p>
                <div className="button">
                  <div>
                    <Link
                      onClick={onViewButtonClick}
                      to={`/${route}/${_id}`}
                      className='btn btn-xs'
                    >
                      View
            </Link>
                  </div>
                  <div>
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
            </div>
          </div>
        </div>
      </div>

    </li>
  );
  
  } else {
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
  }


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
  isDraggable: PropTypes.bool
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
  isDraggable: false
};

export default ListItem;


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteModal from '../DeleteModal';
import './styles.css';

class EntityPageHeader extends Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false
    };

    this.handleOnModalOpen = this.handleOnModalOpen.bind(this);
    this.handleOnModalClose = this.handleOnModalClose.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
  }

  handleOnModalOpen() {
    this.setState({ isShowingModal: true })
  }

  handleOnModalClose() {
    this.setState({ isShowingModal: false })
  }

  handleOnDelete() {
    this.props.onDeleteEntity(this.props.entity._id)
    this.handleOnModalClose();
  }

  render() {
    const {
      baseUrl,
      entity,
      heading,
      promiseLoading,
      showEditButton,
      showDeleteButton,
      longHeading
    } = this.props;

    const { isShowingModal } = this.state;

    const containerClassName = longHeading ? 'heading-with-btns long-heading' : 'heading-with-btns';

    return (
      <div>
        <div className={containerClassName}>
          <div>

            <h2>{heading}</h2>

            {entity.author &&
              <p className='small-tab author'>{entity.author}</p>
            }

            {(entity.releaseDate || entity.createdAt) && (
              <p className='small-tab'>Released {moment(entity.releaseDate || entity.createdAt).format('DD MMM YYYY')}</p>
            )}

            {entity.editedAt && (
              <p className='small-tab'>Edited {moment(entity.editedAt).fromNow()}</p>
            )}

          </div>

          {(showDeleteButton || showEditButton) && (
            <div className='action-btns'>

              {showDeleteButton && (
                <button
                  className='btn btn-danger'
                  onClick={this.handleOnModalOpen}
                >Delete
                </button>
              )}

              {showEditButton && (
                <Link
                  to={`${baseUrl}/${entity._id}/edit`}
                  className='btn btn-edit'
                >Edit
                </Link>
              )}

            </div>
          )}

        </div>

        {(showDeleteButton && !promiseLoading && isShowingModal) &&
          <DeleteModal
            onModalClose={this.handleOnModalClose}
            onDelete={this.handleOnDelete}
          />
        }

      </div>
    );
  }
}

EntityPageHeader.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  onDeleteEntity: PropTypes.func,
  promiseLoading: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  longHeading: PropTypes.bool
};

EntityPageHeader.defaultProps = {
  onDeleteEntity: null,
  promiseLoading: false,
  showEditButton: false,
  showDeleteButton: false,
  longHeading: false
};

export default EntityPageHeader;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteModal from '../DeleteModal';
import './styles.css';

// TODO: use hooks
class PageHeader extends Component {
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
      entityCollection,
      entity,
      heading,
      promiseLoading,
      renderEditButton,
      renderDeleteButton,
      renderCreateButton,
      bespokeButton,
      longHeading
    } = this.props;

    const { isShowingModal } = this.state;

    const containerClassName = longHeading ? 'page-header long-heading' : 'page-header';

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

          {(renderCreateButton || renderDeleteButton || renderEditButton || bespokeButton) && (
            <div className='action-btns'>


              {bespokeButton && (
                bespokeButton
              )}


              {renderDeleteButton && (
                <button
                  className='btn btn-danger'
                  onClick={this.handleOnModalOpen}
                >Delete
                </button>
              )}

              {renderEditButton && (
                <Link
                  to={`/${entityCollection}/${entity._id}/edit`}
                  className='btn'
                >Edit
                </Link>
              )}

              {renderCreateButton && (
                <Link
                  to={`/${entityCollection}/create`}
                  className='btn'
                >Create
                </Link>
              )}

            </div>
          )}

        </div>

        {(renderDeleteButton && !promiseLoading && isShowingModal) &&
          <DeleteModal
            onModalClose={this.handleOnModalClose}
            onDelete={this.handleOnDelete}
          />
        }

      </div>
    );
  }
}

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  entityCollection: PropTypes.string,
  entity: PropTypes.object,
  onDeleteEntity: PropTypes.func,
  promiseLoading: PropTypes.bool,
  renderEditButton: PropTypes.bool,
  renderDeleteButton: PropTypes.bool,
  renderCreateButton: PropTypes.bool,
  bespokeButton: PropTypes.node,
  longHeading: PropTypes.bool
};

PageHeader.defaultProps = {
  entityCollection: '',
  entity: {},
  onDeleteEntity: null,
  promiseLoading: false,
  renderEditButton: false,
  renderDeleteButton: false,
  renderCreateButton: false,
  bespokeButton: null,
  longHeading: false
};

export default PageHeader;

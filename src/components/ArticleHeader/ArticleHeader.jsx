import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ArticleDeleteModal from '../ArticleDeleteModal';
import './styles.css';

class ArticleHeader extends Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleOnDeleteArticle = this.handleOnDeleteArticle.bind(this);
  }

  handleModalOpen() {
    this.setState({ isShowingModal: true })
  }

  handleModalClose() {
    this.setState({ isShowingModal: false })
  }

  handleOnDeleteArticle() {
    this.props.onDeleteArticle(this.props.article._id)
    this.handleModalClose();
  }

  render() {
    const {
      baseUrl,
      article,
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

            {heading ?
              <h2>{heading}</h2>
            :
              <h2>{article.title}</h2>
            }

            {(article.releaseDate || article.createdAt) && (
              <p className='small-tab'>Released {moment(article.releaseDate || article.createdAt).format('DD MMM YYYY')}</p>
            )}

            {article.editedAt && (
              <p className='small-tab'>Edited {moment(article.editedAt).fromNow()}</p>
            )}

          </div>

          {(showDeleteButton || showEditButton) && (
            <div className='action-btns'>

              {showDeleteButton && (
                <button
                  className='btn btn-danger'
                  onClick={this.handleModalOpen}
                >Delete
                </button>
              )}

              {showEditButton && (
                <Link
                  to={`${baseUrl}/${article._id}/edit`}
                  className='btn btn-edit'
                >Edit
                </Link>
              )}

            </div>
          )}

        </div>

        {(showDeleteButton && !promiseLoading && isShowingModal) &&
          <ArticleDeleteModal
            handleModalClose={this.handleModalClose}
            onDeleteArticle={this.handleOnDeleteArticle}
          />
        }

      </div>
    );
  }
}

ArticleHeader.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  article: PropTypes.object.isRequired,
  heading: PropTypes.string,
  onDeleteArticle: PropTypes.func,
  promiseLoading: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  longHeading: PropTypes.bool
};

ArticleHeader.defaultProps = {
  heading: '',
  onDeleteArticle: null,
  promiseLoading: false,
  showEditButton: false,
  showDeleteButton: false,
  longHeading: false
};

export default ArticleHeader;

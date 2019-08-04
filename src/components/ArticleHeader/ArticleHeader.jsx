import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ArticleDeleteModal from '../ArticleDeleteModal';
import './ArticleHeader.css';

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
      article,
      promiseLoading
    } = this.props;

    const { isShowingModal } = this.state;

    return (
      <div>
        <div className='article-header'>
          <div className='heading-with-btn'>
            <h2>{article.title}</h2>
            <p className='small-tab'>{moment(article.createdAt).fromNow()}</p>
            {article.editedAt &&
              <div className='heading-modified'>
                <p>Last modified {moment(article.editedAt).fromNow()}
                  <small>{moment(article.editedAt).format('DD/mm/YYYY')}</small>
                </p>
              </div>
            }
          </div>

          <div className='action-btns'>
            <button
              className='btn btn-danger'
              onClick={this.handleModalOpen}
            >Delete
                      </button>
            <Link
              to={`/news/${article._id}/edit`}
              className='btn btn-edit'
            >Edit
            </Link>
          </div>
        </div>

        {(!promiseLoading && isShowingModal) &&
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
  article: PropTypes.object.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool
};

ArticleHeader.defaultProps = {
  promiseLoading: false
};

export default ArticleHeader;

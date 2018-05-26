import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postOtherWork } from '../../../reducers/otherWork';
import { resetPromiseState } from '../../../reducers/uiState';
import OtherWorkArticleForm from '../../../components/OtherWorkArticleForm';

class ArticleCreate extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      promiseLoading,
      promiseSuccess,
      promiseError,
      location
    } = this.props;

    return (
      <div className='container'>
        {promiseLoading &&
          <p>loading...</p>
        }

        {promiseError &&
          <p>error posting article :( {promiseError.message}</p>
        }

        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully posted! <br /><br />🚀</h2>
            <Link to='/other-work' className='news-link'>Go to Other Work</Link>
          </div>
        }

        {!promiseLoading && !promiseSuccess &&
          <OtherWorkArticleForm
            onSubmitForm={this.props.onPostArticle}
            location={location}
          />
      }

      </div>
    )
  }
}

ArticleCreate.propTypes = {
  onPostArticle: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  location: PropTypes.object,
  resetPromiseState: PropTypes.func
}

const mapDispatchToProps = {
  onPostArticle: () => postOtherWork(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

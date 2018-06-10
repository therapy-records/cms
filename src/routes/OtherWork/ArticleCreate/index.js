import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postOtherWork } from '../../../reducers/otherWork';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import OtherWorkArticleForm from '../../../components/OtherWorkArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

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

        <LoadingSpinner
          fullScreen
          active={promiseLoading}
        />

        {promiseError &&
          <p>error posting article :( {promiseError.message}</p>
        }

        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully created! <small>🚀</small></h2>
            <div className='inline-flex'>
              <Link to='/other-work' className='btn'>Go to Other Work</Link>
              <Link to='/other-work/create'>Create another article</Link>
            </div>
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
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

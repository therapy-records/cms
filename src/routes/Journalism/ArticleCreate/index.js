import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postJournalism } from '../../../actions/journalism';
import { resetPromiseState } from '../../../actions/uiState';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import JournalismForm from '../../../components/JournalismForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ArticleCreate extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      promiseLoading,
      promiseSuccess,
      location,
      onPostArticle
    } = this.props;

    return (
      <div className='container'>

        <LoadingSpinner
          fullScreen
          active={promiseLoading}
        />

        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully created! <small>🚀</small></h2>
            <div className='inline-flex'>
              <Link to='/journalism' className='btn'>Go to Journalism</Link>
              <Link to='/journalism/create' className='btn'>Create another article</Link>
            </div>
          </div>
        }

        {!promiseLoading && !promiseSuccess &&
          <JournalismForm
            onSubmitForm={onPostArticle}
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
  location: PropTypes.object,
  resetPromiseState: PropTypes.func
}

const mapDispatchToProps = {
  onPostArticle: () => postJournalism(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

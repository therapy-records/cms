import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postNews } from '../../../actions/news';
import { resetPromiseState } from '../../../actions/uiState';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import NewsForm from '../../../components/NewsForm';
import SuccessMessage from '../../../components/FormElements/SuccessMessage';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ArticleCreate extends React.Component {
  constructor() {
    super();
    this.handleOnReset = this.handleOnReset.bind(this);
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  handleOnReset() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      location,
      promiseLoading,
      promiseSuccess,
      onPostArticle
    } = this.props;

    return (
      <div className='container'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading && promiseSuccess &&
          <SuccessMessage
            baseUrl='/news'
            copy={{
              homeLink: 'Go to News',
              createLink: 'Create another article'
            }}
            onReset={this.handleOnReset}
          />
        }

        {!promiseLoading && !promiseSuccess &&
          <NewsForm
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
  resetPromiseState: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onPostArticle: () => postNews(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)

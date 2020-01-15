import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postJournalism } from '../../../actions/journalism';
import { resetPromiseState } from '../../../actions/uiState';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import FormSuccess from '../../../components/FormElements/FormSuccess';
import JournalismForm from '../../../components/JournalismForm';
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
          <FormSuccess
            baseUrl='/journalism'
            copy={{
              homeLink: 'Go to Journalism',
              createLink: 'Create another article',
            }}
            onReset={this.handleOnReset}
          />
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
  resetPromiseState: PropTypes.func.isRequired
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

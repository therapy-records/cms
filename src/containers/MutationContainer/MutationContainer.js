import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyError from '../../components/StickyError';
import StickySuccess from '../../components/StickySuccess';
import SuccessMessage from '../../components/FormElements/SuccessMessage';

const MutationContainer = ({
  baseUrl,
  mutation,
  render,
  mutationVariables,
  successCopy,
  stickySuccess
}) => {

  const [
    executeMutation,
    {
      loading,
      error,
      data
    }
  ] = useMutation(mutation, {
    variables: mutationVariables
  });

  const mutationSuccess = (data && Object.keys(data).length > 0);
  const renderStickySuccess = (mutationSuccess && stickySuccess);
  const renderSuccessMessage = (mutationSuccess && !stickySuccess);
  const renderContent = (!loading && !mutationSuccess) || renderStickySuccess;

  return (
    <div>

      {renderStickySuccess && (
        <StickySuccess>
          <p>{successCopy.success}</p>
        </StickySuccess>
      )}
      
      {loading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {error && (
        <StickyError
          message='Sorry, something has gone wrong.'
          error={error}
        />
      )}

      {renderSuccessMessage && (
        <SuccessMessage
          baseUrl={baseUrl}
          copy={successCopy}
        />
      )}

      {renderContent && (
        render({
          executeMutation
        })
      )}

    </div>
  )
  
}

MutationContainer.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  mutation: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  mutationVariables: PropTypes.object,
  successCopy: PropTypes.shape({
    success: PropTypes.string,
    homeLink: PropTypes.string,
    createLink: PropTypes.string
  }).isRequired,
  stickySuccess: PropTypes.bool
};

MutationContainer.defaultProps = {
  mutationVariables: {},
  stickySuccess: false
};

export default MutationContainer;

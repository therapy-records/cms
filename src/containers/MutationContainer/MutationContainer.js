import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyError from '../../components/StickyError';
import SuccessMessage from '../../components/FormElements/SuccessMessage';

const MutationContainer = ({
  baseUrl,
  entityName,
  mutation,
  render,
  mutationVariables,
  successCopy
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
  const renderContent = (!loading && !mutationSuccess);

  return (
    <div>
    
      {loading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {error && (
        <StickyError>
          <p>Sorry, something has gone wrong.</p>
        </StickyError>
      )}

      {mutationSuccess && (
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
  entityName: PropTypes.string.isRequired,
  mutation: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  mutationVariables: PropTypes.object,
  successCopy: PropTypes.shape({
    success: PropTypes.string,
    homeLink: PropTypes.string,
    createLink: PropTypes.string
  }).isRequired
};

MutationContainer.defaultProps = {
  mutationVariables: {}
};

export default MutationContainer;

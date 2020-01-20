import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyNew from '../../components/StickyNew';
import SuccessMessage from '../../components/FormElements/SuccessMessage';

const MutationContainer = ({
  baseUrl,
  entityName,
  mutation,
  render,
  mutationVariables
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
        <StickyNew>
          <p>Sorry, something has gone wrong.</p>
        </StickyNew>
      )}

      {mutationSuccess && (
        <SuccessMessage
          baseUrl={baseUrl}
          copy={{
            success: 'Successfully mutated',
            homeLink: `Go to ${entityName}`
          }}
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
  mutationVariables: PropTypes.object
};

MutationContainer.defaultProps = {
  mutationVariables: {}
};

export default MutationContainer;

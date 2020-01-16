// SingleEntity is for a view/model, with either 'View'/'Edit' route
// this allows for View and Edit to both use the same header and query.

import React from 'react';
import PropTypes from 'prop-types';
import {
  useQuery
  // useMutation
} from '@apollo/react-hooks';
import ArticleHeader from '../../components/ArticleHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyNew from '../../components/StickyNew';
import FormSuccess from '../../components/FormElements/FormSuccess';

const SingleEntityContainer = ({
  baseUrl,
  entityName,
  component,
  query,
  queryVariables,
  mutation,
  mutationVariables
}) => {

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData
  } = useQuery(query, {
    variables: queryVariables
  });

  // const handleOnDelete = (mutation, id) => {
  //   mutation({
  //     variables: { id }
  //   })
  // }

  // const [
  //   executeMutation,
  //   {
  //     loading: mutationLoading,
  //     error: mutationError,
  //     data: mutationData
  //   }
  // ] = useMutation(mutation);
 
  const hasData = (queryData && queryData[entityName]);

  // const deleteSuccess = (deletedData && deletedData.deleteCollaborator._id);
  // const isLoading = (queryLoading || mutationLoading);
  // const hasError = (queryError || mutationError);
  const isLoading = queryLoading;
  const hasError = queryError;

  // const hasData = true;
  // const isLoading = false;
  const deleteSuccess = false;
  // const hasError = false;

  const renderPageContent = (hasData &&
                            !isLoading &&
                            !deleteSuccess);

  let heading = '';
  if (hasData) {
    heading = queryData[entityName].heading || 
              queryData[entityName].title ||
              queryData[entityName].name;
  }

  return (
    <article className='container'>

      {isLoading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {deleteSuccess && (
        <FormSuccess
          baseUrl={baseUrl}
          copy={{
            success: 'Successfully Deleted',
            homeLink: `Go to ${entityName}`
          }}
        />
      )}

      {hasError && (
        <StickyNew>
          <p>Sorry, something has gone wrong.</p>
        </StickyNew>
      )}

      {renderPageContent && (
        <div>

          <ArticleHeader
            baseUrl={baseUrl}
            article={{}}
            heading={heading}
            showDeleteButton
          />

          {component({
            ...queryData[entityName]
          })}

        </div>
      )}

    </article>
  );
};


SingleEntityContainer.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node
  ]).isRequired,
  query: PropTypes.object.isRequired,
  queryVariables: PropTypes.object,
  mutation: PropTypes.object,
  mutationVariables: PropTypes.object
};

SingleEntityContainer.defaultProps = {
  queryVariables: {},
  mutation: {},
  mutationVariables: {}
};

export default SingleEntityContainer;

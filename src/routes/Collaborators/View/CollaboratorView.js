import React from 'react';
import PropTypes from 'prop-types';
import {
  useQuery,
  useMutation
} from '@apollo/react-hooks';
import { GET_COLLABORATOR } from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import ArticleHeader from '../../../components/ArticleHeader';
import LoadingSpinner from '../../../components/LoadingSpinner';
import StickyNew from '../../../components/StickyNew';
import Collaborator from './Collaborator';
import './CollaboratorView.css';
import FormSuccess from '../../../components/FormElements/FormSuccess';

const CollaboratorView = ({ match }) => {
  const { id: collabId } = match.params;

  const {
    loading: queryLoading,
    error: queryError,
    data
  } = useQuery(GET_COLLABORATOR, {
    variables: {
      id: collabId
    }
  });

  const [
    deleteCollaborator,
    {
      loading: mutationLoading,
      error: mutationError,
      data: deletedData
    }
  ] = useMutation(DELETE_COLLABORATOR);

  const handleOnDelete = (mutation, id) => {
    mutation({
      variables: { id }
    })
  }

  const hasData = (data && data.collaborator);
  const deleteSuccess = (deletedData && deletedData.deleteCollaborator._id);
  const isLoading = (queryLoading || mutationLoading);
  const hasError = (queryError || mutationError);

  const renderPageContent = (hasData &&
                             !isLoading &&
                             !deleteSuccess);

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
          baseUrl='/collaborators'
          copy={{
            success: 'Successfully Deleted',
            homeLink: 'Go to Collaborators'
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
            baseUrl='/collaborators'
            article={{}}
            onDeleteArticle={() => handleOnDelete(deleteCollaborator, data.collaborator._id)}
            heading={data.collaborator.name}
            showDeleteButton
          />

          <Collaborator {...data.collaborator} />

        </div>
      )}

    </article>
  );
};


CollaboratorView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default CollaboratorView;

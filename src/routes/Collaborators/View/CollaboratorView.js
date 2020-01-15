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
import ErrorMessage from '../../../components/ErrorMessage';
import Collaborator from './Collaborator';
import './CollaboratorView.css';

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
      error: mutationError
    }
  ] = useMutation(DELETE_COLLABORATOR);

  const handleOnDelete = (mutation, id) => {
    mutation({
      variables: { id }
    })
  }


  return (
    <article className='container'>

      <LoadingSpinner
        active={queryLoading || mutationLoading}
        fullScreen
      />

      {(queryError || mutationError) && <ErrorMessage />}

      {(data && data.collaborator) && (
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

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { GET_COLLABORATOR } from '../../../queries';
import { EDIT_COLLABORATOR } from '../../../mutations';
import CollaboratorForm from '../../../components/CollaboratorForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';

const CollaboratorEdit = ({ match }) => {
  const { id: collabId } = match.params;

  const {
    loading,
    error,
    data
  } = useQuery(GET_COLLABORATOR, {
    variables: {
      id: collabId
    }
  });

  return (
    <article className='container'>

      <LoadingSpinner
        active={loading}
        fullScreen
      />

      {error && <ErrorMessage />}

      {(data && data.collaborator) && (
        <div>
          <div className='heading-with-btns'>
            <div>
              <h2>{data.collaborator.name}</h2>
            </div>

            {/*
            <div className='action-btns'>
              <button
                className='btn btn-danger'
              >Delete
              </button>

              <Link
                to={`/collaborators/${collabId}/edit`}
                className='btn btn-edit'
              >Edit
              </Link>
            </div>
            */}

          </div>

          <CollaboratorForm
            mutation={EDIT_COLLABORATOR}
            isEditForm
          />

        </div>
      )}


    </article>
  );
};


CollaboratorEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default CollaboratorEdit;

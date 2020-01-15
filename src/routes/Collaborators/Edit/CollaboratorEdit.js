import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import { EDIT_COLLABORATOR } from '../../../mutations';
import Form from '../../../components/Form';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import { mapFieldsWithValues } from '../../../utils/form';

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
              <h2>Edit Collaborator</h2>
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

          <Form
            mutation={EDIT_COLLABORATOR}
            fields={mapFieldsWithValues(COLLABORATOR_FIELDS, data.collaborator)}
            mutateId={collabId}
            refetchQueries={[
              { query: GET_COLLABORATORS }
            ]}
            baseUrl='/collaborators'
            successCopy={{
              homeLink: 'Go to Collaborators'
            }}
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

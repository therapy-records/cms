import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from '../../../components/ArticleHeader';
import { CollaboratorForm } from '../../../components/CollaboratorForm';

const CollaboratorCreate = props => {
  const {
    location
  } = props;

  let isEditForm;
  if (location && location.pathname.includes('edit')) {
    isEditForm = true;
  } else {
    isEditForm = false;
  }

  return (
    <article className='container'>
      <ArticleHeader
        baseUrl='/collaborators'
        article={{}}
        // onDeleteArticle={isEditForm ? () => onDeleteArticle(articleId) : () => { }}
        // promiseLoading={promiseLoading}
        heading={isEditForm ? `Editing TEST 🌈` : 'Add Collaborator 🌈'}
        showDeleteButton={isEditForm}
      />

      <div className='col-clear' />

      <CollaboratorForm isEditForm={isEditForm} />
        
    </article>
  );
};

CollaboratorCreate.propTypes = {
  location: PropTypes.object
};

CollaboratorCreate.defaultProps = {
  location: {}
};
export default CollaboratorCreate;


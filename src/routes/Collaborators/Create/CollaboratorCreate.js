import React from 'react';
import ArticleHeader from '../../../components/ArticleHeader';
import { CollaboratorForm } from '../../../components/CollaboratorForm';
import { CREATE_COLLABORATOR } from '../../../mutations';

const CollaboratorCreate = () => (
  <article className='container'>
    <ArticleHeader
      baseUrl='/collaborators'
      article={{}}
      // onDeleteArticle={isEditForm ? () => onDeleteArticle(articleId) : () => { }}
      // promiseLoading={promiseLoading}
      heading='Add Collaborator 🌈'
    />

    <div className='col-clear' />

    <CollaboratorForm
      mutation={CREATE_COLLABORATOR}
    />

  </article>
);

export default CollaboratorCreate;


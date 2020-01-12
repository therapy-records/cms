import React from 'react';
import ArticleHeader from '../../../components/ArticleHeader';
import { CollaboratorForm } from '../../../components/CollaboratorForm';

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

    <CollaboratorForm />

  </article>
);

export default CollaboratorCreate;


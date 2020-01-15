import React from 'react';
import ArticleHeader from '../../../components/ArticleHeader';
import Form from '../../../components/Form';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
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

    <Form
      mutation={CREATE_COLLABORATOR}
      fields={COLLABORATOR_FIELDS}
      baseUrl='/collaborators'
      successCopy={{
        homeLink: 'Go to Collaborators',
        createLink: 'Create another Collaborator'
      }}
    />

  </article>
);

export default CollaboratorCreate;


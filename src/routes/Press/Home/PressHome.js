import React from 'react';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_PRESS } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import List from '../../../components/List';
import EmptyMessage from '../../../components/EmptyMessage';
import { getPressCategoryById } from '../../../helpers';

const PressHome = () => {
  return (
    <div className='container'>

      <QueryContainer
        query={GET_PRESS}
        entityName='press'
        render={(queryData) => {
          const hasArticles = (queryData && queryData !== null) && queryData.length;

          let mappedArticles;

          if (hasArticles) {
            mappedArticles = queryData.map((article) => {
              const mapped = article;

              if (article.categoryId) {
                mapped.category = getPressCategoryById(article.categoryId).TEXT;
              }

              return mapped;
            });
          }

          return (
            <div>

              <PageHeader
                heading='Press 📢'
                entityCollection='press'
                renderCreateButton
              />

              {hasArticles ? (
                <List
                  data={mappedArticles}
                  route='press'
                />
              ) : (
                <EmptyMessage
                  entityName='press'
                  createCopy='Create Press'
                />
              )}

            </div>
          )
        }}
      />

    </div>
  )
}

export default PressHome;

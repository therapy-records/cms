import React from 'react';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_PRESS } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import List from '../../../components/List';
import EmptyMessage from '../../../components/EmptyMessage';

const PressHome = () => {
  return (
    <div className='container'>

      <QueryContainer
        query={GET_PRESS}
        entityName='press'
        render={(queryData) => {
          const hasArticles = (queryData && queryData !== null) && queryData.length;

          return (
            <div>

              <PageHeader
                heading='Press 📢'
                entityCollection='press'
                renderCreateButton
              />

              {hasArticles ? (
                <List
                  data={queryData}
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

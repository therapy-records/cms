import React from 'react';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_PRESS } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import List from '../../../components/List';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';


const PressHome = () => {

  return (
    <div className='container'>

      <QueryContainer
        query={GET_PRESS}
        entityName='press'
        render={(queryData) => {

          const hasArticles = (queryData && queryData !== null) && queryData.length;
          const sortedQueryData = queryData.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)).reverse();

          return (
            <div>          
            
              <PageHeader
                heading='Press 📢'
                entityCollection='press'
                renderCreateButton
              />

              {hasArticles ? (
                <List
                  data={sortedQueryData}
                  route='press'
                />
              ) : (
                <div>
                  <EmptyArticlesMessage type='journalism' />
                </div>
              )}

            </div>
          )
        }}
      />

    </div>
  )
}

export default PressHome;

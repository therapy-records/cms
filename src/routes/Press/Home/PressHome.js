import React from 'react';
import { Link } from 'react-router-dom';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_PRESS } from '../../../queries';
import List from '../../../components/List';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';



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

              <div className='heading-with-btns'>

                <div>
                  <h2>Press 📢</h2>
                </div>

                <div className='action-btns'>
                  <Link to='press/create' className='btn'>Create</Link>
                </div>
              </div>

              {hasArticles ? (
                <List
                  data={sortedQueryData}
                  route='press'
                />
              ) : (
                <div>
                  <EmptyMessage 
                    entityName='Press'
                    createCopy='Create Press' />
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

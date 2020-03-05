import React from 'react';
import { Link } from 'react-router-dom';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_PRESS } from '../../../queries';
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
                  data={queryData}
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

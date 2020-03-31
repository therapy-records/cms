import React from 'react'
import List from '../../components/List';
import QueryContainer from '../../containers/QueryContainer';
import { GET_GIGS } from "../../queries/index"
import { Link } from 'react-router-dom';
import EmptyMessage from '../../components/EmptyMessage';

const Gigs = () => {

  return (
    <div className='container'>

      <QueryContainer
        query={GET_GIGS}
        entityName='gigs'
        render={(queryData) => {

          const hasGigs = (queryData && queryData !== null) && queryData.length;
          const sortedQueryData = queryData.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)).reverse();

          return (
            <div>

              <div className='heading-with-btns'>

                <div>
                  <h2>Gigs 🗓️</h2>
                </div>

                <div className='action-btns'>
                  <Link to='gigs/create' className='btn'>Create</Link>
                </div>
              </div>
              

              {hasGigs ? (
                <List
                  data={sortedQueryData}
                  route='gigs'
                />
              ) : (
                <div>
                  <EmptyMessage 
                    entityName='gigs'
                    createCopy='Create a new Gig' />
                </div>
              )}

            </div>
          )
        }}
      />

    </div>
  )
}

export default Gigs;

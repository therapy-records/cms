import React from 'react'
import PageHeader from '../../components/PageHeader';
import List from '../../components/List';
import QueryContainer from '../../containers/QueryContainer';
import { GET_GIGS } from '../../queries/index';
import EmptyMessage from '../../components/EmptyMessage';

const Gigs = () => {
  return (
    <div className='container'>

      <QueryContainer
        query={GET_GIGS}
        entityName='gigs'
        render={(queryData) => {
          const hasGigs = (queryData && queryData !== null) && queryData.length;
          const sortedQueryData = queryData.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();

          return (
            <div>

              <PageHeader
                heading='Gigs 🗓️'
                entityCollection='gigs'
                renderCreateButton
              />

              {hasGigs ? (
                <List
                  data={sortedQueryData}
                  route='gigs'
                />
              ) : (
                <EmptyMessage
                  entityName='gigs'
                  createCopy='Create a new Gig'
                />
              )}

            </div>
          )
        }}
      />

    </div>
  )
}

export default Gigs;

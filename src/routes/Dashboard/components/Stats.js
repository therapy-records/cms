import React from 'react';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_STATS } from '../../../queries';

const Stats = () => (
  <div>

    <h3>Stats</h3>

    <QueryContainer
      query={GET_STATS}
      render={queryData => (
        <ul>
          <li>{queryData.news.length} News articles</li>
          <li>{queryData.journalism.length} Journalism articles</li>
          <li>{queryData.press.length} Press articles</li>
          <li>{queryData.collaborators.length} Collaborators</li>
          <li>{queryData.gigs.length} Gigs</li>
        </ul>
      )}
    />

  </div>
);

export default Stats

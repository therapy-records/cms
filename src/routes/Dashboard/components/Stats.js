import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_STATS } from '../../../queries';

const Stats = () => {
  const {
    loading,
    error,
    data
  } = useQuery(GET_STATS);


  return (
    <div>

      <h3>Stats</h3>

      {!loading && !error && (
        <ul>
          {data.news && <li>{data.news.length} News articles</li>}
          {data.journalism && <li>{data.journalism.length} Journalism articles</li>}
          {data.collaborators && <li>{data.collaborators.length} Collaborators</li>}
        </ul>
      )}

    </div>
  );
}

export default Stats

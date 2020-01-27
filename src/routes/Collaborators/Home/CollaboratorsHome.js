import React from 'react';
import { Link } from 'react-router-dom';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_COLLABORATORS } from '../../../queries';
// import CollaboratorsList from '../../../components/CollaboratorsList';
// import List from '../../../components/List'; 
import SortableList from '../../../components/SortableList'; 

const CollaboratorsHome = () => (
  <div className='container'>

    <div className='heading-with-btns'>
      <div>
        <h2>Collaborators 🌈</h2>
      </div>
      <div className='action-btns'>
        <Link to='collaborators/create' className='btn'>Create</Link>
      </div>
    </div>

    {/*
      <QueryContainer
      query={GET_COLLABORATORS}
      entityName='collaborators'
      render={queryData => (
        <CollaboratorsList items={queryData} />
      )}
    />
    */}

    <QueryContainer
      query={GET_COLLABORATORS}
      entityName='collaborators'
      render={queryData => (
        <SortableList
          items={queryData}
          route='collaborators'
        />
      )}
    />


  </div>
)

export default CollaboratorsHome;

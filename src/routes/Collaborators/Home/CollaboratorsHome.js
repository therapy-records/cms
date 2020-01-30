import React, { useState } from 'react';
import QueryContainer from '../../../containers/QueryContainer';
import MutationContainer from '../../../containers/MutationContainer';
import { GET_COLLABORATORS } from '../../../queries';
import { EDIT_COLLABORATORS_ORDER_NUMBERS } from '../../../mutations';
import CollaboratorsHomeContent from './CollaboratorsHomeContent';

const CollaboratorsHome = () => {

  const [ idsAndOrderNumbers, setIdsAndOrderNumbers ] = useState([]);

  const handleSetIdsAndOrderNumbers = reorderedList => {
    const arr = [];

    reorderedList.map(i => {
      arr.push({
        _id: i._id,
        orderNumber: i.orderNumber
      });
    });

    setIdsAndOrderNumbers(arr);
  }

  return (
    <div className='container'>

      <QueryContainer
        query={GET_COLLABORATORS}
        entityName='collaborators'
        render={(queryData) => (

          <MutationContainer
            baseUrl='/collaborators'
            mutation={EDIT_COLLABORATORS_ORDER_NUMBERS}
            mutationVariables={{
              input: {
                collaborators: idsAndOrderNumbers
              }
            }}
            successCopy={{
              success: 'Ordering updated!',
              homeLink: 'Go to Collaborators'
            }}
            render={({ executeMutation }) => (
              <CollaboratorsHomeContent
                listItems={queryData}
                executeMutation={executeMutation}
                onListOrderChanged={handleSetIdsAndOrderNumbers}
              />
            )}
          />

        )}
      />

    </div>
  )
}

export default CollaboratorsHome;

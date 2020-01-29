import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QueryContainer from '../../../containers/QueryContainer';
import MutationContainer from '../../../containers/MutationContainer';
import { GET_COLLABORATORS } from '../../../queries';
import { EDIT_COLLABORATORS_ORDER_NUMBERS } from '../../../mutations';
import CollaboratorsList from '../../../components/CollaboratorsList';

const CollaboratorsHome = () => {

  const [ showSortableList, toggleShowSortableList ] = useState(false);
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
              <div>

                <div className='heading-with-btns'>

                  <div>
                    <h2>Collaborators 🌈</h2>
                  </div>

                  <div className='action-btns'>
                    <button
                      onClick={() => {
                        if (showSortableList) {
                          executeMutation()
                        } else {
                          toggleShowSortableList(true)
                        }
                      }}
                      className='btn'
                    >
                      {showSortableList ? 'Update order' : 'Change order'}
                    </button>

                    <Link to='collaborators/create' className='btn'>Create</Link>

                  </div>
                </div>

                <CollaboratorsList
                  listItems={queryData}
                  showSortableList={showSortableList}
                  onOrderChanged={(reorderedList) => handleSetIdsAndOrderNumbers(reorderedList)}
                />

              </div>
            )}
          />

        )}
      />

    </div>
  )
}

export default CollaboratorsHome;

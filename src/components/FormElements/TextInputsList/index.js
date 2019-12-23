import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

function init(initialItems) {
  return { listItems: initialItems };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      return {
        listItems: [
          ...state.listItems,
          ''
        ]
      }
    }
    case 'edit': {
      const { index, value } = action.payload;
      const newListItems = [
        ...state.listItems
      ];
      newListItems[index] = value

      return {
        listItems: newListItems
      };
    }
    case 'remove': {
      const newListItems = state.listItems;
      newListItems.splice(action.payload.index, 1);
      return {
        listItems: newListItems
      };
    }

    default:
      throw new Error();
  }
}

const TextInputsList = ({
  label,
  name,
  items
}) => {
  const [state, dispatch] = useReducer(reducer, items, init);

  const handleOnChange = (index, value) => {
    let updatedListItems = state.listItems;
    updatedListItems[index] = value;
    dispatch({ type: 'edit', payload: { index, value } });
  };

  const { listItems } = state;

  return (
    <div>
      <fieldset>
        <legend>{label}</legend>

        <ul>
          {listItems.map((item, index) => {
            const key = `${name}-${index}`;
            return (
              <li key={key}>
                <input
                  id={key}
                  name={key}
                  type='text'
                  value={item}
                  onChange={ev => handleOnChange(index, ev.target.value)}
                />
                <button onClick={() => dispatch({ type: 'remove', payload: { index }})}>Remove</button>
              </li>
            )
          })}

        </ul>
      </fieldset>

      <input type='hidden' name={name} value={listItems} />

      <button onClick={() => dispatch({ type: 'add' })}>Add</button>
    </div>
  );
};

TextInputsList.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

export default TextInputsList;

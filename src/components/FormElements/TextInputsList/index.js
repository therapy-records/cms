import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { arrayOfObjectsHasValues } from '../../../utils/arrays';
import './TextInputsList.css';

function init(initialItems) {
  return { listItems: initialItems };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      return {
        listItems: [
          ...state.listItems,
          { value: '' }
        ]
      }
    }
    case 'edit': {
      const { index, value } = action.payload;
      const newListItems = [
        ...state.listItems
      ];
      newListItems[index].value = value

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
  name,
  items,
  fieldsetLegend,
  heading,
  showAddRemove,
  onChange,
  error,
  required
}) => {
  const [state, dispatch] = useReducer(reducer, items, init);

  const handleOnChange = (index, value) => {
    dispatch({ type: 'edit', payload: { index, value } });
    if (onChange) {
      // onChange(value);
      onChange(state.listItems);
    }
  };

  const { listItems } = state;

  return (
    <div className={showAddRemove ? 'text-inputs-list-with-add-remove' : 'text-inputs-list'}>
      <fieldset>

        {fieldsetLegend && <legend>{fieldsetLegend}</legend>}

        {heading && <h3>{heading}</h3>}

        <ul>
          {listItems.map((item, index) => {
            const key = `${name}-${index}`;
            const id = item.id ? `${name}.${item.id}` : `${name}.${index}`;
            return (
              <li key={key}>
                {item.label && <label htmlFor={id}>{item.label}</label>}
                <input
                  id={id}
                  name={id}
                  type='text'
                  value={item.value}
                  onChange={ev => handleOnChange(index, ev.target.value)}
                />
                {showAddRemove &&
                  <button
                    type='button'
                    onClick={() => dispatch({ type: 'remove', payload: { index }})}
                  >Remove</button>
                }
              </li>
            )
          })}

        </ul>
      </fieldset>

      {showAddRemove &&
        <button
          type='button'
          onClick={() => dispatch({ type: 'add' })}
        >Add</button>
      }

      {required && <p>this is a required field....</p>}

      {(required && !arrayOfObjectsHasValues(listItems)) && ( 
        <span className='form-error'>Field is required</span>
      )}

      {error && (
        <div>
          <span className='form-error'>{error}</span>
        </div>
      )}

    </div>
  );
};

TextInputsList.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  fieldsetLegend: PropTypes.string,
  heading: PropTypes.string,
  showAddRemove: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool
};

TextInputsList.defaultProps = {
  fieldsetLegend: '',
  heading: '',
  showAddRemove: false,
  onChange: () => {},
  error: '',
  required: false
};

export default TextInputsList;
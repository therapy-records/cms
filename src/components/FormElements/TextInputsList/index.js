import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer, { initReducerState } from './reducer';
import './TextInputsList.css';

const TextInputsList = ({
  name,
  items,
  fieldsetLegend,
  heading,
  showAddRemove,
  onChange
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    items,
    initReducerState
  );

  const handleOnChange = (index, value) => {
    dispatch({ type: 'edit', payload: { index, value } });
    if (onChange) {
      onChange(state.listItems);
    }
  };

  const { listItems } = state;

  return (
    <div className={showAddRemove ? 'text-inputs-list-with-add-remove' : 'text-inputs-list'}>
      <fieldset>

        {heading && <h5>{heading}</h5>}

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
                  type={item.type}
                  value={item.value}
                  placeholder={item.placeholder}
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

    </div>
  );
};

TextInputsList.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  fieldsetLegend: PropTypes.string,
  heading: PropTypes.string,
  showAddRemove: PropTypes.bool,
  onChange: PropTypes.func
};

TextInputsList.defaultProps = {
  fieldsetLegend: '',
  heading: '',
  showAddRemove: false,
  onChange: () => {}
};

export default TextInputsList;

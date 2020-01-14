import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInputsList from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) TextInputsList', () => {
  let wrapper;
  const props = {
    name: 'collaborators',
    label: 'Collaborated on',
    fieldsetLegend: 'collaborators',
    heading: 'URLs',
    items: [
      {
        id: 'test',
        value: 'testA',
        type: 'text',
        placeholder: 'test'
      },
      {
        id: 'test',
        value: 'testB',
        type: 'tel',
        placeholder: 'test'
      },
      {
        value: 'testB',
        type: 'email',
        placeholder: 'test',
      }
    ],
    showAddRemove: true
  };

  beforeEach(() => {
    wrapper = shallow(
      <TextInputsList {...props} />
    );
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h5>{props.heading}</h5>
    );
    expect(actual).to.eq(true);
  });


  it('should render a list of inputs and `remove` button', () => {
    const actual = wrapper.containsAllMatchingElements([
      <li key={0}>
        <input
          id={`${props.name}.${props.items[0].id}`}
          name={`${props.name}.${props.items[0].id}`}
          type={props.items[0].type}
          value={props.items[0].value}
          placeholder={props.items[0].placeholder}
        />
        <button>Remove</button>
      </li>,
      <li key={1}>
        <input
          id={`${props.name}.${props.items[1].id}`}
          name={`${props.name}.${props.items[1].id}`}
          type={props.items[1].type}
          value={props.items[1].value}
          placeholder={props.items[1].placeholder}
        />
        <button>Remove</button>
      </li>,
      <li key={2}>
        <input
          id={`${props.name}.2`}
          name={`${props.name}.2`}
          type={props.items[2].type}
          value={props.items[2].value}
          placeholder={props.items[2].placeholder}
        />
        <button>Remove</button>
      </li>
    ]);
    expect(actual).to.eq(true);
  });

  it('should render an `add` button', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Add</button>
    );
    expect(actual).to.eq(true);
  });

});

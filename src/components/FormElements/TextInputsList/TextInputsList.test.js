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
      'testA',
      'testB',
      'testC'
    ],
    showAddRemove: true
  };

  beforeEach(() => {
    wrapper = shallow(
      <TextInputsList {...props} />
    );
  });

  it('should render a fieldset legend', () => {
    const actual = wrapper.containsMatchingElement(
      <legend>{props.fieldsetLegend}</legend>
    );
    expect(actual).to.eq(true);
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h3>{props.heading}</h3>
    );
    expect(actual).to.eq(true);
  });


  it('should render a list of inputs and `remove` button', () => {
    const actual = wrapper.containsAllMatchingElements([
      <li>
        <input
          type='text'
          value={props.items[0]}
        />
        <button>Remove</button>
      </li>,
      <li>
        <input
          type='text'
          value={props.items[1]}
        />
        <button>Remove</button>
      </li>,
      <li>
        <input
          type='text'
          value={props.items[2]}
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

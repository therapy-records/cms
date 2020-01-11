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
      { value: 'testA' },
      { value: 'testB' },
      { value: 'testB' },
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
      <h5>{props.heading}</h5>
    );
    expect(actual).to.eq(true);
  });


  it('should render a list of inputs and `remove` button', () => {
    const actual = wrapper.containsAllMatchingElements([
      <li key={0}>
        <input
          type='text'
          value={props.items[0].value}
        />
        <button>Remove</button>
      </li>,
      <li key={1}>
        <input
          type='text'
          value={props.items[1].value}
        />
        <button>Remove</button>
      </li>,
      <li key={2}>
        <input
          type='text'
          value={props.items[2].value}
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

  it('should render an error message', () => {
    const mockError = 'This is required';
    wrapper.setProps({ error: mockError });
    const actual = wrapper.containsMatchingElement(
      <span>{mockError}</span>
    );
    expect(actual).to.eq(true);
  });

});

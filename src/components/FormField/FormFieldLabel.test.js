import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormFieldLabel from './FormFieldLabel';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormFieldLabel', () => {
  let wrapper,
      props = {
        id: 'test',
        label: 'Testing',
        required: true
      };
  
  beforeEach(() => {
    wrapper = shallow(
      <FormFieldLabel {...props} />
    )
  });

  it('should render', () => {
    const actual = wrapper.containsMatchingElement(
      <label htmlFor={props.id}>
        {props.label}<span className='required'>*</span>
      </label>
    );
    expect(actual).to.eq(true);
  });

});

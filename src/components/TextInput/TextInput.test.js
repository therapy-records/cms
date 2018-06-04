import React from 'react'
import { expect } from 'chai';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import TextInput from './TextInput';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) TextInput', () => {
  let wrapper;
  const mockProps = {
    input: {
      name: 'my input',
      value: '',
      component: 'Test'
    },
    label: 'testing',
    type: 'text',
    meta: {
      touched: false,
      error: false
    },
    placeholder: 'All the things',
    props: {
      test: true,
      testing: 'test'
    },
    smallLabelSize: false,
    hideLabel: false,
    autoFocus: false,
    required: false
  };
  const props = mockProps;

  beforeEach(() => {
    wrapper = shallow(
      <TextInput {...props} />
    );
  });

  it('should render an input with props', () => {
    const actual = wrapper.containsMatchingElement(
      <input
        {...mockProps.props.input}
        placeholder={mockProps.placeholder}
        type={mockProps.type}
        autoFocus={mockProps.autoFocus}
      />
    )
    expect(actual).to.eq(true);
  });

  it('should render a label with props', () => {
    const actual = wrapper.containsMatchingElement(
      <label>{mockProps.label}</label>
    )
    expect(actual).to.eq(true);
  });

  describe('with required prop', () => {
    it('should render a label with required star', () => {
      wrapper.setProps({
        required: true
      });
      const label = wrapper.find('label');
      const actual = label.containsMatchingElement(
        <span className='required'>*</span>
      )
      expect(actual).to.eq(true);
    });
  });

  it('should render an error', () => {
    const mockErrMessage = 'required/missing/something';
    wrapper.setProps({
      meta: {
        touched: true,
        error: mockErrMessage
      }
    });
    const actual = wrapper.containsMatchingElement(
      <span className='form-error'>{mockProps.label} is {mockErrMessage}</span>
    )
    expect(actual).to.eq(true);
  });
});

import React from 'react'
import { expect } from 'chai';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInputV2 from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) TextInputV2', () => {
  let wrapper;
  const props = {
    id: 'test',
    name: 'test',
    label: 'testing',
    type: 'text',
    placeholder: 'All the things',
    props: {
      test: true,
      testing: 'test'
    },
    hideLabel: false,
    autoFocus: false,
    required: false,
    maxLength: 10
  };

  beforeEach(() => {
    wrapper = shallow(
      <TextInputV2 {...props} />
    );
  });

  it('should render an input with props', () => {
    const actual = wrapper.containsMatchingElement(
      <input
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        autoFocus={props.autoFocus}
        maxLength={props.maxLength}
      />
    )
    expect(actual).to.eq(true);
  });

  it('should render a label with props', () => {
    const actual = wrapper.containsMatchingElement(
      <label>{props.label}</label>
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
    const mockErrorMessage = 'this is incorrect';
    wrapper.setProps({
      error: mockErrorMessage
    });
    const actual = wrapper.containsMatchingElement(
      <span className='form-error'>{props.label} is {mockErrorMessage}</span>
    )
    expect(actual).to.eq(true);
  });
});
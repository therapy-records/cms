import React from 'react'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) TextInput', () => {
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
      <TextInput {...props} />
    );
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

  describe('onChange', () => {
    it('should update the input value', () => {
      let input = wrapper.find('input');
      input.simulate('change', {
        target: { value: 'testing' }
      });
      input = wrapper.find('input');
      expect(input.prop('value')).to.eq('testing');
    });
    it('should call props.onChange', () => {
      const onChangeSpy = sinon.spy();
      wrapper.setProps({
        onChange: onChangeSpy
      });
      let input = wrapper.find('input');
      input.simulate('change', {
        target: { value: 'testing' }
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith('testing');
    });
  });

});

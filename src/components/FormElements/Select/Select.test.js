import React from 'react'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Select', () => {
  let wrapper;
  const props = {
    id: 'test',
    name: 'test',
    placeholder: 'All the things',
    options: [
      {
        text: 'Option A',
        value: 'A'
      },
      {
        text: 'Option B',
        value: 'B'
      }
    ],
    label: 'mock label',
    hideLabel: false,
    value: 'B'
  };

  beforeEach(() => {
    wrapper = shallow(
      <Select {...props} />
    );
  });

  it('should render a label', () => {
    const actual = wrapper.containsMatchingElement(
      <label>{props.label}</label>
    );

    expect(actual).to.eq(true);
  });

  describe('when props.hideLabel is true', () => {
    it('should NOT render a label', () => {
      wrapper.setProps({
        hideLabel: true
      });

      const label = wrapper.find('label');

      expect(label.length).to.eq(0);
    });
  });

  it('should render an input with props', () => {
    const element = wrapper.find('select');

    expect(element.length).to.eq(1);

    expect(element.prop('id')).to.eq(props.name);
    expect(element.prop('name')).to.eq(props.name);
    expect(typeof element.prop('onChange')).to.eq('function');
  });

  it('should render select options', () => {
    const actual = wrapper.containsAllMatchingElements([
      <option
        key={1}
        value={props.options[0].value}
        selected={false}
      >{props.options[0].text}</option>,
      <option
        key={2}
        value={props.options[1].value}
        selected={true}
      >{props.options[1].text}</option>
    ]);

    expect(actual).to.eq(true);
  });

  describe('onChange', () => {
    it('should call props.onChange', () => {
      const onChangeSpy = sinon.spy();

      wrapper.setProps({
        onChange: onChangeSpy
      });

      const element = wrapper.find('select');

      element.simulate('change', {
        target: { value: 'testing' }
      });

      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith('testing');
    });
  });

  describe('input.onChange', () => {
    it('should call props.input.onChange', () => {
      const onChangeSpy = sinon.spy();

      wrapper.setProps({
        input: {
          onChange: onChangeSpy
        }
      });

      const element = wrapper.find('select');

      element.simulate('change', {
        target: { value: 'testing' }
      });

      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith('testing');
    });
  });
});

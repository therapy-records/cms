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
    ]
  };

  beforeEach(() => {
    wrapper = shallow(
      <Select {...props} />
    );
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
      >{props.options[0].text}</option>,
      <option
        key={2}
        value={props.options[1].value}
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

      let element = wrapper.find('select');

      element.simulate('change', {
        target: { value: 'testing' }
      });

      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith('testing');
    });
  });

});

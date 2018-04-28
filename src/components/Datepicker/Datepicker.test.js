import React from 'react'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import InputMoment from 'input-moment';
import moment from 'moment';
import Datepicker from './Datepicker';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Datepicker', () => {
  let wrapper,
      props = {
        meta: {
          touched: false,
          error: false
        },
        input: {
          onChange: () => {}
        },
        initTime: moment.now(),
        title: 'my datepicker',
        titleSub: 'all the things',
        titleSub2: 'testing'
      };

  beforeEach(() => {
    wrapper = shallow(<Datepicker {...props} />)
  });

  it('should render <InputMoment /> by default', () => {
    expect(wrapper.find(InputMoment).length).to.equal(1);
  });

  it('should render a title', () => {
    const actual = wrapper.containsMatchingElement(
      <h5>{props.title}</h5>
    );
    expect(actual).to.equal(true);
  });

  it('should render a titleSub', () => {
    const actual = wrapper.containsMatchingElement(
      <p>{props.titleSub}</p>
    );
    expect(actual).to.equal(true);
  });

  it('should render titleSub2', () => {
    const actual = wrapper.containsMatchingElement(
      <p>{props.titleSub2}</p>
    );
    expect(actual).to.equal(true);
  });

  describe('with togglePicker', () => {
    it('should render button', () => {
      props.togglePicker = true;
      wrapper = shallow(<Datepicker {...props} />);
      const button = wrapper.find('button');
      button.simulate('click');
      expect(wrapper.find(InputMoment).length).to.equal(1);
    });

    it('should not render <InputMoment /> by default', () => {
      props.togglePicker = true;
      wrapper = shallow(<Datepicker {...props} />);
      expect(wrapper.find(InputMoment).length).to.equal(0);
    });

    it('should not render <InputMoment /> after toggle', () => {
      props.togglePicker = true;
      wrapper = shallow(<Datepicker {...props} />);
      const button = wrapper.find('button');
      button.simulate('click');
      expect(wrapper.find(InputMoment).length).to.equal(1);
      button.simulate('click');
      expect(wrapper.find(InputMoment).length).to.equal(0);
      button.simulate('click');
      expect(wrapper.find(InputMoment).length).to.equal(1);
    });

    // todo: should call prop with moment formatting
  });
});

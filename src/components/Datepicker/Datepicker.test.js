import React from 'react'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
      title: 'my datepicker'
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

  describe('when there is no props.initTime', () => {
    it('should render the correct `moment` prop to <InputMoment />', () => {
      wrapper.setProps({ initTime: null });
      const inputMoment = wrapper.find('InputMoment');
      expect(inputMoment.prop('moment')).to.deep.eq(moment(wrapper.state().m));
    });
  });

  describe('methods', () => {

    describe('componentDidMount', () => {
      it('should update state', () => {
        wrapper = shallow(<Datepicker {...props} />);
        wrapper.instance().componentDidMount('test');
      });
      describe('when there is no props.initTime', () => {
        it('should call props.input.onChange with moment value from state', () => {
          const inputOnChangeSpy = sinon.spy();
          wrapper = shallow(<Datepicker {...props} />);
          wrapper.setProps({
            initTime: undefined,
            input: {
              onChange: inputOnChangeSpy
            }
          });
          wrapper.instance().componentDidMount();
          expect(inputOnChangeSpy).to.have.been.called;
          expect(inputOnChangeSpy).to.have.been.calledWith(
            wrapper.instance().state.m
          );
        });
      });
    });

    describe('handleChange', () => {
      it('should update state', () => {
        wrapper = shallow(<Datepicker {...props} />);
        const mockDate = new Date();
        wrapper.instance().handleChange(mockDate);
        expect(wrapper.instance().state.m).to.eq(mockDate);
      });

      it('should call input.onChange', () => {
        wrapper = shallow(<Datepicker {...props} />);
        const onChangeSpy = sinon.spy();
        wrapper.setProps({
          input: {
            onChange: onChangeSpy
          }
        });
        wrapper.instance().handleChange(new Date());
        expect(onChangeSpy).have.been.called;
      });
    });
  });
});

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

  describe('rendering', () => {
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

    describe('when there is props.showSingleHiddenInputValue', () => {
      it('should render a hidden input', () => {
        const mockName = 'myField';
        wrapper.setProps({
          showSingleHiddenInputValue: true,
          name: mockName
        });

        const expectedValue = moment(props.initTime).toISOString();

        const actual = wrapper.containsMatchingElement(
          <input
            type='hidden'
            name={mockName}
            value={expectedValue}
          />
        );
        expect(actual).to.eq(true);
      });
    });

    describe('when there is props.showSingleHiddenInputValue and no props.initTime', () => {
      it('should render a hidden input', () => {
        const mockName = 'myField';
        wrapper.setProps({
          initTime: null,
          showSingleHiddenInputValue: true,
          name: mockName
        });

        const expectedValue = moment(wrapper.state().m).toISOString();

        const actual = wrapper.containsMatchingElement(
          <input
            type='hidden'
            name={mockName}
            value={expectedValue}
          />
        );
        expect(actual).to.eq(true);
      });
    });

  });

  describe('methods', () => {

    describe('componentDidMount', () => {

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

      describe('when there is no props.initTime and props.onChange', () => {
        it('should call props.onChange with moment value from state', () => {
          const onChangeSpy = sinon.spy();
          wrapper = shallow(<Datepicker {...props} />);
          wrapper.setProps({
            input: {},
            initTime: undefined,
            onChange: onChangeSpy
          });
          wrapper.instance().componentDidMount();
          expect(onChangeSpy).to.have.been.called;
          expect(onChangeSpy).to.have.been.calledWith(
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

      describe('when there is no props.input.onChange', () => {
        it('should call props.onChange', () => {
          wrapper = shallow(<Datepicker {...props} />);
          const onChangeSpy = sinon.spy();
          wrapper.setProps({
            input: {},
            onChange: onChangeSpy
          });
          wrapper.instance().handleChange(new Date());
          expect(onChangeSpy).have.been.called;

          const expected = moment(wrapper.instance().state.m).toISOString();
          expect(onChangeSpy).have.been.calledWith(expected);
        });
      });

      describe('when renderTime prop is true ', () => {
        it('should render container class name', () => {
          wrapper = shallow(<Datepicker {...props} />);
          expect(wrapper.find('.datepicker').length).to.eq(1);
          wrapper.setProps({
            renderTime: true
          });
          expect(wrapper.find('.datepicker.render-time').length).to.eq(1);
        });
      });
    });
  });
});

import React from 'react'
import { shallow } from 'enzyme'
import InputMoment from 'input-moment'
import Datepicker from 'components/Datepicker/Datepicker'

describe('(Component) Datepicker', () => {
  let wrapper,
      props = {
        meta: {
          touched: false,
          error: false
        },
        input: {
          onChange: () => {}
        }
      };

  beforeEach(() => {
    wrapper = shallow(<Datepicker {...props} />)
  });

  it('should render <InputMoment /> by default', () => {
    expect(wrapper.find(InputMoment).length).to.equal(1);
  });

  describe('toggle', () => {
    it('should render button if togglePicker prop', () => {
      props.togglePicker = true;
      const toggleWrapper = shallow(<Datepicker {...props} />);
      const button = toggleWrapper.find('button');
      button.simulate('click');
      expect(toggleWrapper.find(InputMoment).length).to.equal(1);
    });
    it('should not render <InputMoment /> after toggle', () => {
      props.togglePicker = true;
      const toggleWrapper2 = shallow(<Datepicker {...props} />);
      const button = toggleWrapper2.find('button');
      button.simulate('click');
      expect(toggleWrapper2.find(InputMoment).length).to.equal(1);
      button.simulate('click');
      expect(toggleWrapper2.find(InputMoment).length).to.equal(0);
      button.simulate('click');
      expect(toggleWrapper2.find(InputMoment).length).to.equal(1);
    });

    // todo: should call prop with moment formatting
  });
});

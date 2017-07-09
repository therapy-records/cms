import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import InputMoment from 'input-moment'
import Datepicker from 'components/Datepicker/Datepicker'

describe('(Component) Datepicker', () => {
  let wrapper,
      props = {};

  beforeEach(() => {
    wrapper = shallow(<Datepicker {...props} />)
  });

  it('should render <InputMoment />', () => {
    console.log(wrapper.debug());
    expect(wrapper.find(InputMoment).length).to.equal(1);
  });
});

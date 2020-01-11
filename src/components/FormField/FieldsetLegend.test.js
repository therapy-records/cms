import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FieldsetLegend from './FieldsetLegend';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FieldsetLegend', () => {
  let wrapper,
      props = {
        id: 'test',
        legend: 'Testing',
        required: true
      };

  beforeEach(() => {
    wrapper = shallow(
      <FieldsetLegend {...props} />
    )
  });

  it('should render', () => {
    const actual = wrapper.containsMatchingElement(
      <legend>
        {props.legend}<span className='required'>*</span>
      </legend>
    );
    expect(actual).to.eq(true);
  });

});

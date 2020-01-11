import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FieldError from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FieldError', () => {
  let wrapper,
    props = {
      error: 'this is an error'
    };

  beforeEach(() => {
    wrapper = shallow(<FieldError {...props} />);
  });

  it('should render an error message', () => {
    const actual = wrapper.containsMatchingElement(
      <span>{props.error}</span>
    );
    expect(actual).to.eq(true);
  });
});

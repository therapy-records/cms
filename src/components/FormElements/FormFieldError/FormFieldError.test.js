import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormFieldError from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormFieldError', () => {
  let wrapper,
    props = {
      error: 'this is an error'
    };

  beforeEach(() => {
    wrapper = shallow(<FormFieldError {...props} />);
  });

  it('should render an error message', () => {
    const actual = wrapper.containsMatchingElement(
      <span>{props.error}</span>
    );
    expect(actual).to.eq(true);
  });
});

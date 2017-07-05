import React from 'react'
import ErrorComponent from 'components/Error/Error'
import { shallow } from 'enzyme'

describe('(Component) ErrorComponent', () => {
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<ErrorComponent {...props} />)
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h3>Oh no, 404 :(</h3>
    );
    expect(actual).to.equal(true);
  });
  it('should render a link to home', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Go home</button>
    );
    expect(actual).to.equal(true);
  });
});

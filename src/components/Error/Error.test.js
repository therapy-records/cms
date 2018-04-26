import React from 'react'
import { expect } from 'chai';
import ErrorComponent from './Error'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ErrorComponent', () => {
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<ErrorComponent {...props} />)
  });

  it('should render error copy', () => {
    const actual = wrapper.containsAllMatchingElements([
      <h3>Oh no :(</h3>,
      <p>Sorry, we couldn't find that page.</p>
    ]);
    expect(actual).to.equal(true);
  });
  it('should render a link to home', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Go home</button>
    );
    expect(actual).to.equal(true);
  });
});

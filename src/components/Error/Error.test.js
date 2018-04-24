/*
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

*/

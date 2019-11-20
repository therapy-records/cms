import React from 'react'
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ErrorMessage', () => {
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage {...props} />)
  });

  it('should render error copy', () => {
    const actual = wrapper.containsAllMatchingElements([
      <h3>Oh no :(</h3>,
      <p>Sorry, something has gone wrong.</p>
    ]);
    expect(actual).to.equal(true);
  });

  it('should render a link to home', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='/'>Go home</Link>
    );
    expect(actual).to.equal(true);
  });
});

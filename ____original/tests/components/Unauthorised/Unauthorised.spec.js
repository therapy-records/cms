import React from 'react'
import Unauthorised from 'components/Unauthorised/Unauthorised'
import { Link } from 'react-router'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Unauthorised', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Unauthorised />);
  });

  it('should render an expired message', () => {
    const actual = wrapper.containsMatchingElement(
      <p>Session expired</p>
    );
    expect(actual).to.equal(true);
  });

  it('should render a message & link to login', () => {
    const actual = wrapper.containsMatchingElement(
      <p>Please <Link to='/'>login</Link> to continue.</p>
    );
    expect(actual).to.equal(true);
  });
});

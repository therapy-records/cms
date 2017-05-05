import React from 'react'
import Header from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let wrapper, props;

  describe('when !isAuthenticated', () => {

    beforeEach(() => {
      wrapper = shallow(<Header {...props} />)
    });

    it('should render a title', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='/' activeClassName='route--active'>Mini cms</Link>
      );
      expect(actual).to.equal(true);
    });

    it('should render a login link', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='/' activeClassName='route--active'>Log in</Link>
      );
      expect(actual).to.equal(true);
    });

  });

  describe('when isAuthenticated', () => {

    beforeEach(() => {
      props = {
        isAuthenticated: true
      }
      wrapper = shallow(<Header {...props} />)
    });

    it('should render auth only links', () => {
      const actual1 = wrapper.containsMatchingElement(
        <Link to='/dashboard' activeClassName='route--active'>
          Dashboard
        </Link>  
      );
      expect(actual1).to.equal(true);
      const actual2 = wrapper.containsMatchingElement(
        <Link to='/news' activeClassName='route--active'>
          News
        </Link>
      );
      expect(actual2).to.equal(true);
      const actual3 = wrapper.containsMatchingElement(
        <Link to='/press' activeClassName='route--active'>
          Press
        </Link>
      );
      expect(actual3).to.equal(true);
    });

    it('should render a logout link', () => {
      const actual = wrapper.containsMatchingElement(
        <button className="btn-logout">Log out</button>
      );
      expect(actual).to.equal(true);
    });
    
  });
})

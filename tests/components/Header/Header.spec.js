import React from 'react'
import { bindActionCreators } from 'redux'
import Header from 'components/Header/Header'
import { Link } from 'react-router'
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

    describe('logout link', () => {
      it('should be rendered', () => {
        const actual = wrapper.containsMatchingElement(
          <button className='btn-logout'>Log out</button>
        );
        expect(actual).to.equal(true);
      });

      it('should call dispatch and onLogout on click', () => {
        let spies = {};
        props = {
          isAuthenticated: true,
          ...bindActionCreators({
            onLogout: (spies.onLogout = sinon.spy())
          }, spies.dispatch = sinon.spy())
        }
        const buttonWrapper = shallow(<Header {...props} />)
        spies.dispatch.should.have.not.been.called
        const button = buttonWrapper.find('button');
        button.simulate('click');
        spies.dispatch.should.have.been.called;
        spies.onLogout.should.have.been.called;
      });
    });
  });
})

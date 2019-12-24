import React from 'react'
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from './index';
import Stats from './components/Stats';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Dashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard />);
  });

  describe('rendering', () => {

    it('should render a heading', () => {
      const heading = wrapper.containsMatchingElement(
        <h2>Welcome back <span>👋</span></h2>
      );
      expect(heading).to.be.true;
    });

    it('should render a link to create a news', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='news/create'>Create News</Link>
      );
      expect(actual).to.be.true;
    });

    it('should render a link to create a journalism article', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='journalism/create'>Create Journalism</Link>
      );
      expect(actual).to.be.true;
    });

    it('should render a link to create a collaborator', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='collaborators/create'>Add Collaborator</Link>
      );
      expect(actual).to.be.true;
    });

    it('should render <Stats />', () => {
      const actual = wrapper.containsMatchingElement(
        <Stats />
      );
      expect(actual).to.be.true;
    });
    
  });

});

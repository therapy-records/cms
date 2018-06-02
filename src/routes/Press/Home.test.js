import React from 'react';
import Enzyme, { shallow } from 'enzyme';



import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Press from './index';



Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Press - Home', () => {
  let wrapper,
      props;

  beforeEach(() => {
    wrapper = shallow(
      <Press />
    );
  })

  it('should render a page title', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Press</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render a coming soon message', () => {
    const actual = wrapper.containsMatchingElement(
      <p>Coming soon...</p>
    );
    expect(actual).to.equal(true);
  });

});

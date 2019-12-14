import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Gigs from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Gigs - Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Gigs />
    );
  })

  it('should render a page title', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Gigs 🗓️</h2>
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

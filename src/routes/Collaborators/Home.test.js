import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Collaborators from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Collaborators - Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Collaborators />
    );
  })

  it('should render a page title', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Collaborators 🌈</h2>
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

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageHeader from '../../../components/PageHeader';
import Gallery from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Gallery - Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Gallery />
    );
  })

  it('should render <PageHeader />', () => {
    const actual = wrapper.containsMatchingElement(
      <PageHeader heading='Gallery 🌻' />
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

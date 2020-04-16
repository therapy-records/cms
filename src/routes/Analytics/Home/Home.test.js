import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageHeader from '../../../components/PageHeader';
import Analytics from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Analytics - Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Analytics />
    );
  })

  it('should render <PageHeader />', () => {
    const actual = wrapper.containsMatchingElement(
      <PageHeader heading='Analytics 📈' />
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

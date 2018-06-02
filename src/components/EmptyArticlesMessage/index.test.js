import React from 'react'
import { Link } from 'react-router-dom';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import EmptyArticlesMessage from './index'

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) EmptyArticlesMessage', () => {
  let wrapper,
    props = {
      type: 'test-route'
    }

  it('should render a message', () => {
    wrapper = shallow(
      <EmptyArticlesMessage {...props} />
    );
    const actual = wrapper.containsMatchingElement(
      <div>
        <p>No articles yet. <Link to={`${props.type}/create`}>Create an article</Link></p>
      </div>
    );
    expect(actual).to.eq(true);
  });
});


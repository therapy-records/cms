import React from 'react'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PromiseError from './index'

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) PromiseError', () => {
  let wrapper,
      props = {
        message: 'fetching something'
      }

  it('should render a message', () => {
    wrapper = shallow(
      <PromiseError {...props} />
    );
    const actual = wrapper.containsMatchingElement(
      <p>Error {props.message} :(</p>
    )
  });
});

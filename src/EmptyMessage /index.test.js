import React from 'react'
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmptyMessage from './index'

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) EmptyMessage', () => {
  let wrapper,
    props = {
      type: 'test-route'
    }

  it('should render a message', () => {
    wrapper = shallow(
      <EmptyMessage type={props.type} />
    );
    const actual = wrapper.containsMatchingElement(
      <div>
        <p>No {props.type} yet. <Link to={`${props.type}/create`}>Create an {props.type.substring(0, props.type.length - 1)}</Link></p>
      </div>
    );
    expect(actual).to.eq(true);
  });
});


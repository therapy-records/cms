import React from 'react'
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmptyMessage from './index'

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) EmptyMessage', () => {
  let wrapper,
    props = {
      entityName: 'test-route',
      createCopy: 'test-error message'
    }

  it('should render a message', () => {
    wrapper = shallow(
      <EmptyMessage entityName={props.entityName} createCopy={props.createCopy} />
    );
    const actual = wrapper.containsMatchingElement(
      <div>
        <p>No {entityName} yet. <Link to={`${entityName}/create`}>{createCopy}</Link></p>
      </div>
    );
    expect(actual).to.eq(true);
  });
});


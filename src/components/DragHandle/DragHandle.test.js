import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SortableHandle } from 'react-sortable-hoc';
import DragHandle from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) DragHandle', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <DragHandle />
    );
  });

  it('should render HTML with SortableHandle', () => {
    const actual = wrapper.containsMatchingElement(
      SortableHandle(() => (
        <div className='btn-burger btn-draggable'>&#9776;</div>
      ))
    );
    expect(actual).to.eq(true);
  });

});

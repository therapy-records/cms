import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { SortableListContainer } from './SortableList';
import SortableItem from './SortableItem';
import ListItem from '../List/ListItem';
import listItemPropsHandler from '../../utils/list-item-props-handler';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) SortableItem', () => {
  let wrapper,
      props = {
        item: {
          _id: 'test',
          title: 'testing',
          imageUrl: 'test.com',
          date: '2020-01-01T11:17:02.883Z'
        },
        index: 0, 
        route: 'test',
        cardDesign: true,
        isDraggable: true
      }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <SortableListContainer>
          <SortableItem
            key={`item-${props.item._id}`}
            index={props.index}
            item={props.item}
            route={props.route}
            cardDesign
            isDraggable
          />
          <SortableItem
            key={`item-${props.item._id}-1`}
            index={props.index}
            item={props.item}
            route={props.route}
            cardDesign
            isDraggable
          />
        </SortableListContainer>
      </BrowserRouter>
    );
  });

  it('should render <ListItem /> with correct props', () => {
    const actual = wrapper.containsMatchingElement(
      SortableElement((props) => 
        <ListItem
          {...listItemPropsHandler(props)}
        />
      )
    );
    expect(actual).to.eq(true);
  });

});

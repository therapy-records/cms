import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { SortableElement } from 'react-sortable-hoc';
import SortableList, { SortableListContainer } from './SortableList';
import ListItem from '../List/ListItem';
import listItemPropsHandler from '../../utils/list-item-props-handler';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) SortableList', () => {
  const onSortingUpdatedSpy = sinon.spy();
  let wrapper,
      props = {
        items: [
          {
            _id: 'test',
            title: 'testing',
            imageUrl: 'test.com',
            date: '2020-01-01T11:17:02.883Z'
          },
          {
            _id: 'test 2',
            title: 'testing 2',
            imageUrl: 'test2.com',
            date: '2020-01-01T11:17:02.883Z'
          }
        ],
        route: 'test',
        onSortingUpdated: onSortingUpdatedSpy
      }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <SortableList {...props} />
      </BrowserRouter>
    );
  });

  const actions = async (wrapper, _actions) => {
    await act(async () => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  describe('SortableListContainer', () => {
    it('should render ul with correct class name', () => {
      wrapper = mount(
        <SortableListContainer sortingActive>
          <li>test1</li>
          <li>test2</li>
        </SortableListContainer>
      )
      const ul = wrapper.find('ul');
      expect(ul.length).to.eq(1);
      expect(ul.hasClass('list list-with-columns sortable-list sortable-list-active')).to.eq(true);
    });
  });

  it('should render sortableList with correct props', () => {
    const sortableList = wrapper.find('sortableList');
    expect(sortableList.length).to.eq(1);
    expect(sortableList.prop('onSortStart')).to.be.a('function');
    expect(sortableList.prop('onSortEnd')).to.be.a('function');
    expect(sortableList.prop('axis')).to.eq('xy');
    expect(sortableList.prop('lockToContainerEdges')).to.eq(true);
    expect(sortableList.prop('useDragHandle')).to.eq(true);
    expect(sortableList.prop('helperClass')).to.eq('sortable-list-active-item');
    expect(sortableList.prop('sortingActive')).to.eq(false);
  });

  it('should render <SortableItem />', () => {
    const expectedListItemProps = { // eslint-disable-line no-unused-vars
      item: props.items[0],
      index: 0,
      route: props.route,
      cardDesign: true,
      isDraggable: true
    };

    const actual = wrapper.containsMatchingElement(
      SortableElement((expectedListItemProps) =>
        <ListItem
          {...listItemPropsHandler(expectedListItemProps)}
        />
      )
    );
    expect(actual).to.eq(true);
  });

  describe('when onSortStart is called', () => {
    it('should set sortingActive to true', async () => {
      let sortableListContainer = wrapper.find('sortableList');

      await actions(wrapper, () => {
        sortableListContainer.props().onSortStart();
        wrapper.update();
        sortableListContainer = wrapper.find('sortableList');
        expect(sortableListContainer.prop('sortingActive')).to.eq(true);
      });
    });
  });

  describe('when onSortEnd is called', () => {
    it('should set sortingActive to false and call props.onSortingUpdated', async () => {
      let sortableListContainer = wrapper.find('sortableList');

      await actions(wrapper, () => {
        sortableListContainer.props().onSortStart();
        wrapper.update();
        sortableListContainer = wrapper.find('sortableList');
        expect(sortableListContainer.prop('sortingActive')).to.eq(true);

        sortableListContainer.props().onSortEnd({
          oldIndex: 1,
          newIndex: 2
        });
        wrapper.update();
        sortableListContainer = wrapper.find('sortableList');
        expect(sortableListContainer.prop('sortingActive')).to.eq(false);
        expect(onSortingUpdatedSpy).to.have.been.calledWith(1, 2);
      });
    });
  });

});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorsList from './CollaboratorsList';
import List from '../List';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorsList', () => {
  let wrapper,
    props = {
      listItems: [
        { name: 'b', orderNumber: 4 },
        { name: 'a', orderNumber: 1 },
        { name: 'c', orderNumber: 3 }
      ],
      onOrderChanged: () => {}
    };

    const expectedSortedData = props.listItems.sort((a, b) => {
      return a.orderNumber - b.orderNumber
    });


  beforeEach(() => {
    wrapper = shallow(
      <CollaboratorsList {...props} />
    );
  });


  it('should render <List /> with sorted data prop', () => {
    const actual = wrapper.containsMatchingElement(
      <List
        data={expectedSortedData}
        route='collaborators'
        columns
      />
    );
    expect(actual).to.eq(true);
  });

  describe('with showSortableList prop', () => {
    it('should render <SortableList /> with sorted data prop', () => {
      wrapper.setProps({
        showSortableList: true
      });

      const sortableList = wrapper.find('SortableListComponent');
      expect(sortableList.length).to.eq(1);
      expect(sortableList.prop('items')).to.deep.eq(expectedSortedData);
      expect(sortableList.prop('route')).to.deep.eq('collaborators');
      expect(sortableList.prop('onSortingUpdated')).to.be.a('function');
    });
  });

});

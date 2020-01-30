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
      onOrderChanged: sinon.spy()
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
    let sortableList;

    beforeEach(() => {
      wrapper.setProps({
        showSortableList: true
      });
      sortableList = wrapper.find('SortableListComponent');
    });

    it('should render <SortableList /> with sorted data prop', () => {
      expect(sortableList.length).to.eq(1);
      expect(sortableList.prop('items')).to.deep.eq(expectedSortedData);
      expect(sortableList.prop('route')).to.deep.eq('collaborators');
      expect(sortableList.prop('onSortingUpdated')).to.be.a('function');
    });

    it('shoud call props.onOrderChanged with list items updated so that orderNumber is the index of each list item', () => {
      const sortableList = wrapper.find('SortableListComponent');
      sortableList.prop('onSortingUpdated')();
      wrapper.update();

      expect(props.onOrderChanged).to.have.been.calledOnce;
      const expected = [
        { name: 'a', orderNumber: 0 },
        { name: 'c', orderNumber: 1 },
        { name: 'b', orderNumber: 2 }
      ];
      expect(props.onOrderChanged).to.have.been.calledWith(expected);
    });

  });

});

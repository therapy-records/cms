import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import List from './index';
import listItemPropsHandler from '../../utils/list-item-props-handler';
import GalleryListItem from '../../routes/Gallery/Home/GalleryListItem';

Enzyme.configure({ adapter: new Adapter() });

const mockData = [
  {
    _id: 'abcd1234',
    title: 'test',
    image: {
      cloudinaryUrl: 'test.com'
    },
    date: 'test'
  },
  {
    _id: 'abcd12345',
    title: 'test2',
    image: {
      cloudinaryUrl: 'test2.com'
    },
    date: 'test'
  }
];

describe('(Component) List', () => {
  let wrapper,
      props = {
        route: 'test-route',
        data: mockData,
        onItemClick: sinon.spy(),
        onViewButtonClick: sinon.spy(),
        onEditButtonClick: sinon.spy(),
        columns: true
      };

  beforeEach(() => {
    wrapper = shallow(
      <List {...props} />
    );
  });

  describe('when `columns` prop is passed', () => {
    it('should add correct className to UL container', () => {
      wrapper.setProps({
        columns: true
      });
      const expected = 'list list-with-columns';
      expect(wrapper.find('ul').hasClass(expected)).to.eq(true);
    });

    describe('when `columnnsPerRow` prop is passed', () => {
      it('should add correct className to UL container', () => {
        wrapper.setProps({
          columns: true,
          columnnsPerRow: 4
        });
        const expected = 'list list-with-columns columns-4';
        expect(wrapper.find('ul').hasClass(expected)).to.eq(true);
      });
    });
  });

  it('should render multiple <ListItem />', () => {
    const listItems = wrapper.find('ListItem');
    expect(listItems.length).to.eq(mockData.length);
    const firstListItem = listItems.first();
    expect(firstListItem.prop('_id')).to.eq(mockData[0]._id);
    expect(firstListItem.prop('title')).to.eq(
      listItemPropsHandler({ item: mockData[0] }).title
    );
    expect(firstListItem.prop('imageUrl')).to.eq(
      listItemPropsHandler({ item: mockData[0] }).imageUrl
    );
    expect(firstListItem.prop('date')).to.eq(
      listItemPropsHandler({ item: mockData[0] }).date
    );
    expect(firstListItem.prop('route')).to.eq(
      listItemPropsHandler({
        item: mockData[0],
        route: props.route
      }).route
    );

    expect(firstListItem.prop('onItemClick')).to.be.a('function');
    expect(firstListItem.prop('onViewButtonClick')).to.be.a('function');
    expect(firstListItem.prop('onEditButtonClick')).to.be.a('function');
  });

  describe('<ListItem /> click events/props', () => {

    describe('onItemClick', () => {
      it('should call props.onItemClick', () => {
        const listItem = wrapper.find('ListItem').first();
        listItem.prop('onItemClick')();
        expect(props.onItemClick).to.have.been.called;
        expect(props.onItemClick).to.have.been.calledWith(props.data[0]);
      });
    });

    describe('onViewButtonClick', () => {
      it('should call props.onViewButtonClick', () => {
        const listItem = wrapper.find('ListItem').first();
        listItem.prop('onViewButtonClick')();
        expect(props.onViewButtonClick).to.have.been.called;
        expect(props.onViewButtonClick).to.have.been.calledWith(props.data[0]);
      });
    });

    describe('onEditButtonClick', () => {
      it('should call props.onEditButtonClick', () => {
        const listItem = wrapper.find('ListItem').first();
        listItem.prop('onEditButtonClick')();
        expect(props.onEditButtonClick).to.have.been.called;
        expect(props.onEditButtonClick).to.have.been.calledWith(props.data[0]);
      });
    });

  });

  describe('with props.listItemComponent', () => {
    it('should render listItemComponent element', () => {
      wrapper.setProps({
        listItemComponent: GalleryListItem
      });

      const listItem = wrapper.find('ListItem');
      expect(listItem.length).to.eq(0);
      
      const actual = wrapper.containsAllMatchingElements([
        <GalleryListItem {...props.data[0]} />,
        <GalleryListItem {...props.data[0]} />
      ]);
      expect(actual).to.eq(true);
    });
  });

});

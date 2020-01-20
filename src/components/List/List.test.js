import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import List from './index';
import { getFirstImageInArticle } from '../../utils/news';

Enzyme.configure({ adapter: new Adapter() });

const mockData = [
  {
    _id: 'abcd1234',
    title: 'test',
    imageUrl: 'test.com',
    date: 'test'
  },
  {
    _id: 'abcd12345',
    title: 'test2',
    imageUrl: 'test2.com',
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

  it('should render multiple <ListItem />', () => {
    const listItems = wrapper.find('ListItem');
    expect(listItems.length).to.eq(mockData.length);
    const firstListItem = listItems.first();
    expect(firstListItem.prop('_id')).to.eq(mockData[0]._id);
    expect(firstListItem.prop('title')).to.eq(mockData[0].title);
    expect(firstListItem.prop('imageUrl')).to.eq(mockData[0].imageUrl);
    expect(firstListItem.prop('date')).to.eq(mockData[0].date);
    expect(firstListItem.prop('route')).to.eq(props.route);
    expect(firstListItem.prop('onItemClick')).to.be.a('function');
    expect(firstListItem.prop('onViewButtonClick')).to.be.a('function');
    expect(firstListItem.prop('onEditButtonClick')).to.be.a('function');
    expect(firstListItem.prop('cardDesign')).to.eq(props.columns);
  });

  describe('when `columns` prop is passed', () => {
    it('should add correct className to UL container', () => {
      wrapper.setProps({
        columns: true
      });
      const expected = 'list list-with-columns';
      expect(wrapper.find('ul').hasClass(expected)).to.eq(true);
    });
  });

  describe('when `itemsHaveMultipleImages` prop is passed', () => {
    it('should render correct image from getFirstImageInArticle util function', () => {
      wrapper.setProps({
        itemsHaveMultipleImages: true
      });
      const listItems = wrapper.find('ListItem');
      const firstListItem = listItems.first();
      expect(firstListItem.prop('imageUrl')).to.eq(getFirstImageInArticle(firstListItem));
    });
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

});

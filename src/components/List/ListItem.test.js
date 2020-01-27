import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListItem from './ListItem';
import DragHandle from '../DragHandle';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ListItem', () => {
  let wrapper,
      props = {
        _id: 'test',
        title: 'testing',
        imageUrl: 'test.com',
        date: new Date().toISOString(),
        route: 'test',
        onItemClick: () => {},
        onViewButtonClick: () => {},
        onEditButtonClick: () => {},
        isDraggable: true
      }

  beforeEach(() => {
    wrapper = shallow(
      <ListItem {...props} />
    );
  });

  it('should render <DragHandle />', () => {
    const actual = wrapper.containsMatchingElement(
      <DragHandle />
    );
    expect(actual).to.eq(true);
  });

  it('should render an image', () => {
    const actual = wrapper.containsMatchingElement(
      <img src={props.imageUrl} alt={props.title} />
    );
    expect(actual).to.eq(true);
  });

  it('should render a heading with Link and date', () => {
    const actual = wrapper.containsMatchingElement(
      <h3>
        <Link
          onClick={props.onItemClick}
          to={`/${props.route}/${props._id}`}
        >
          <span>{props.title}</span>
          <p className='small-tab'>{moment(props.date).format('DD MMM YYYY')}</p>
        </Link>
      </h3>
    );
    expect(actual).to.eq(true);
  });

  it('should render a `view` button', () => {
    const actual = wrapper.containsMatchingElement(
      <Link
        onClick={props.onViewButtonClick}
        to={`/${props.route}/${props._id}`}
      >
        View
      </Link>
    );
    expect(actual).to.eq(true);
  });

  it('should render an `edit` button', () => {
    const actual = wrapper.containsMatchingElement(
      <Link
        onClick={props.onEditButtonClick}
        to={`/${props.route}/${props._id}/edit`}
      >
        Edit
      </Link>
    );
    expect(actual).to.eq(true);
  });

  describe('with `cardDesign` prop', () => {
    it('should add correct classNames', () => {
      wrapper.setProps({
        cardDesign: true
      });
      const li = wrapper.find('li');
      expect(li.hasClass('list-item-card')).to.eq(true);

      const btnsContainer = wrapper.find('.btns-container');
      const viewLink = btnsContainer.find('Link').first();
      const editLink = btnsContainer.find('Link').last();
      expect(viewLink.hasClass('btn btn-xs')).to.eq(true);
      expect(editLink.hasClass('btn btn-xs')).to.eq(true);
    });
  });
  
});

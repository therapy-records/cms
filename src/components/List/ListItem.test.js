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
        author: 'test',
        title: 'testing',
        excerpt: 'test',
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
  
  describe('container className', () => {

    it('should have correct default className', () => {
      const li = wrapper.find('li');
      expect(li.hasClass('list-item-row')).to.eq(true);
    });

    describe('with cardDesign prop', () => {
      it('should add className', () => {
        wrapper.setProps({
          cardDesign: true
        });
        const li = wrapper.find('li');
        expect(li.hasClass('list-item-card')).to.eq(true);
      });
    });

    describe('with isDraggable prop', () => {
      it('should add className', () => {
        const li = wrapper.find('li');
        expect(li.hasClass('list-item-card-is-draggable')).to.eq(true);
      });
    });

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
  
  it('should render author', () => {
    const actual = wrapper.containsMatchingElement(
      <p>{props.author}</p>
    );
    expect(actual).to.eq(true);
  });

  it('should render a date', () => {
    const actual = wrapper.containsMatchingElement(
      <p className='small-tab'>{moment(new Date(props.date)).format('DD MMM YYYY')}</p>
    );
    expect(actual).to.eq(true);
  });

  it('should render a heading with Link', () => {
    const actual = wrapper.containsMatchingElement(
      <h3>
        <Link
          onClick={props.onItemClick}
          to={`/${props.route}/${props._id}`}
        >
          <span>{props.title}</span>
        </Link>
      </h3>
    );
    expect(actual).to.eq(true);
  });

  it('should render excerpt paragraph', () => {
    const actual = wrapper.containsMatchingElement(
      <p>{props.excerpt}</p>
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
  
});

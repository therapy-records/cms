import React from 'react';
import ArticleLive from 'components/ArticleLive/ArticleLive';
import { shallow } from 'enzyme';

describe('(Component) ArticleLive', () => {
  let props = {
    article: {
      title: 'asdfasdfasdf',
      mainImageUrl: 'http://something.png',
      miniGalleryImages: [
        'asdf.jpg', 'ewrwer.jpg', '23fdsfjpg'
      ]
    }
  };

  it('should render a title', () => {
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsMatchingElement(
      <h2>{props.article.title}</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render an image', () => {
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsMatchingElement(
      <img src={props.article.mainImageUrl} />
    );
    expect(actual).to.equal(true);
  });

  it('should render miniGalleryImages', () => {
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsAllMatchingElements([
      <li>
        <img src={props.article.miniGalleryImages[0]} />
      </li>,
      <li>
        <img src={props.article.miniGalleryImages[1]} />
      </li>,
      <li>
        <img src={props.article.miniGalleryImages[2]} />
      </li>
    ]);
    expect(actual).to.equal(true);
  });
});

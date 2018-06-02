import React from 'react';
import { expect } from 'chai';
import ArticleLive from './ArticleLive';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ArticleLive', () => {
  let props = {
    article: {
      title: 'asdfasdfasdf',
      mainImage: {
        url: 'http://something.png'
      },
      quotes: [
        { copy: 'asdfasdf', author: 'rtrtrtrt' },
        { copy: 'qweqweqwe', author: 'asdf' },
        { copy: 'uiouio', author: 'nbvbnvbnvb' },
        { copy: '123', author: 'dfdfdf' }
      ],
      secondaryImageUrl: 'http://somethingElse.png',
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

  it('should render a list of quotes', () => {
    const quotes = props.article.quotes;
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsAllMatchingElements([
      <li><i>&quot;{quotes[0].copy}&quot;</i> - {quotes[0].author}</li>,
      <li><i>&quot;{quotes[1].copy}&quot;</i> - {quotes[1].author}</li>,
      <li><i>&quot;{quotes[2].copy}&quot;</i> - {quotes[2].author}</li>,
      <li><i>&quot;{quotes[3].copy}&quot;</i> - {quotes[3].author}</li>
    ]);
    expect(actual).to.equal(true);
  });

  it('should render an image with mainImage.url', () => {
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsMatchingElement(
      <img src={props.article.mainImage.url} />
    );
    expect(actual).to.equal(true);
  });

  it('should render an image inside a link if mainImage.externalLink', () => {
    props.article.mainImage.externalLink = 'testing.com';
    const wrapper = shallow(<ArticleLive {...props} />);
    const actualMiniGalleryImages = wrapper.containsMatchingElement(
      <a href={props.article.mainImage.externalLink}
        target='_blank'>
        <img
          src={props.article.miniGalleryImages[0]}
          alt={`Fiona Ross - ${props.article.title}`}
        />
      </a>
    );
    expect(actualMiniGalleryImages).to.equal(false);
  });

  it('should render an image with secondaryImageUrl', () => {
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsMatchingElement(
      <img src={props.article.secondaryImageUrl} />
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

  it('should render 2 dummy social share buttons', () => {
    const wrapper = shallow(<ArticleLive {...props} />);
    const actual = wrapper.containsAllMatchingElements([
      <button>Share on Facebook</button>,
      <button>Share on Twitter</button>
    ]);
    expect(actual).to.equal(true);
  });
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorUrls from './CollaboratorUrls';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const props = {
  urls: {
    twitter: 'twitter.com/test',
    website: 'test.com',
    phone: '0123 456789'
  }
};

describe('(Component) CollaboratorUrls', () => {

  beforeEach(() => {
    wrapper = shallow(
      <CollaboratorUrls {...props} /> 
    );
  });

  it('should render', () => {
    const urlKeys = Object.keys(props.urls);
    const actual = wrapper.containsAllMatchingElements([
      <li key={urlKeys[0]}>
        <span>{urlKeys[0]}:&nbsp;</span>
        <a
          href={props.urls[urlKeys[0]]}
          target='_blank'
        >
          {props.urls[urlKeys[0]]}
        </a>
      </li>,
      <li key={urlKeys[1]}>
        <span>{urlKeys[1]}:&nbsp;</span>
        <a
          href={props.urls[urlKeys[1]]}
          target='_blank'
        >
          {props.urls[urlKeys[1]]}
        </a>
      </li>
    ]);
    expect(actual).to.equal(true);
  });

  describe('when a url is `phone`', () => {
    it('should render a list item without url', () => {
      const propsPhone = '0123456789';
      wrapper.setProps({
        urls: {
          phone: propsPhone
        }
      });
      const actual = wrapper.containsMatchingElement(
        <li>
          <span>phone:&nbsp;</span>
          <span>{propsPhone}</span>
        </li>
      );
      expect(actual).to.eq(true);
    });
  });

});

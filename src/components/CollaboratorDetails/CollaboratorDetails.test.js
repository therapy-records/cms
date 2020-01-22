import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorDetails from './CollaboratorDetails';
import CollaboratorUrls from './CollaboratorUrls';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const props = {
  name: 'Testing',
  avatarUrl: 'test.com',
  role: 'test',
  about: '<p>test</p>',
  collabOn: [
    'testA',
    'testB'
  ],
  urls: {
    twitter: 'twitter.com/test',
    website: 'test.com'
  }
};

describe('(Component) CollaboratorDetails', () => {
  beforeEach(() => {
    wrapper = shallow(
      <CollaboratorDetails {...props} />
    );
  });

  describe('rendering', () => {
    it('should render an image', () => {
      const actual = wrapper.containsMatchingElement(
        <img
          src={props.avatarUrl}
          alt={props.name}
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render role paragraph', () => {
      const actual = wrapper.containsMatchingElement(
        <p>{props.role}</p>
      );
      expect(actual).to.equal(true);
    });

    it('should render about html', () => {
      const actual = wrapper.containsMatchingElement(
        <div dangerouslySetInnerHTML={{ __html: props.about }} />
      );
      expect(actual).to.equal(true);
    });

    it('should render a list from collabOn array', () => {
      const actual = wrapper.containsAllMatchingElements([
        <li key={props.collabOn[0]}>{props.collabOn[0]}</li>,
        <li key={props.collabOn[1]}>{props.collabOn[1]}</li>
      ]);
      expect(actual).to.equal(true);
    });

    it('should render <CollaboratorUrls />', () => {
      const actual = wrapper.containsMatchingElement(
        <CollaboratorUrls urls={props.urls} />
      );
      expect(actual).to.equal(true);
    });

  });
});

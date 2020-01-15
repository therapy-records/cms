import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Collaborator from './Collaborator';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const mock = {
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

describe('(Component) Collaborator', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Collaborator {...mock} />
    );
  });

  describe('rendering', () => {
    it('should render an image',() => {
      const actual = wrapper.containsMatchingElement(
        <img
          src={mock.avatarUrl}
          alt={mock.name}
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render role paragraph',() => {
      const actual = wrapper.containsMatchingElement(
        <p>{mock.role}</p>
      );
      expect(actual).to.equal(true);
    });

    it('should render about html', () => {
      const actual = wrapper.containsMatchingElement(
        <div dangerouslySetInnerHTML={{ __html: mock.about }} />
      );
      expect(actual).to.equal(true);
    });

    it('should render a list from collabOn array', () => {
      const actual = wrapper.containsAllMatchingElements([
        <li key={mock.collabOn[0]}>{mock.collabOn[0]}</li>,
        <li key={mock.collabOn[1]}>{mock.collabOn[1]}</li>
      ]);
      expect(actual).to.equal(true);
    });


    describe('urls list', () => {
      it('should render', () => {
        const urlKeys = Object.keys(mock.urls);
        const actual = wrapper.containsAllMatchingElements([
          <li key={urlKeys[0]}>
            <span>{urlKeys[0]}:&nbsp;</span>
            <a
              href={mock.urls[urlKeys[0]]}
              target='_blank'
            >
              {mock.urls[urlKeys[0]]}
            </a>
          </li>,
          <li key={urlKeys[1]}>
            <span>{urlKeys[1]}:&nbsp;</span>
            <a
              href={mock.urls[urlKeys[1]]}
              target='_blank'
            >
              {mock.urls[urlKeys[1]]}
            </a>
          </li>
        ]);
        expect(actual).to.equal(true);
      });

      describe('when a url is `phone`', () => {
          it('should render a list item without url', () => {
            const mockPhone = '0123456789';
            wrapper.setProps({
              urls: {
                phone: mockPhone
              }
            });
            const actual = wrapper.containsMatchingElement(
              <li>
                <span>phone:&nbsp;</span>
                <span>{mockPhone}</span>
              </li>
            );
            expect(actual).to.eq(true);
          });
      });

      describe('when a url is `other`', () => {
        it('should render a list of `other` urls', () => {
          const mockOtherUrls = [
            { title: 'testA', url: 'testa.com' },
            { title: 'testB', url: 'testb.com' }
          ];
          wrapper.setProps({
            urls: {
              other: mockOtherUrls
            }
          });
          const actual = wrapper.containsAllMatchingElements([
            <li key={mockOtherUrls[0]}>
              {mockOtherUrls[0].title}:&nbsp;
              <a
                href={mockOtherUrls[0].url}
                target='_blank'
              >
                {mockOtherUrls[0].url}
              </a>
            </li>,
            <li key={mockOtherUrls[1]}>
              {mockOtherUrls[1].title}:&nbsp;
              <a
                href={mockOtherUrls[1].url}
                target='_blank'
              >
                {mockOtherUrls[1].url}
              </a>
            </li>
          ]);
          expect(actual).to.eq(true);
        });
      });

    });
  });
});

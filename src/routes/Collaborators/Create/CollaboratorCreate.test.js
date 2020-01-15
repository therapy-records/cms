import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorCreate from './index';
import Form from '../../../components/Form';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
import { CREATE_COLLABORATOR } from '../../../mutations';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<CollaboratorCreate />);
    });

    describe('<ArticleHeader />', () => {
      it('should render', () => {
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.length).to.eq(1);
        expect(articleHeader.prop('baseUrl')).to.eq('/collaborators');
        expect(articleHeader.prop('heading')).to.eq('Add Collaborator 🌈');
        expect(articleHeader.prop('showDeleteButton')).to.eq(false);
      });

    });

    it('should render <CollaboratorForm />', () => {
      const actual = wrapper.containsMatchingElement(
        <Form
          mutation={CREATE_COLLABORATOR}
          fields={COLLABORATOR_FIELDS}
          baseUrl='/collaborators'
          successCopy={{
            homeLink: 'Go to Collaborators',
            createLink: 'Create another Collaborator'
          }}
        />
      );
      expect(actual).to.equal(true);
    });

  });

});

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

    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Add Collaborator 🌈</h2>
      );
      expect(actual).to.equal(true);
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

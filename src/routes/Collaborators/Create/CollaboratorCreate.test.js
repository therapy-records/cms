import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorCreate from './index';
import CollaboratorForm from '../../../components/CollaboratorForm';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
import { CREATE_COLLABORATOR } from '../../../mutations';
import { GET_COLLABORATORS } from '../../../queries';

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
        <CollaboratorForm
          mutation={CREATE_COLLABORATOR}
          refetchQueries={[
            { query: GET_COLLABORATORS }
          ]}
          fields={COLLABORATOR_FIELDS}
          baseUrl='/collaborators'
        />
      );
      expect(actual).to.equal(true);
    });

  });

});

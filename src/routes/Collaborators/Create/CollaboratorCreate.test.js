import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorCreate from './index';
import CollaboratorForm from '../../../components/CollaboratorForm';
import FormFields from '../../../formFields';
import { CREATE_COLLABORATOR } from '../../../mutations';
import { GET_COLLABORATORS } from '../../../queries';
import { mapFields } from '../../../utils/form-field-mappings';

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
          fields={mapFields(new FormFields().collaborator)}
          mutation={CREATE_COLLABORATOR}
          refetchQueries={[
            { query: GET_COLLABORATORS }
          ]}
          baseUrl='/collaborators'
        />
      );
      expect(actual).to.equal(true);
    });

  });

});

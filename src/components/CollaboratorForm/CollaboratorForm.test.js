import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorForm from './CollaboratorForm';
import Form from '../Form';
import COLLABORATOR_FIELDS from '../../formFields/collaborator';
import { GET_COLLABORATORS } from '../../queries';
import { EDIT_COLLABORATOR } from '../../mutations';
import mapFieldsWithValues from '../../utils/form-field-mappings';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorForm', () => {
  let wrapper,
    props = {
      mutation: EDIT_COLLABORATOR,
      collabValues: {
        name: 'test',
        about: '<p>testing</p>'
      },
      mutateId: '1234',
      refetchQueries: [
        GET_COLLABORATORS
      ]
    };

  beforeEach(() => {
    wrapper = shallow(
      <CollaboratorForm {...props} />
    );
  });

  it('should render <Form />', () => {
    const actual = wrapper.containsMatchingElement(
      <Form
        mutation={props.mutation}
        fields={mapFieldsWithValues(COLLABORATOR_FIELDS, props.collabValues)}
        mutateId={props.id}
        refetchQueries={props.refetchQueries}
        baseUrl='/collaborators'
        successCopy={{
          success: '',
          homeLink: 'Go to Collaborators'
        }}
      />
    );
    expect(actual).to.equal(true);
  });

  describe('with props.isEdit', () => {
    it('should render <Form /> with correct props', () => {
      wrapper.setProps({
        isEdit: true
      });

      const actual = wrapper.containsMatchingElement(
        <Form
          mutation={props.mutation}
          fields={mapFieldsWithValues(COLLABORATOR_FIELDS, props.collabValues)}
          mutateId={props.id}
          refetchQueries={props.refetchQueries}
          baseUrl='/collaborators'
          successCopy={{
            success: 'Successfully updated!',
            homeLink: 'Go to Collaborators'
          }}
          isEdit
        />
      );
      expect(actual).to.equal(true);
    });
  });

});

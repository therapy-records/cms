import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorForm from './CollaboratorForm';
import Form from '../Form';
import { GET_COLLABORATORS } from '../../queries';
import { EDIT_COLLABORATOR } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorForm', () => {
  let wrapper,
    props = {
      mutation: EDIT_COLLABORATOR,
      fields: [
        { id: 'a', value: 'testing' },
        { id: 'b', value: 'testing' },
      ],
      id: '1234',
      refetchQueries: [
        GET_COLLABORATORS
      ]
    };

  beforeEach(() => {
    wrapper = shallow(
      <CollaboratorForm {...props} />
    );
  });

  it('should render <Form /> with correct props', () => {
    const actual = wrapper.containsMatchingElement(
      <Form
        mutation={props.mutation}
        fields={props.fields}
        mutateId={props.id}
        refetchQueries={props.refetchQueries}
        baseUrl='/collaborators'
        submitButtonCopy='Add Collaborator'
        successCopy={{
          success: 'Successfully created!',
          homeLink: 'Go to Collaborators',
          createLink: 'Create another Collaborator'
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
          fields={props.fields}
          mutateId={props.id}
          refetchQueries={props.refetchQueries}
          baseUrl='/collaborators'
          submitButtonCopy='Update Collaborator'
          successCopy={{
            success: 'Successfully updated!',
            homeLink: 'Go to Collaborators',
            createLink: 'Create a Collaborator'
          }}
          isEdit
        />
      );
      expect(actual).to.equal(true);
    });
  });

});

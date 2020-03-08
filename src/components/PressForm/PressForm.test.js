import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PressForm from './PressForm';
import Form from '../Form';
import { GET_PRESS } from '../../queries';
import { EDIT_PRESS } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) PressForm', () => {
  let wrapper,
    props = {
      mutation: EDIT_PRESS,
      fields: [
        { id: 'a', value: 'testing' },
        { id: 'b', value: 'testing' },
      ],
      id: '1234',
      refetchQueries: [
        GET_PRESS
      ]
    };

  beforeEach(() => {
    wrapper = shallow(
      <PressForm {...props} />
    );
  });

  it('should render <Form /> with correct props', () => {
    const actual = wrapper.containsMatchingElement(
      <Form
        mutation={props.mutation}
        fields={props.fields}
        mutateId={props.id}
        refetchQueries={props.refetchQueries}
        baseUrl='/press'
        submitButtonCopy='Add Press article'
        successCopy={{
          success: 'Successfully created!',
          homeLink: 'Go to Press',
          createLink: 'Create another Press article'
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
          baseUrl='/press'
          submitButtonCopy='Update article'
          successCopy={{
            success: 'Successfully updated!',
            homeLink: 'Go to Press',
            createLink: 'Create a Press article'
          }}
          isEdit
        />
      );
      expect(actual).to.equal(true);
    });
  });

});

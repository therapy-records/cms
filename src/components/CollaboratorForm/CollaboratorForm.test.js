import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorForm from './index';
import { CREATE_COLLABORATOR } from '../../mutations';
import Form from '../Form';
import COLLABORATOR_FIELDS from './fields';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorForm', () => {
  let wrapper,
      props = {
        isEditForm: true
      };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<CollaboratorForm {...props} />);
    });

    it('should render <Form /> with correct props', () => {
      const actual = wrapper.containsMatchingElement(
        <Form
          mutation={CREATE_COLLABORATOR}
          fields={COLLABORATOR_FIELDS}
          isEditForm={props.isEditForm}
        />
      );
      expect(actual).to.eq(true);
    });
  });

});

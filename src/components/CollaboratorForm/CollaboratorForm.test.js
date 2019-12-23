import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorForm from './index';
import TextInput from '../FormElements/TextInput';
import TextInputsList from '../FormElements/TextInputsList';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorForm', () => {
  let wrapper,
    props = {
      formValues: {
        title: 'Test Person'
      },
      location: {
        pathname: '/collaborators/create'
      }
    }

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<CollaboratorForm {...props} />);
    });

    it('should render a name field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInput
          type='text'
          placeholder='Phil Collins'
          label='Name'
          name='name'
          required
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render an about field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInput
          type='text'
          placeholder='Lorem ipsum...'
          label='About'
          name='about'
          required
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render a collabOn field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInputsList
          label="Collaborated on"
          items={['', '']}
          name='collabOn'
        />
      );
      expect(actual).to.equal(true);
    });

    describe('submit button', () => {
      it('should render', () => {
        const actual = wrapper.containsMatchingElement(
          <button type='submit'>Add Collaborator</button>
        );
        expect(actual).to.equal(true);
      });

      describe('when it\'s an `edit` form', () => {
        it('should render submit button copy', () => {
          wrapper.setProps({
            isEditForm: true
          });
          const actual = wrapper.containsMatchingElement(
            <button type='submit'>Update Collaborator</button>
          );
          expect(actual).to.equal(true);
        });

      });
    });

  });

});

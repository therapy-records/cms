import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import Form from './index';
import Sticky from '../Sticky/Sticky';
import { CREATE_COLLABORATOR } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: CREATE_COLLABORATOR,
      variables: {
        name: 'test',
        role: 'test',
        about: 'test',
        avatarUrl: 'https://via.placeholder.com/250'
      }
    },
    result: {
      data: {
        name: 'test',
        role: 'test',
        about: 'test',
        avatarUrl: 'https://via.placeholder.com/250'
      }
    }
  }
];

describe('(Component) Form', () => {
  let wrapper;
  const props = {
    fields: [
      {
        id: 'name',
        type: 'text',
        component: 'TextInput',
        label: 'Name',
        required: true
      },
      {
        id: 'role',
        type: 'text',
        component: 'TextInput',
        label: 'Role',
        required: true
      },
      {
        id: 'about',
        type: 'text',
        component: 'TextInput',
        label: 'About',
        required: true
      },
      {
        id: 'avatarUrl',
        type: 'text',
        component: 'TextInput',
        label: 'Avatar Url',
        required: true
      }
    ],
    mutation: CREATE_COLLABORATOR
  }

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  /*
  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Form {...props} />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render a FormField from prop.fields', () => {
      const fieldObj = props.fields[0];
      const formField = wrapper.find('FormField');
      expect(formField.length).to.eq(1);
      expect(formField.prop('id')).to.eq(fieldObj.id);
      expect(formField.prop('type')).to.eq(fieldObj.type);
      expect(formField.prop('component')).to.eq(fieldObj.component);
      expect(formField.prop('label')).to.eq(fieldObj.label);
      expect(formField.prop('placeholder')).to.eq(fieldObj.placeholder);
      expect(formField.prop('required')).to.eq(fieldObj.required);
      expect(formField.prop('onChange')).to.be.a('function');
    });

    describe('submit button', () => {
      it('should render', () => {
        const actual = wrapper.containsMatchingElement(
          <button type='submit'>Add</button>
        );
        expect(actual).to.equal(true);
      });

      describe('when it\'s an `edit` form', () => {
        beforeEach(() => {
          wrapper = mount(
            <BrowserRouter>
              <MockedProvider mocks={mocks} addTypename={false}>
                <Form {...props} isEditForm />
              </MockedProvider>
            </BrowserRouter>
          );
        });

        it('should render submit button copy', () => {
          const actual = wrapper.containsMatchingElement(
            <button type='submit'>Update</button>
          );
          expect(actual).to.equal(true);
        });

      });
    });

  });
  */

  describe('when the graphQL query errors', () => {
    it('should render <ErrorMessage />', async() => {
      mocks = [{
        request: {
          query: CREATE_COLLABORATOR,
          variables: {
            name: 'test',
            role: 'test',
            about: 'test',
            avatarUrl: 'https://via.placeholder.com/250'
            // collabOn: ['a', 'b']
          }
        },
        error: new Error('Oh no')
      }];

      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Form {...props} />
        </MockedProvider>
      );

      wrapper.find('input#name').simulate('change', { target: { value: 'test' } });
      wrapper.find('input#role').simulate('change', { target: { value: 'test' } });
      wrapper.find('input#about').simulate('change', { target: { value: 'test' } });
      wrapper.find('input#avatarUrl').simulate('change', { target: { value: 'https://via.placeholder.com/250' } });

      wrapper.find('form').simulate('submit');

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <Sticky>
            <p>Form is invalid</p>
          </Sticky>
        );
        expect(actual).to.equal(true);
      });
    });
  });


});

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import Form, { handleFieldError } from './index';
import { CREATE_COLLABORATOR } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: CREATE_COLLABORATOR,
      variables: {
        name: 'test',
        avatarUrl: 'test.com'
      }
    },
    result: {
      data: {
        _id: 'abc1',
        name: 'test',
        avatarUrl: 'test.com'
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
        placeholder: 'Phil Collins',
        required: true
      }
    ],
    mutation: CREATE_COLLABORATOR
  }

  // const actions = async (wrapper, _actions) => {
  //   await act(async () => {
  //     await (new Promise(resolve => setTimeout(resolve, 0)));
  //     _actions();
  //     wrapper.update();
  //   });
  // };

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

});

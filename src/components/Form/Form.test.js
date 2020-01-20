import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter } from 'react-router-dom';
import Form from './Form';
import StickyNew from '../StickyNew';
import LoadingSpinner from '../LoadingSpinner';
import { CREATE_COLLABORATOR } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

const mockQueryVariables = {
  name: 'test',
  avatarUrl: 'https://via.placeholder.com/250',
  role: 'test',
  about: 'test'
};

// TODO: update with mutateId
let mocks = [
  {
    request: {
      query: CREATE_COLLABORATOR,
      variables: mockQueryVariables
    },
    result: {
      data: mockQueryVariables
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
        placeholder: 'test',
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
    mutation: CREATE_COLLABORATOR,
    baseUrl: '/test',
    successCopy: {
      homeLink: 'Go to Collaborators',
      createLink: 'Create another Collaborator'
    }
  }

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  const completeRequiredFields = wrapper => {
    wrapper.find('input#name').simulate('change', { target: { value: 'test' } });
    wrapper.find('input#role').simulate('change', { target: { value: 'test' } });
    wrapper.find('input#about').simulate('change', { target: { value: 'test' } });
    wrapper.find('input#avatarUrl').simulate('change', { target: { value: mockQueryVariables.avatarUrl } });
  };

  describe('rendering', () => {
  
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
        const formField = wrapper.find('FormField').first();
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
            <input
              type='submit'
              value='Add'
            />
          );
          expect(actual).to.equal(true);
        });

        describe('when form is invalid', () => {
          it('should be disabled', () => {
            const actual = wrapper.containsMatchingElement(
              <input
                type='submit'
                disabled
                value='Add'
              />
            );
            expect(actual).to.equal(true);
          });
        });

        describe('when form is valid', () => {
          it('should NOT be disabled', () => {
            completeRequiredFields(wrapper);
            const actual = wrapper.containsMatchingElement(
              <input
                type='submit'
                disabled={false}
                value='Add'
              />
            );
            expect(actual).to.equal(true);
          });
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
              <input
                type='submit'
                value='Update'
              />
            );
            expect(actual).to.equal(true);
          });

        });
      });

    });

    // TODO test. issues getting the success response back from query. Loads of others having similar issue.
    // describe('when the graphQL query is a success', () => {
    //   it('should render <SuccessMessage />', async() => {

    //     wrapper = mount(
    //       <BrowserRouter>
    //         <MockedProvider mocks={mocks}>
    //           <Form {...props} />
    //         </MockedProvider>
    //       </BrowserRouter>
    //     );

    //     completeRequiredFields(wrapper);
    //     wrapper.find('form').simulate('submit');

    //     await actions(wrapper, () => {
    //       wrapper.update();
    //       const successMessage = wrapper.find('SuccessMessage');
    //       expect(successMessage.length).to.eq(1);
    //     });
    //   });
    // });

    describe('when the graphQL query is loading', () => {
      it('should render <LoadingSpinner />', async() => {
        wrapper = mount(
          <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
              <Form {...props} />
            </MockedProvider>
          </BrowserRouter>
        );

        completeRequiredFields(wrapper);
        wrapper.find('form').simulate('submit');

        await actions(wrapper, () => {
          const actual = wrapper.containsMatchingElement(
            <LoadingSpinner
              active
              fullScreen
            />
          );
          expect(actual).to.equal(true);
        });
      });
    });

    describe('when the graphQL query errors', () => {
      it('should render <ErrorMessage />', async() => {
        mocks = [{
          request: {
            query: CREATE_COLLABORATOR,
            variables: mockQueryVariables
          },
          error: new Error('Oh no')
        }];

        wrapper = mount(
          <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
              <Form {...props} />
            </MockedProvider>
          </BrowserRouter>
        );

        completeRequiredFields(wrapper);

        wrapper.find('form').simulate('submit');

        await actions(wrapper, () => {
          wrapper.update();
          const actual = wrapper.containsMatchingElement(
            <StickyNew>
              <p>Sorry, something has gone wrong.</p>
            </StickyNew>
          );
          expect(actual).to.equal(true);
        });
      });
    });

  });

});

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter } from 'react-router-dom';
import Form from './Form';
import LoadingSpinner from '../LoadingSpinner';
import { EDIT_COLLABORATOR } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

const MOCK_QUERY_VARIABLES = {
  id: '1234',
  name: 'test',
  avatarUrl: 'https://via.placeholder.com/250',
  role: 'test',
  about: 'test'
};

let mocks = [
  {
    request: {
      query: EDIT_COLLABORATOR,
      variables: MOCK_QUERY_VARIABLES
    },
    result: {
      data: MOCK_QUERY_VARIABLES
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
    mutation: EDIT_COLLABORATOR,
    mutateId: '1234',
    baseUrl: '/test',
    submitButtonCopy: 'Submit this form',
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
    wrapper.find('input#avatarUrl').simulate('change', { target: { value: MOCK_QUERY_VARIABLES.avatarUrl } });
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
              value={props.submitButtonCopy}
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
                value={props.submitButtonCopy}
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
                value={props.submitButtonCopy}
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
      it('should render <StickyError />', async() => {
        mocks = [{
          request: {
            query: EDIT_COLLABORATOR,
            variables: {
              ...MOCK_QUERY_VARIABLES,
              id: props.mutateId
            }
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
          const stickyError = wrapper.find('StickyError');
          expect(stickyError.prop('message')).to.eq('Sorry, something has gone wrong.');
          expect(stickyError.prop('error')).to.exist;
        });
      });
    });

  });

});

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import CollaboratorEdit from './CollaboratorEdit';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import { EDIT_COLLABORATOR } from '../../../mutations';
import Form from '../../../components/Form';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import { mapFieldsWithValues } from '../../../utils/form';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: GET_COLLABORATOR,
      variables: { id: '1234' }
    },
    result: {
      data: {
        collaborator: {
          _id: '1234',
          name: 'test',
          role: 'testing',
          about: '<p>test</p>',
          avatarUrl: 'test.com',
          urls: {
            website: 'test',
            facebook: 'test',
            instagram: 'test',
            twitter: 'test',
            soundcloud: 'test',
            bio: 'test',
            email: 'test@test.com',
            phone: '0123456789',
            other: []
          },
          collabOn: []
        }
      }
    }
  }
];

describe('(Component) CollaboratorEdit', () => {
  let wrapper,
    props = {
      match: {
        params: {
          id: '1234'
        }
      },
      baseUrl: '/collaborators',
      successCopy: {
        homeLink: 'Go to Collaborators'
      }
    };

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <CollaboratorEdit {...props} />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render a page title', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <h2>Edit Collaborator</h2>
        );
        expect(actual).to.equal(true);
      });
    });

    it('should render <Form />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <Form
            mutation={EDIT_COLLABORATOR}
            fields={mapFieldsWithValues(COLLABORATOR_FIELDS, mocks[0].result.data.collaborator)}
            mutateId={props.match.params.id}
            refetchQueries={[
              { query: GET_COLLABORATORS }
            ]}
            baseUrl={props.baseUrl}
            successCopy={props.successCopy}
            isEditForm
          />

        );
        expect(actual).to.equal(true);
      });
    });
  });

  describe('when the graphQL query is loading', () => {

    it('should render <LoadingSpinner />', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <CollaboratorEdit {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

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
          query: GET_COLLABORATOR
        },
        error: new Error('Something went wrong')
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <CollaboratorEdit {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <ErrorMessage />
        );
        expect(actual).to.equal(true);
      });
    });
  });

});

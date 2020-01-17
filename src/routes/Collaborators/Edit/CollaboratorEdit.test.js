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
      }
    };

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CollaboratorEdit {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(GET_COLLABORATOR);
    expect(queryContainer.prop('queryVariables')).to.deep.eq({
      id: props.match.params.id
    });
    expect(queryContainer.prop('entityName')).to.eq('collaborator');
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
          baseUrl='/collaborators'
          successCopy={{
            homeLink: 'Go to Collaborators'
          }}
          isEditForm
        />
      );
      expect(actual).to.equal(true);
    });
  });

});

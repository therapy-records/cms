import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import MutationContainer from './MutationContainer';
import { DELETE_COLLABORATOR } from '../../mutations'
import LoadingSpinner from '../../components/LoadingSpinner';
import FormSuccess from '../../components/FormElements/FormSuccess';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: DELETE_COLLABORATOR,
      variables: { id: '1234' }
    },
    result: {
      data: {
        deleteCollaborator: {
          _id: '1234'
        }
      }
    }
  }
];

const MockComponent = ({ executeMutation }) => (
  <button onClick={executeMutation} />
);
MockComponent.propTypes = { executeMutation: PropTypes.func.isRequired }


const triggerMutation = wrapper =>
  wrapper.find('button').prop('onClick')();


describe('(Container) MutationContainer', () => {
  let wrapper,
      props = {
        baseUrl: '/collaborators',
        entityName: 'collaborator',
        mutation: DELETE_COLLABORATOR,
        mutationVariables: {
          id: '1234'
        },
        render: ({ executeMutation }) => (
          <MockComponent executeMutation={executeMutation} />
        )
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
          <MutationContainer {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  })

  it('should render a component passed through props.render with executeMutation function prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const mockComponent = wrapper.find('MockComponent');
      expect(mockComponent.length).to.eq(1);
      expect(mockComponent.prop('executeMutation')).to.be.a('function');
    });
  });

  describe('when the graphQL mutation is loading', () => {

    it('should render <LoadingSpinner />', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <MutationContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        triggerMutation(wrapper);
        wrapper.update();
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

  describe('when the graphQL mutation is successful', () => {

    it('should render <FormSuccess />', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <MutationContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      act(() => {
        triggerMutation(wrapper);
      });

      await actions(wrapper, () => {
        wrapper.update();
        const formSuccess = wrapper.find('FormSuccess');
        expect(formSuccess.length).to.eq(1);
        const actual = wrapper.containsMatchingElement(
          <FormSuccess
            baseUrl={props.baseUrl}
            copy={{
              success: 'Successfully mutated',
              homeLink: `Go to ${props.entityName}`
            }}
          />
        );
        expect(actual).to.equal(true);
      });
    });
  });

});

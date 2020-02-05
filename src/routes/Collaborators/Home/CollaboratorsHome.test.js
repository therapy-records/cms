import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Link } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import CollaboratorsHome from './index';
import { GET_COLLABORATORS } from '../../../queries';
import { EDIT_COLLABORATORS_ORDER_NUMBERS } from '../../../mutations';
import { MOCK_GET_COLLABORATORS } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_COLLABORATORS
];

describe('(Component) CollaboratorsHome', () => {
  let wrapper;

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CollaboratorsHome />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(GET_COLLABORATORS);
    expect(queryContainer.prop('entityName')).to.eq('collaborators');
  });

  it('should render <MutationContainer />', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const mutationContainer = wrapper.find('MutationContainer');
      expect(mutationContainer.length).to.eq(1);
      expect(mutationContainer.prop('baseUrl')).to.eq('/collaborators');
      expect(mutationContainer.prop('mutation')).to.eq(EDIT_COLLABORATORS_ORDER_NUMBERS);
      expect(mutationContainer.prop('mutationVariables')).to.deep.eq({
        input: {
          collaborators: []
        }
      });
      expect(mutationContainer.prop('successCopy')).to.deep.eq({
        success: 'Ordering updated 🎉',
      });
    });
  });

  it('should render <CollaboratorsHomeContent /> from <MutationContainer /> render prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();

      const collaboratorsHomeContent = wrapper.find('CollaboratorsHomeContent');
      expect(collaboratorsHomeContent.length).to.eq(1);
      expect(collaboratorsHomeContent.prop('listItems')).to.deep.eq(mocks[0].result.data.collaborators);
      expect(collaboratorsHomeContent.prop('executeMutation')).to.be.a('function');
      expect(collaboratorsHomeContent.prop('listOrderHasChanged')).to.eq(false)
      expect(collaboratorsHomeContent.prop('onListOrderChanged')).to.be.a('function');
    });
  });

  describe('when <CollaboratorsHomeContent /> onListOrderChanged prop is called', () => {
    it('should set the updated array (simplified) in <MutationContainer /> mutationVariables prop', async() => {
      await actions(wrapper, () => {
        wrapper.update();
      
        const collaboratorsHomeContent = wrapper.find('CollaboratorsHomeContent');
        const mockListOrderArray = [
          { name: 'a', orderNumber: '1', _id: '123' },
          { name: 'b', orderNumber: '2', _id: '456' }
        ];

        collaboratorsHomeContent.prop('onListOrderChanged')(mockListOrderArray);
        wrapper.update();

        const mutationContainer = wrapper.find('MutationContainer');
        expect(mutationContainer.prop('mutationVariables')).to.deep.eq({
          input: {
            collaborators: [
              { _id: '123', orderNumber: '1' },
              { _id: '456', orderNumber: '2' }
            ]
          }
        });
      });

    });
    
    it('should set the <CollaboratorsHomeContent /> listOrderHasChanged prop to true', async() => {
      await actions(wrapper, () => {
        wrapper.update();

        let collaboratorsHomeContent = wrapper.find('CollaboratorsHomeContent');
        const mockListOrderArray = [
          { name: 'a', orderNumber: '1', _id: '123' },
          { name: 'b', orderNumber: '2', _id: '456' }
        ];

        collaboratorsHomeContent.prop('onListOrderChanged')(mockListOrderArray);
        wrapper.update();

        collaboratorsHomeContent = wrapper.find('CollaboratorsHomeContent');
        expect(collaboratorsHomeContent.prop('listOrderHasChanged')).to.eq(true);
      });
    });
  });

});

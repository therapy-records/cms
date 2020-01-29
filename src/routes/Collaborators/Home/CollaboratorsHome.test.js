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
        success: 'Ordering updated!',
        homeLink: 'Go to Collaborators'
      });
    });
  });

  it('should render a page title from <MutationContainer /> render prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();

      const actual = wrapper.containsMatchingElement(
        <h2>Collaborators 🌈</h2>
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render a button to change order from <MutationContainer /> render prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();

      const button = wrapper.find('button').first();
      expect(button.text()).to.eq('Change order');
    });
  });


  it('should render a link to create from <MutationContainer /> render prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();

      const actual = wrapper.containsMatchingElement(
        <Link to='collaborators/create'>Create</Link>
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render <CollaboratorsList /> from <MutationContainer /> render prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();

      const collaboratorsList = wrapper.find('CollaboratorsList');
      expect(collaboratorsList.length).to.eq(1);
      expect(collaboratorsList.prop('listItems')).to.deep.eq(mocks[0].result.data.collaborators);
      expect(collaboratorsList.prop('showSortableList')).to.eq(false);
      expect(collaboratorsList.prop('onOrderChanged')).to.be.a('function');
    });
  });

  describe('when `order` button is clicked', () => {

    it('should change the button text', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const button = wrapper.find('button').first();
        button.simulate('click');
        expect(button.text()).to.eq('Update order');
      });
    });

    it('should change <CollaboratorsList /> showSortableList prop', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const button = wrapper.find('button').first();
        button.simulate('click');
        const collaboratorsList = wrapper.find('CollaboratorsList');
        expect(collaboratorsList.prop('showSortableList')).to.eq(true);
      });
    });

  });

});

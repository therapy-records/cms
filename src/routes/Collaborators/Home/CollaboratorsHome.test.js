import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Link } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import CollaboratorsHome from './index';
import { GET_COLLABORATORS } from '../../../queries';
import List from '../../../components/List';
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

  describe('when there are no errors', () => {

    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Collaborators 🌈</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render a link to create', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='collaborators/create'>Create</Link>
      );
      expect(actual).to.equal(true);
    });

    it('should render <QueryContainer />', () => {
      const queryContainer = wrapper.find('QueryContainer');
      expect(queryContainer.length).to.eq(1);
      expect(queryContainer.prop('query')).to.eq(GET_COLLABORATORS);
      expect(queryContainer.prop('entityName')).to.eq('collaborators');
    });

    it('should render <List /> from <SingleEntityContainer /> render prop', async() => {
      await actions(wrapper, () => {
        wrapper.update();

        const actual = wrapper.containsMatchingElement(
          <List
            data={mocks[0].result.data.collaborators}
            route='collaborators'
            columns
          />
        );
        expect(actual).to.equal(true);

      });
    });


  });

});

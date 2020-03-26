import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GET_STATS } from '../../../queries';
import Stats from './Stats';
import { MOCK_GET_STATS } from '../../../mocks/stats.mock'

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_STATS
];

describe('(Component) Stats', () => {
  let wrapper;

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
          <Stats />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(GET_STATS);
  });

  describe('with graphQL query success', () => {

    it('should render list items from query data', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsAllMatchingElements([
          <li>{mocks[0].result.data.news.length} News articles</li>,
          <li>{mocks[0].result.data.journalism.length} Journalism articles</li>,
          <li>{mocks[0].result.data.press.length} Press articles</li>,
          <li>{mocks[0].result.data.collaborators.length} Collaborators</li>
        ]);
      });
    });

  });

});

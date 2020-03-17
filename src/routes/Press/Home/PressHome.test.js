import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Link } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import PressHome from './index';
import { GET_PRESS } from '../../../queries';
import { MOCK_GET_PRESS } from '../../../mocks/press.mock';
import PageHeader from '../../../components/PageHeader';
import List from '../../../components/List';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_PRESS
];

describe('(Component) PressHome', () => {
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
          <PressHome />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(GET_PRESS);
    expect(queryContainer.prop('entityName')).to.eq('press');
  });

  it('should render <PageHeader /> from <QueryContainer /> render prop', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <PageHeader
          heading='Press 📢'
          showCreateButton
        />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render a <List /> from <QueryContainer /> render prop', async() => {
    await actions(wrapper, () => {
      const expectedData = MOCK_GET_PRESS.result.data.press.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)).reverse();
      wrapper.update()
      const actual = wrapper.containsMatchingElement(
        <List
          data={expectedData}
          route='press'
        />
      );
      expect(actual).to.eq(true);
    });
  });

});

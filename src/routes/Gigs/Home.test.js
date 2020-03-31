import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import PageHeader from '../../components/PageHeader';
import List from '../../components/List';
import { GET_GIGS } from '../../queries/index';
import { MOCK_GET_GIGS } from '../../mocks/gigs.mock';
import GigsHome from './index';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_GIGS
];

describe('(Component) Gigs - Home', () => {
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
          <GigsHome />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(GET_GIGS);
    expect(queryContainer.prop('entityName')).to.eq('gigs');
  });

  it('should render <PageHeader />', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <PageHeader
          heading='Gigs 🗓️'
          entityCollection='gigs'
          renderCreateButton
        />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render a <List /> from <QueryContainer /> render prop', async() => {
    await actions(wrapper, () => {
      const expectedData = MOCK_GET_GIGS.result.data.gigs.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)).reverse();
      wrapper.update()
      const actual = wrapper.containsMatchingElement(
        <List
          data={expectedData}
          route='gigs'
        />
      );
      expect(actual).to.eq(true);
    });
  });

});

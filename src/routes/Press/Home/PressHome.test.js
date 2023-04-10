import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import PressHome from './index';
import { GET_PRESS } from '../../../queries';
import { MOCK_GET_PRESS, MOCK_GET_PRESS_EMPTY } from '../../../mocks/press.mock';
import PageHeader from '../../../components/PageHeader';
import List from '../../../components/List';
import EmptyMessage from '../../../components/EmptyMessage';
import { getPressCategoryById } from '../../../helpers';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
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
          entityCollection='press'
          renderCreateButton
        />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render a <List /> from <QueryContainer /> render prop', async() => {
    await actions(wrapper, () => {
      const mappedData = MOCK_GET_PRESS.result.data.press.map((article) => {
        const mapped = article;

        if (article.categoryId) {
          mapped.category = getPressCategoryById(article.categoryId).TEXT;
        }

        return mapped;
      });

      const expectedData = mappedData.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

      wrapper.update();

      const actual = wrapper.containsMatchingElement(
        <List
          data={expectedData}
          route='press'
        />
      );
      expect(actual).to.eq(true);
    });
  });

  describe('when there are no articles', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={[MOCK_GET_PRESS_EMPTY]} addTypename={false}>
            <PressHome />
          </MockedProvider>
        </BrowserRouter>
      );
    });

    it('should render <EmptyMessage />', async () => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <EmptyMessage
            entityName='press'
            createCopy='Create Press'
          />
        );
        expect(actual).to.equal(true);
      });
    });
  });
});

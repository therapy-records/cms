import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import QueryContainer from './QueryContainer';
import {
  GET_COLLABORATOR,
  GET_STATS
} from '../../queries'
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyNew from '../../components/StickyNew';
import CollaboratorDetails from '../../components/CollaboratorDetails';
import { MOCK_GET_COLLABORATOR } from '../../mocks/collaborators.mock';
import { MOCK_GET_STATS } from '../../mocks/stats.mock';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_COLLABORATOR,
  MOCK_GET_STATS
];

const MockComponent = ({ data }) => {
  return (
    <ul>
      {data && data.news.map(i => (
        <li key={i.title}>test</li>
      ))}
    </ul>
  )
}

describe('(Container) QueryContainer', () => {
  let wrapper,
    props = {
      entityName: 'collaborator',
      query: GET_COLLABORATOR,
      queryVariables: {
        id: '1234'
      },
      render: renderProps => (
        <CollaboratorDetails {...renderProps} />
      )
    };

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  describe('when there are no errors', () => {
    it('should render a component passed through props.render with query data/props', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <QueryContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <CollaboratorDetails {...mocks[0].result.data[props.entityName]} />
        );
        expect(actual).to.equal(true);
      });
    });

    describe('when there is no props.entityName', () => {
      it('should render a component passed through props.render without entityName', async() => {

        const noEntityNameProps = {
          query: GET_STATS,
          render: queryData => (
            <MockComponent data={queryData} />
          )
        };

        wrapper = mount(
          <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
              <QueryContainer
                {...noEntityNameProps}
              />
            </MockedProvider>
          </BrowserRouter>
        );

        await actions(wrapper, () => {
          wrapper.update();
          const actual = wrapper.containsMatchingElement(
            <MockComponent data={mocks[1].result.data} />
          );
          expect(actual).to.equal(true);
        });
      });
    });
  });

  describe('when the graphQL query is loading', () => {

    it('should render <LoadingSpinner />', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <QueryContainer {...props} />
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
    it('should render <StickyNew />', async() => {
      mocks = [{
        request: {
          query: GET_COLLABORATOR
        },
        error: new Error('Something went wrong')
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <QueryContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <StickyNew>
            <p>Sorry, something has gone wrong.</p>
          </StickyNew>
        );
        expect(actual).to.equal(true);
      });
    });
  });

});

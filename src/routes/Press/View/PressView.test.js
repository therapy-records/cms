import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  GET_PRESS,
  GET_PRESS_ARTICLE
} from '../../../queries';
import { DELETE_PRESS_ARTICLE } from '../../../mutations';
import PressView from './PressView';
import { MOCK_GET_PRESS_ARTICLE } from '../../../mocks/press.mock';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_PRESS_ARTICLE
];

describe('(Component) PressView', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        id: '1234'
      }
    }
  };

  // const actions = async(wrapper, _actions) => {
  //   await act(async() => {
  //     await (new Promise(resolve => setTimeout(resolve, 0)));
  //     _actions();
  //     wrapper.update();
  //   });
  // };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PressView {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/press');
    expect(singleEntityContainer.prop('entityName')).to.eq('pressArticle');
    expect(singleEntityContainer.prop('entityCollection')).to.eq('press');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_PRESS_ARTICLE);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_PRESS_ARTICLE);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Press'
    });
    expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
      cacheQuery: GET_PRESS,
      responseObjName: 'deletePress'
    });
  });

  // TODO: should render X from <SingleEntityContainer /> render prop

});

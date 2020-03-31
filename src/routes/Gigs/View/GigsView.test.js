import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  GET_GIG,
  GET_GIGS
} from '../../../queries';
import { DELETE_GIG } from '../../../mutations';
import GigsView from './GigsView';
import { MOCK_GET_GIG } from '../../../mocks/gigs.mock';
import moment from 'moment';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
    MOCK_GET_GIG
];

describe('(Component) GigsView', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        id: '1234'
      }
    }
  };

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
          <GigsView {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', async() => {
    await actions(wrapper, () => {
      wrapper.update();
    
      const singleEntityContainer = wrapper.find('SingleEntityContainer');
      expect(singleEntityContainer.length).to.eq(1);
      expect(singleEntityContainer.prop('baseUrl')).to.eq('/gigs');
      expect(singleEntityContainer.prop('entityName')).to.eq('gig');
      expect(singleEntityContainer.prop('entityCollection')).to.eq('gigs');
      expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
      expect(singleEntityContainer.prop('query')).to.eq(GET_GIG);
      expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_GIG);
      expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
        success: 'Successfully deleted.',
        homeLink: 'Go to Gigs'
      });
      expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
        cacheQuery: GET_GIGS,
        responseObjName: 'deleteGig'
      });
    });
  });

    it('should render gig date from <SingleEntityContainer /> render prop', async() => {
        await actions(wrapper, () => {
            wrapper.update();
            const actual = wrapper.containsAllMatchingElements([
                <p>{moment(new Date(mocks[0].result.data.gig.date)).format('ddd')}</p>,
                <p>{moment(new Date(mocks[0].result.data.gig.date)).format('DD')}</p>,
                <p>{moment(new Date(mocks[0].result.data.gig.date)).format('MMM')}</p>
            ]);
            expect(actual).to.eq(true);
        });
    });

    it('should render gig details (venue, location, date, url) from <SingleEntityContainer /> render prop', async () => {
        await actions(wrapper, () => {
            wrapper.update();
            const venue = mocks[0].result.data.gig.venue;
            const location = mocks[0].result.data.gig.location;
            const expectedDate = moment(new Date(mocks[0].result.data.gig.date)).format('LT');
            const ticketsUrl = mocks[0].result.data.gig.ticketsUrl;

            const actual = wrapper.containsAllMatchingElements([
                <p>{venue}, {location}, {expectedDate}</p>,
                <p><a href={ticketsUrl} target="_blank">{ticketsUrl}</a></p>
            ]);
            expect(actual).to.eq(true);
        });
    });

});

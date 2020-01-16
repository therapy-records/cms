import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GET_COLLABORATOR } from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import CollaboratorView from './CollaboratorView';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import CollaboratorDetails from '../../../components/CollaboratorDetails';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorView', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        id: '1234'
      }
    }
  };

  beforeEach(() => {
    wrapper = shallow(
      <CollaboratorView {...props} />
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const actual = wrapper.containsMatchingElement(
      <SingleEntityContainer
        baseUrl='/collaborators'
        entityName='collaborator'
        id={props.match.params.id}
        component={CollaboratorDetails}
        query={GET_COLLABORATOR}
        mutation={DELETE_COLLABORATOR}
        renderEditLink
      />
    );
    expect(actual).to.equal(true);
  });

});

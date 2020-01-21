import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedStickyAuthError, { StickyAuthError } from './StickyAuthError';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) StickyAuthError', () => {
  let wrapper,
    props = {
      message: 'Something has gone wrong'
    };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<StickyAuthError {...props} />);
    });

    it('should render with props.message', () => {
      const actual = wrapper.containsMatchingElement(
        <div className='sticky-auth-error'>
          <p>{props.message}</p>
        </div>
      );
      expect(actual).to.eq(true);
    });

    describe('when there is no props.message', () => {
      it('should not render', () => {
        wrapper.setProps({message: ''});
        expect(wrapper.type()).to.eq(null);
      });
    });
  });

  describe('ConnectedStickyAuthError', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      errorAlert: {
        message: 'oh no'
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedStickyAuthError
          store={store}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.message).to.eq(mockStoreState.errorAlert.message);
    });
  });
});

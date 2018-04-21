import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';

const TestComponent = () => {
  return (
    <div>
    test component
    </div>
  )
};

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <p>header here</p>

          <div className="main-container">
            <Switch>
              <Route path="/test" component={TestComponent} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

// const mapStateToProps = (state) => ({
//   isAuth: state.user.isAuth,
//   showSubscriptionModal: state.uiState.subscriptionModal.show
// })

const ConnectedRouter = connect(
  null,
  null
)(Router);

const Routes = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter />
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;


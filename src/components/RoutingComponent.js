/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import MarketPage from '../pages/MarketPage';
import Navbar from './Navbar';
/* eslint-enable no-unused-vars */

function RoutingComponent({ user, handleSignOut }) {
  return (
    <Router>
      <>
        <Navbar user={user} handleSignOut={handleSignOut} />
        <div className="app-container">
          <Route exact path="/" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route
            path="/markets/:marketId"
            component={({ match }) => (
              <MarketPage marketId={match.params.marketId} />
            )}
          />
        </div>
      </>
    </Router>
  );
}

export default RoutingComponent;

RoutingComponent.propTypes = {
  user: PropTypes.shape({}).isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

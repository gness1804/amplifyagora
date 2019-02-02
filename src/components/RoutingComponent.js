import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import MarketPage from '../pages/MarketPage';

function RoutingComponent() {
  return (
    <Router>
      <>
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

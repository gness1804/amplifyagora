import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.getUserData();
    Hub.listen('auth', this, 'onHubCapsule');
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      this.setState({ user });
    } else {
      this.setState({ user: null });
    }
  };

  /* eslint-disable consistent-return */
  onHubCapsule = capsule => {
    const { event } = capsule.payload;
    switch (event) {
      case 'signIn':
        this.getUserData();
        break;
      case 'signOut':
        this.setState({ user: null });
        break;
      case 'signUp':
        break;
      default:
        return null;
    }
    /* eslint-enable consistent-return */
  };

  render() {
    const theme = {
      ...AmplifyTheme,
      button: {
        ...AmplifyTheme.button,
        backgroundColor: '#FF9900',
        fontWeight: 600,
      },
      navBar: {
        ...AmplifyTheme.nav,
        backgroundColor: '#FFC66F',
        display: 'flex',
        justifyContent: 'space-around',
      },
    };
    const { user } = this.state;
    return user ? <RoutingComponent /> : <Authenticator theme={theme} />;
  }
}

// export default withAuthenticator(App, true, [], null, theme);
export default App;

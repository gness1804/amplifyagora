import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import './App.css';
import RoutingComponent from './components/RoutingComponent';

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
    return user ? (
      <RoutingComponent user={user} />
    ) : (
      <Authenticator theme={theme} />
    );
  }
}

export default App;

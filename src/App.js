import React, { createContext } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import './App.css';
import RoutingComponent from './components/RoutingComponent';

export const UserContext = createContext();

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

  handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      throw new Error(`There was a problem signing the user out: ${err}`);
    }
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
      <UserContext.Provider value={{ user }}>
        <RoutingComponent user={user} handleSignOut={this.handleSignOut} />
      </UserContext.Provider>
    ) : (
      <Authenticator theme={theme} />
    );
  }
}

export default App;

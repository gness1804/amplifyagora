import React from 'react';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react';
import './App.css';

class App extends React.Component {
  state = {};

  render() {
    return <div>App</div>;
  }
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#FF9900;',
    fontWeight: 600,
  },
  navBar: {
    ...AmplifyTheme.nav,
    backgroundColor: '#FFC66F',
    display: 'flex',
    justifyContent: 'space-around',
  },
};

export default withAuthenticator(App, true, [], null, theme);

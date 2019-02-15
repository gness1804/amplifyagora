/* eslint-disable no-unused-vars */
import React from 'react';
import Amplify from 'aws-amplify';
import ReactDOM from 'react-dom';
import App from './App';
import awsExports from './aws-exports';
import * as serviceWorker from './serviceWorker';
/* eslint-enable no-unused-vars */

import 'element-theme-default';

// Bring in default Element React theme
Amplify.configure(awsExports);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

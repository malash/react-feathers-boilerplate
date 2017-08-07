import React from 'react';
import { render } from 'react-dom';
import App from './pages/app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { AppContainer } from 'react-hot-loader';

const root = document.getElementById('root');
render(<AppContainer><App /></AppContainer>, root);

if (module.hot) {
  module.hot.accept('./pages/app', () => {
    const NextApp = require('./pages/app').default;
    render(<AppContainer><NextApp></NextApp></AppContainer>, root);
  });
}

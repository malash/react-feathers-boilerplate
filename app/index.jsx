import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './pages/app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

if (module.hot) {
  module.hot.accept();
}

render(<App />, document.getElementById('app'));
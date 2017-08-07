import React from 'react';
import { render } from 'react-dom';
import App from './pages/app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const root = document.getElementById('root');
render(<App />, root);

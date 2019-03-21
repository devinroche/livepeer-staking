import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './components/index';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

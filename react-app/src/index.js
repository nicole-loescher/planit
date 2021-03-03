import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as authActions from './store/auth.js';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  window.store = store;
  window.authActions = authActions;
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

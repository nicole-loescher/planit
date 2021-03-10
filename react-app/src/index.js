import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as authActions from './store/auth.js';
import * as partyActions from './store/party.js';
import * as itemActions from './store/item.js';
import * as inviteActions from './store/guestList.js';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  window.store = store;
  window.authActions = authActions;
  window.partyActions = partyActions;
  window.itemActions = itemActions;
  window.inviteActions = inviteActions;
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

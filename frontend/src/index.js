import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
// import { store } from './app/store';
import { Provider } from 'react-redux';
import './styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

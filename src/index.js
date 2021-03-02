import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './component/App.css';
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

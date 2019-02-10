import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CounterApp from './app';

ReactDOM.render(
  <CounterApp />,
  document.getElementById('counterApp')
);

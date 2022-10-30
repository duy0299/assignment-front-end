import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';



import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './sass/index.scss'

import Layout from './pages/Layout'

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

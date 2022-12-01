import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import ProtestPg from './ProtestPg';

ReactDOM.render(
  <BrowserRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/protestpg" component={ProtestPg} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

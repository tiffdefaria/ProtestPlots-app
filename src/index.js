import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App'
import ProtestPg from './ProtestPg';
import Login from './Login';
import Register from './Register'
import Dashboard from './dashboard'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/protestpg" element={<ProtestPg/>} />
        <Route path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

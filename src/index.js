import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import './css/Button.css';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </main>
    </Router>
  </React.StrictMode>
);
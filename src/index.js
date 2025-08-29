import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import './css/Button.css';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import DocsView from './views/DocsView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/cheat-docs" element={<DocsView />} />
        </Routes>
      </main>
    </Router>
  </React.StrictMode>
);
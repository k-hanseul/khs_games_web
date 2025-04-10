import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SpotTheDifference from './components/SpotTheDifference';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<SpotTheDifference />} />

        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import Home from './components/Home';
import SpotTheDifference from './components/SpotTheDifference';

function App() {
  return (
    <div className="App flex flex-row">
      <HashRouter>
      <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<SpotTheDifference />} /> */}
          <Route path="/SpotTheDifference" element={<SpotTheDifference />} />
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;

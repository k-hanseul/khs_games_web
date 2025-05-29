import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import Home from './components/Home';
import SpotTheDifference from './components/SpotTheDifference';
import FindOldArtwork from './components/FindOldArtwork';
import Minesweeper from './components/Minesweeper';

function App() {
  return (
    <div className="App flex flex-row">
      {/* <div className="App"> */}
      <HashRouter>
      <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SpotTheDifference" element={<SpotTheDifference />} />
          <Route path="/FindOldArtwork" element={<FindOldArtwork />} />
          <Route path="/Minesweeper" element={<Minesweeper />} />
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;

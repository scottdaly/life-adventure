// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import { AuthProvider } from "./components/AuthContext";
import { GameStateProvider } from "./context/gameStateContext";

const App = () => {
  return (
    <AuthProvider>
      <GameStateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Game />} />
          </Routes>
        </Router>
      </GameStateProvider>
    </AuthProvider>
  );
};

export default App;

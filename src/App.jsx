// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./components/Home";
import Game from "./components/Game";
import Account from "./components/Account";
import { AuthProvider } from "./components/AuthContext";
import { GameStateProvider } from "./context/gameStateContext";
import Header from "./components/Header";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GameStateProvider>
          <Router>
            <div className="min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Game />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </div>
          </Router>
        </GameStateProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

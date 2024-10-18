import React, { createContext, useContext, useState } from "react";

const GameStateContext = createContext();

export const useGameState = () => {
  return useContext(GameStateContext);
};

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);
  const [relationships, setRelationships] = useState([]);
  return (
    <GameStateContext.Provider
      value={{ gameState, setGameState, relationships, setRelationships }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

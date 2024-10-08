// src/utils/localStorage.js

const GAME_STATES_KEY = "lifeSimGameStates";
const LIFE_HISTORY_KEY = "lifeSimLifeHistory";

export const saveGameStateToLocal = (gameState) => {
  try {
    const gameStates = getGameStatesFromLocal();
    const updatedStates = gameStates.map((state) =>
      state.id === gameState.id ? gameState : state
    );
    if (!gameStates.find((state) => state.id === gameState.id)) {
      updatedStates.push(gameState);
    }
    localStorage.setItem(GAME_STATES_KEY, JSON.stringify(updatedStates));
  } catch (error) {
    console.error("Error saving game state to localStorage:", error);
  }
};

export const getGameStatesFromLocal = () => {
  try {
    const savedStates = localStorage.getItem(GAME_STATES_KEY);
    return savedStates ? JSON.parse(savedStates) : [];
  } catch (error) {
    console.error("Error parsing game states from localStorage:", error);
    localStorage.removeItem(GAME_STATES_KEY);
    return [];
  }
};

export const removeGameStateFromLocal = (gameStateId) => {
  try {
    const gameStates = getGameStatesFromLocal();
    const updatedStates = gameStates.filter(
      (state) => state.id !== gameStateId
    );
    localStorage.setItem(GAME_STATES_KEY, JSON.stringify(updatedStates));
  } catch (error) {
    console.error("Error removing game state from localStorage:", error);
  }
};

export const saveLifeHistoryToLocal = (lifeHistory) => {
  try {
    localStorage.setItem(LIFE_HISTORY_KEY, JSON.stringify(lifeHistory));
  } catch (error) {
    console.error("Error saving life history to localStorage:", error);
  }
};

export const getLifeHistoryFromLocal = () => {
  try {
    const savedHistory = localStorage.getItem(LIFE_HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch (error) {
    console.error("Error parsing life history from localStorage:", error);
    localStorage.removeItem(LIFE_HISTORY_KEY);
    return [];
  }
};

export const clearAllGameStates = () => {
  localStorage.removeItem(GAME_STATES_KEY);
};

// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import { generateBackstory } from "./services/geminiFlashService";
import {
  saveGameStateToLocal,
  getGameStatesFromLocal,
  removeGameStateFromLocal,
  saveLifeHistoryToLocal,
  getLifeHistoryFromLocal,
} from "./utils/localStorage";
import { v4 as uuidv4 } from "uuid";

const generateRandomStat = () => Math.floor(Math.random() * 101);

const App = () => {
  const [gameStates, setGameStates] = useState([]);
  const [currentGameState, setCurrentGameState] = useState(null);
  const [lifeHistory, setLifeHistory] = useState([]);

  useEffect(() => {
    const savedGameStates = getGameStatesFromLocal().filter(Boolean); // Filter out any null states
    const savedLifeHistory = getLifeHistoryFromLocal() || [];

    setGameStates(savedGameStates);
    setLifeHistory(savedLifeHistory);
  }, []);

  const startNewLife = async () => {
    try {
      const backstory = await generateBackstory();
      console.log("Backstory name ", backstory.name);
      const newGameState = {
        id: uuidv4(),
        name: backstory.name,
        age: 0,
        stats: {
          health: 100,
          intelligence: generateRandomStat(),
          charisma: generateRandomStat(),
          happiness: generateRandomStat(),
          appearance: generateRandomStat(),
          fitness: generateRandomStat(),
          creativity: generateRandomStat(),
        },
        netWorth: 0,
        relationships: [
          {
            name: backstory.mother,
            age: backstory.motherAge,
            gender: "female",
            relationship: "Mother",
            relationshipStatus: backstory.motherRelationship,
          },
          {
            name: backstory.father,
            age: backstory.fatherAge,
            gender: "male",
            relationship: "Father",
            relationshipStatus: backstory.fatherRelationship,
          },
        ],
        inventory: [],
        lifeEvents: [],
        history: [`${backstory.situation}`],
        backstory,
      };
      for (const sibling of backstory.siblings) {
        console.log("Sibling:", sibling);
        newGameState.relationships.push({
          name: sibling.name,
          age: sibling.age,
          relationship: "Sibling",
          relationshipStatus: sibling.relationship,
          gender: sibling.gender,
        });
      }
      setCurrentGameState(newGameState);
      setGameStates((prevStates) => [...prevStates, newGameState]);
      saveGameStateToLocal(newGameState);
      return newGameState;
    } catch (error) {
      console.error("Failed to start new life:", error);
      return null;
    }
  };

  const continueLife = (gameState) => {
    if (gameState) {
      setCurrentGameState(gameState);
    } else {
      console.error("Attempted to continue a null game state");
    }
  };

  const updateGameState = (newState) => {
    if (newState) {
      setCurrentGameState(newState);
      setGameStates((prevStates) =>
        prevStates.map((state) =>
          state && state.id === newState.id ? newState : state
        )
      );
      saveGameStateToLocal(newState);
    }
  };

  const endLife = () => {
    if (currentGameState) {
      const { backstory, age, lifeEvents } = currentGameState;
      const newLifeEntry = {
        name: backstory.name,
        birthplace: backstory.location,
        lifespan: `${age} years`,
        achievements: lifeEvents[lifeEvents.length - 1],
      };
      const updatedLifeHistory = [newLifeEntry, ...lifeHistory];
      setLifeHistory(updatedLifeHistory);
      saveLifeHistoryToLocal(updatedLifeHistory);

      setGameStates((prevStates) =>
        prevStates.filter((state) => state && state.id !== currentGameState.id)
      );
      removeGameStateFromLocal(currentGameState.id);
    }
    setCurrentGameState(null);
  };

  const saveToCloud = async () => {
    try {
      console.log("Saving to cloud:", currentGameState);
      alert("Game saved successfully! (simulated)");
    } catch (error) {
      console.error("Failed to save game to cloud:", error);
      alert("Failed to save game. Please try again.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              lifeHistory={lifeHistory}
              onStartNewLife={startNewLife}
              onContinueLife={continueLife}
              gameStates={gameStates.filter(Boolean)} // Ensure we only pass valid game states
            />
          }
        />
        <Route
          path="/play"
          element={
            currentGameState ? (
              <Game
                gameState={currentGameState}
                setGameState={updateGameState}
                endLife={endLife}
                saveToCloud={saveToCloud}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

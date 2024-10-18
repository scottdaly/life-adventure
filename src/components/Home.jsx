// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import Register from "./register";
import {
  getGameStates,
  saveNewGame,
  saveNewRelationships,
} from "../services/dbServices";
import { generateBackstory } from "../services/geminiFlashService";
import { useGameState } from "../context/gameStateContext";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [gameStates, setGameStates] = useState([]);
  const [currentGameState, setCurrentGameState] = useState(null);
  const [lifeHistory, setLifeHistory] = useState([]);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { setGameState, setRelationships } = useGameState();

  const generateRandomStat = () => Math.floor(Math.random() * 101);

  useEffect(() => {
    if (user && gameStates.length === 0) {
      fetchGames();
    }
  }, [user]);

  const fetchGames = async () => {
    try {
      const gameStates = await getGameStates(user.userId);

      if (gameStates) {
        setGameStates(gameStates);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const startNewLife = async () => {
    try {
      const backstory = await generateBackstory();
      const newGameState = {
        name: backstory.name,
        age: 0,
        location: backstory.location,
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
        newGameState.relationships.push({
          name: sibling.name,
          age: sibling.age,
          relationship: "Sibling",
          relationshipStatus: sibling.relationship,
          gender: sibling.gender,
        });
      }

      setGameStates((prevStates) => [...prevStates, newGameState]);
      const data = await saveNewGame(newGameState);
      setCurrentGameState(data.game);
      setGameState(data.game);

      const relationships = await saveNewRelationships(
        data.game.id,
        newGameState.relationships
      );

      setRelationships(relationships);
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

  const handleStartNewLife = async () => {
    setIsLoading(true);
    await startNewLife();
    navigate("/play");
  };

  const handleContinueLife = (gameState) => {
    if (gameState) {
      continueLife(gameState);
      navigate("/play");
    } else {
      console.error("Attempted to continue an invalid game state");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full mt-16 p-4">
      <h1 className="text-4xl font-bold mb-8">Life Simulation Game</h1>
      {authLoading ? (
        <LoadingSpinner message="Loading..." />
      ) : user ? (
        isLoading ? (
          <LoadingSpinner message="A baby is being born..." />
        ) : (
          <div className="flex flex-col w-full max-w-3xl items-center justify-center">
            <button
              onClick={handleStartNewLife}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
            >
              Start a New Life
            </button>

            {gameStates && gameStates.length > 0 && (
              <div className="w-full mb-8">
                <h2 className="text-xl  text-zinc-200 tracking-wide mb-4">
                  Previous Lives
                </h2>
                <ul className="flex flex-col-reverse bg-zinc-800 w-full rounded px-8 pt-6 pb-8 mb-4 max-h-[500px] overflow-y-auto">
                  {gameStates.map(
                    (state) =>
                      state && (
                        <li
                          key={state.id}
                          className="mb-4 pb-4 border-b last:border-b-0"
                        >
                          <p>
                            <strong>Name:</strong> {state.name || "Unknown"}
                          </p>
                          <p>
                            <strong>Age:</strong> {state.age}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {state.location || "Unknown"}
                          </p>
                          <button
                            onClick={() => handleContinueLife(state)}
                            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Continue This Life
                          </button>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}

            {lifeHistory && lifeHistory.length > 0 && (
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Your Life History
                </h2>
                <ul className="b rounded px-8 pt-6 pb-8 mb-4 max-h-96 overflow-y-auto">
                  {lifeHistory.map(
                    (life, index) =>
                      life && (
                        <li
                          key={index}
                          className="mb-4 pb-4 border-b last:border-b-0"
                        >
                          <p>
                            <strong>Name:</strong> {life.name || "Unknown"}
                          </p>
                          <p>
                            <strong>Birthplace:</strong>{" "}
                            {life.birthplace || "Unknown"}
                          </p>
                          <p>
                            <strong>Lifespan:</strong>{" "}
                            {life.lifespan || "Unknown"}
                          </p>
                          <p>
                            <strong>Notable Achievements:</strong>{" "}
                            {life.achievements || "None"}
                          </p>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-xl">Log in to continue</p>
          <div className="flex flex-row gap-2 text-zinc-400">
            {showLogin ? (
              <p>Don't have an account?</p>
            ) : (
              <p>Already have an account?</p>
            )}
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="text-blue-500 hover:text-blue-700"
            >
              {showLogin ? "Register" : "Login"}
            </button>
          </div>
          {showLogin ? <Login /> : <Register />}
        </div>
      )}
    </div>
  );
};

export default Home;

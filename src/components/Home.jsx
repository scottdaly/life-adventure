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
  removeGameState,
} from "../services/dbServices";
import { generateBackstory } from "../services/geminiFlashService";
import { useGameState } from "../context/gameStateContext";
import { Trash } from "lucide-react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, characterName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete {characterName}'s life? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [gameStates, setGameStates] = useState([]);
  const [currentGameState, setCurrentGameState] = useState(null);
  const [lifeHistory, setLifeHistory] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, gameId: null, characterName: "" });
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { setGameState, setRelationships } = useGameState();

  const generateRandomStat = () => Math.floor(Math.random() * 101);

  useEffect(() => {
    if (user && gameStates.length === 0) {
      fetchGames();
    }
  }, [user]);

  const handleDeleteLife = async (gameId) => {
    try {
      await removeGameState(gameId);
      setGameStates((prevStates) => prevStates.filter(state => state.id !== gameId));
      setDeleteModal({ isOpen: false, gameId: null, characterName: "" });
    } catch (error) {
      console.error("Error deleting life:", error);
    }
  };

  const openDeleteModal = (gameId, characterName) => {
    setDeleteModal({ isOpen: true, gameId, characterName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, gameId: null, characterName: "" });
  };

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
    // Generates a backstory, creates a new game state (character with random stats), and saves it to the database
    try {
      // Calls the geminiFlashService.js file to generate a backstory using the Google Gemini API
      const backstory = await generateBackstory();

      // Creates a new game state (character with random stats)
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

      // Adds the new characters siblings to the new game state (if any)
      for (const sibling of backstory.siblings) {
        newGameState.relationships.push({
          name: sibling.name,
          age: sibling.age,
          relationship: "Sibling",
          relationshipStatus: sibling.relationship,
          gender: sibling.gender,
        });
      }

      // Logs the new game state to the console for debugging purposes
      console.log("newGameState", newGameState);

      // Adds the new game (gameState) to the user's existing games locally
      setGameStates((prevStates) => [...prevStates, newGameState]);

      // Calls DBServices.js to save the new game to the database
      const data = await saveNewGame(newGameState);

      // Sets the current game state to the new game
      setCurrentGameState(data.game);

      // Sets the game state to the new game
      setGameState(data.game);

      // Calls the DBServices.js file to save the new character's relationships to the database
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
                <h2 className="text-xl text-zinc-200 tracking-wide mb-4">
                  Previous Lives
                </h2>
                <ul className="flex flex-col-reverse bg-zinc-800 w-full rounded px-8 pt-6 pb-8 mb-4 max-h-[500px] overflow-y-auto">
                  {gameStates.map(
                    (state) =>
                      state && (
                        <li
                          key={state.id}
                          className="mb-4 pb-4 border-b flex flex-row justify-between"
                        >
                          <div>
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
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleContinueLife(state)}
                              className="bg-green-700 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                            >
                              Continue This Life
                            </button>
                            
                          </div>
                          </div>
                          <div className="flex flex-row items-center justify-center">
                          <button
                              onClick={() => openDeleteModal(state.id, state.name)}
                              className="hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                            </div>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}

            <DeleteConfirmationModal
              isOpen={deleteModal.isOpen}
              onClose={closeDeleteModal}
              onConfirm={() => handleDeleteLife(deleteModal.gameId)}
              characterName={deleteModal.characterName}
            />

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

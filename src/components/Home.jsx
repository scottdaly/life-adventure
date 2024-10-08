// src/components/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const Home = ({ lifeHistory, onStartNewLife, onContinueLife, gameStates }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartNewLife = async () => {
    setIsLoading(true);
    await onStartNewLife();
    navigate("/play");
  };

  const handleContinueLife = (gameState) => {
    if (gameState) {
      onContinueLife(gameState);
      navigate("/play");
    } else {
      console.error("Attempted to continue an invalid game state");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Life Simulation Game</h1>
      {isLoading ? (
        <LoadingSpinner message="A baby is being born..." />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleStartNewLife}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
          >
            Start a New Life
          </button>

          {gameStates && gameStates.length > 0 && (
            <div className="w-full max-w-md mb-8">
              <h2 className="text-2xl font-semibold mb-4">Unfinished Lives</h2>
              <ul className="bg-zinc-800 rounded px-8 pt-6 pb-8 mb-4 max-h-96 overflow-y-auto">
                {gameStates.map(
                  (state) =>
                    state && (
                      <li
                        key={state.id}
                        className="mb-4 pb-4 border-b last:border-b-0"
                      >
                        <p>
                          <strong>Name:</strong>{" "}
                          {state.backstory?.name || "Unknown"}
                        </p>
                        <p>
                          <strong>Age:</strong> {state.age}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          {state.backstory?.location || "Unknown"}
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
              <h2 className="text-2xl font-semibold mb-4">Your Life History</h2>
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
      )}
    </div>
  );
};

export default Home;

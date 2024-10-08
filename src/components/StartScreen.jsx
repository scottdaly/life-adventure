// src/components/StartScreen.jsx
import React from "react";

const StartScreen = ({ onStartNewLife, lifeHistory }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Life Simulation Game</h1>
      <button
        onClick={onStartNewLife}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Start a New Life
      </button>
      {lifeHistory.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Your Life History</h2>
          <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-96 overflow-y-auto">
            {lifeHistory.map((life, index) => (
              <li key={index} className="mb-4 pb-4 border-b last:border-b-0">
                <p>
                  <strong>Name:</strong> {life.name}
                </p>
                <p>
                  <strong>Birthplace:</strong> {life.birthplace}
                </p>
                <p>
                  <strong>Lifespan:</strong> {life.lifespan}
                </p>
                <p>
                  <strong>Notable Achievements:</strong> {life.achievements}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StartScreen;

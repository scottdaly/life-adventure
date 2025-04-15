// src/components/GameState.jsx
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import {
  getHealthIcon,
  getRelationshipStatus,
  getPhysicalAttractiveness,
  getHappiness,
  getHealth,
  getIntelligence,
  getCharisma,
  getFitness,
  getCreativity,
} from "../utils/statUtilities";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const GameState = ({ gameState, relationships, handleEndLife }) => {
  const [showStats, setShowStats] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showBackstory, setShowBackstory] = useState(false);


  const getNetWorth = (netWorth) => {
    let netWorthString = netWorth.toLocaleString();
    if (netWorth > 1000000000) {
      netWorthString =
        (netWorth / 1000000000).toFixed(1).toLocaleString() + "B";
    } else if (netWorth > 1000000) {
      netWorthString = (netWorth / 1000000).toFixed(1).toLocaleString() + "M";
    } else if (netWorth > 1000) {
      netWorthString = (netWorth / 1000).toFixed(1).toLocaleString() + "k";
    }

    return netWorthString;
  };

  const getHappinessEmoji = (happiness) => {
    if (happiness > 80) {
      return "😁";
    } else if (happiness > 60) {
      return "😊";
    } else if (happiness > 40) {
      return "🙂";
    } else if (happiness > 20) {
      return "🫤";
    }
    return "😞";
  };

  return (
    <div className="border border-zinc-300 dark:border-zinc-700 p-4 rounded-lg mb-4">
      <div className="flex flex-col">
        <div className="w-full">
          <p className="text-lg ibm-plex-mono-medium">
            {gameState.name || "Unknown"}
          </p>

          <p className="flex flex-col mt-4">
            <strong className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Location</strong>{" "}
            <span className="ibm-plex-mono-regular tracking-tight">
              {gameState.location || "Unknown"}
            </span>
          </p>
          <div className="flex w-full gap-2 mt-8">
            <div className="flex flex-1 flex-col border border-zinc-300 dark:border-zinc-700 transition-colors duration-500 rounded-lg p-2 items-center justify-center text-center">
              <p className="ibm-plex-mono-medium text-xl">
                ${getNetWorth(gameState.net_worth)}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Net Worth</p>
            </div>
            <div className="flex flex-1 flex-col border border-zinc-300 dark:border-zinc-700 transition-colors duration-500 rounded-lg p-2 items-center text-center">
              <p className="text-2xl">
                {getHappinessEmoji(gameState.stats.happiness)}
              </p>
              {getHappiness(gameState.stats.happiness)}
            </div>
          </div>
          <div className="flex flex-1 mt-2 items-center border border-zinc-300 dark:border-zinc-700 transition-colors duration-500 rounded-lg py-2 px-4">
            {getHealthIcon(gameState.stats.health)}
            <div className="flex flex-col">
              <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Health</p>
              {getHealth(gameState.stats.health)}
            </div>
          </div>
          <div className="w-full h-[1px] bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 mt-8"></div>
          <div
            className="flex justify-between mt-6 cursor-pointer"
            onClick={() => setShowStats(!showStats)}
          >
            <p className="text-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-500">Stats</p>
            <div className="flex items-center text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
              {showStats ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>

          {showStats ? (
            <div>
              <div className="flex flex-col mt-6 mb-12">
                <div className="flex flex-col gap-1 items-start justify-start">
                  <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Appearance</p>
                  <div className="text-start">
                    {getPhysicalAttractiveness(gameState.stats.appearance)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm"
                    style={{ width: `${gameState.stats.intelligence}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                    Intelligence
                  </p>
                  {getIntelligence(gameState.stats.intelligence)}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm"
                    style={{ width: `${gameState.stats.charisma}%` }}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Charisma</p>
                  {getCharisma(gameState.stats.charisma)}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-8">
                <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm"
                    style={{ width: `${gameState.stats.fitness}%` }}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Fitness</p>
                  {getFitness(gameState.stats.fitness)}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm"
                    style={{ width: `${gameState.stats.creativity}%` }}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Creativity</p>
                  {getCreativity(gameState.stats.creativity)}
                </div>
              </div>
            </div>
          ) : null}
          <div className="w-full h-[1px] bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 my-6"></div>
          <div
            className="flex justify-between cursor-pointer mb-6"
            onClick={() => setShowRelationships(!showRelationships)}
          >
            <p className="text-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-500">Relationships</p>
            <div className="flex items-center text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
              {showRelationships ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>
          {showRelationships ? (
            <div>
              <div className="flex flex-col gap-2">
                {relationships &&
                  relationships.map((relationship, index) => (
                    <div key={index} className="flex flex-col mb-4">
                      <div className="flex justify-between">
                        <p className="ibm-plex-mono-bold">
                          {relationship.name}
                        </p>
                        <p className="text-sm ibm-plex-mono-regular">
                          {relationship.gender
                            ? capitalizeFirstLetter(relationship.gender)
                            : ""}
                        </p>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-500 ibm-plex-mono-regular flex justify-between my-1">
                        Age
                        <span className="text-sm text-zinc-100">
                          {relationship.age}
                        </span>
                      </p>
                      <div className="flex flex-col">
                        <div className="flex justify-between my-1">
                          <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                            Relationship
                          </p>
                          <p className="ibm-plex-mono-regular ml-2 text-sm">
                            {relationship.relationship}
                          </p>
                        </div>

                        <div className="flex text-zinc-200 justify-between my-1">
                          <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                            Relationship Status
                          </p>
                          <div className="flex text-end">
                            {getRelationshipStatus(
                              relationship.relationship_status
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
          <div className="w-full h-[1px] bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 mb-6 mt-4"></div>
        </div>

        <div
          className="flex justify-between cursor-pointer mb-6"
          onClick={() => setShowBackstory(!showBackstory)}
        >
          <p className="text-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-500">Backstory</p>
          <div className="flex items-center text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
            {showBackstory ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
        {showBackstory ? (
          <div className="flex flex-col gap-2">
            <p>{gameState.history[0] || "Unknown"}</p>

            <h3 className="font-semibold mt-4">Life Events:</h3>
            <ul className="max-h-40 overflow-y-auto mb-6">
              {gameState.life_events.map((event, index) => (
                <li key={index} className="text-sm">
                  {event}
                </li>
              ))}
            </ul>
            <ul>
              {gameState.history.map((item, index) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="w-full h-[1px] bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 mb-4"></div>
      <div className="flex gap-2 mt-8">
        <button
          onClick={handleEndLife}
          className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors duration-500 ibm-plex-mono-semibold text-sm flex-1 px-2 h-14 rounded"
        >
          End This Life
        </button>
      </div>
    </div>
  );
};

export default GameState;

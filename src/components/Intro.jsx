import { ArrowRightIcon } from "lucide-react";
import {
  getPhysicalAttractiveness,
  getIntelligence,
  getCharisma,
  getFitness,
  getCreativity,
} from "../utils/statUtilities";
import React from "react";

const Intro = ({ gameState, introContinue }) => {
  return (
    <div className="flex flex-col">
      <div className="max-w-2xl mx-auto flex flex-col gap-1">
        <div className="flex flex-col">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">You are</p>
          <p>
            <span className="ibm-plex-mono-medium text-2xl">
              {gameState.name || "Unknown"}
            </span>
          </p>
        </div>
        <div className="flex flex-col mt-4 mb-4">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-lg text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Born in</p>
              <p className="ibm-plex-mono-regular text-xl">
                {gameState.location || "Unknown"}
              </p>
            </div>
            <div className="flex flex-col lg:text-right mb-4">
              <div className="flex flex-col gap-1 items-start justify-start lg:justify-end lg:items-end">
                <p className=" text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Appearance</p>
                <div className="text-lg">
                  {getPhysicalAttractiveness(gameState.stats.appearance)}
                </div>
              </div>
            </div>
          </div>
          <p className="ibm-plex-mono-regular mt-3 mb-4 text-zinc-600 dark:text-zinc-400 transition-colors duration-500">
            {gameState.history[0] || "Unknown"}
          </p>
          <div className="flex flex-col gap-2 mt-8">
            <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden transition-colors duration-500">
              <div
                className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm transition-colors duration-500"
                style={{ width: `${gameState.stats.intelligence}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Intelligence</p>
              {getIntelligence(gameState.stats.intelligence)}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden transition-colors duration-500">
              <div
                className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm transition-colors duration-500"
                style={{ width: `${gameState.stats.charisma}%` }}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Charisma</p>
              {getCharisma(gameState.stats.charisma)}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden transition-colors duration-500">
              <div
                className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm transition-colors duration-500"
                style={{ width: `${gameState.stats.fitness}%` }}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Fitness</p>
              {getFitness(gameState.stats.fitness)}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden transition-colors duration-500">
              <div
                className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-sm transition-colors duration-500"
                style={{ width: `${gameState.stats.creativity}%` }}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Creativity</p>
              {getCreativity(gameState.stats.creativity)}
            </div>
          </div>
        </div>

        {/*<p>Gender: {gameState.gender}</p> */}

        <button
          className="bg-zinc-700 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:text-white dark:hover:text-black px-4 py-2 rounded-lg ibm-plex-mono-medium tracking-tight mt-8 flex items-center justify-center gap-2 transition-colors duration-500"
          onClick={introContinue}
        >
          Begin Life <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Intro;

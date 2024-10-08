import { ArrowRightIcon } from "lucide-react";
import React from "react";

const Intro = ({ gameState, introContinue }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-lg mx-auto flex flex-col gap-1">
        <p>
          <span className="ibm-plex-mono-medium text-2xl">
            {gameState.backstory?.name || "Unknown"}
          </span>
        </p>
        <p className="ibm-plex-mono-regular text-zinc-400 text-lg">
          {gameState.backstory?.location || "Unknown"}
        </p>
        {/*<p>Gender: {gameState.gender}</p> */}
        <p className="ibm-plex-mono-regular mt-3">
          {gameState.backstory?.situation || "Unknown"}
        </p>
        <button
          className="bg-zinc-100 text-zinc-900 hover:bg-white hover:text-black px-4 py-2 rounded-lg ibm-plex-mono-medium tracking-tight mt-8 flex items-center justify-center gap-2"
          onClick={introContinue}
        >
          Begin Life <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Intro;

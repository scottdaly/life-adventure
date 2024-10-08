// src/components/GameState.jsx
import {
  MehIcon,
  SmileIcon,
  FrownIcon,
  AnnoyedIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import React, { useState } from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getNetWorth = (netWorth) => {
  let netWorthString = netWorth.toLocaleString();
  if (netWorth > 1000000000) {
    netWorthString = (netWorth / 1000000000).toFixed(1).toLocaleString() + "B";
  } else if (netWorth > 1000000) {
    netWorthString = (netWorth / 1000000).toFixed(1).toLocaleString() + "M";
  } else if (netWorth > 1000) {
    netWorthString = (netWorth / 1000).toFixed(1).toLocaleString() + "k";
  }

  return netWorthString;
};

const getHappiness = (happiness) => {
  if (happiness > 80) {
    return <p className="text-sm ibm-plex-mono-regular">Very Happy</p>;
  } else if (happiness > 60) {
    return <p className="text-sm ibm-plex-mono-regular">Happy</p>;
  } else if (happiness > 40) {
    return <p className="text-sm ibm-plex-mono-regular">Fine</p>;
  } else if (happiness > 20) {
    return <p className="text-sm ibm-plex-mono-regular">Unhappy</p>;
  }
  return <p className="text-sm ibm-plex-mono-regular">Very Unhappy</p>;
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

const getHealth = (health) => {
  if (health > 80) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Healthy</p>;
  } else if (health > 50) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Feeling Okay</p>
    );
  } else if (health > 20) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">
        Not Doing Well
      </p>
    );
  }
  return (
    <p className="text-sm ibm-plex-mono-regular text-center">
      In Critical Condition
    </p>
  );
};

const getHealthIcon = (health) => {
  if (health > 80) {
    return (
      <div className="flex items-center">
        <SmileIcon className="w-8 h-8 mr-3" />
      </div>
    );
  } else if (health > 50) {
    return (
      <div className="flex items-center">
        <MehIcon className="w-8 h-8 mr-3" />
      </div>
    );
  } else if (health > 20) {
    return (
      <div className="flex items-center">
        <AnnoyedIcon className="w-8 h-8 mr-3" />
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <FrownIcon className="w-8 h-8 mr-3" />
    </div>
  );
};

const getIntelligence = (intelligence) => {
  if (intelligence > 95) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Genius</p>;
  } else if (intelligence > 80) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Gifted</p>;
  } else if (intelligence > 60) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Above Average</p>
    );
  } else if (intelligence > 40) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Average</p>;
  } else if (intelligence > 20) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Kinda Dumb</p>
    );
  }
  return <p className="text-sm ibm-plex-mono-regular text-center">Idiot</p>;
};

const getCharisma = (charisma) => {
  if (charisma > 95) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Cult Leader</p>
    );
  } else if (charisma > 80) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Very Likeable</p>
    );
  } else if (charisma > 60) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Likeable</p>
    );
  } else if (charisma > 40) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Average</p>;
  } else if (charisma > 20) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">
        Somewhat Offputting
      </p>
    );
  }
  return (
    <p className="text-sm ibm-plex-mono-regular text-center">Super Weird</p>
  );
};

const getFitness = (fitness) => {
  if (fitness > 95) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Greek God</p>
    );
  } else if (fitness > 80) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Elite Athlete</p>
    );
  } else if (fitness > 60) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Strong</p>;
  } else if (fitness > 40) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Decent</p>;
  } else if (fitness > 20) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Kinda Scrawny</p>
    );
  }
  return <p className="text-sm ibm-plex-mono-regular text-center">Weakling</p>;
};

const getCreativity = (creativity) => {
  if (creativity > 95) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Da Vinci</p>
    );
  } else if (creativity > 80) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Idea Machine</p>
    );
  } else if (creativity > 60) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Talented</p>
    );
  } else if (creativity > 40) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Average</p>;
  } else if (creativity > 20) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Less Artistic</p>
    );
  }
  return (
    <p className="text-sm ibm-plex-mono-regular text-center">Uninspired</p>
  );
};

const getPhysicalAttractiveness = (physicalAttractiveness) => {
  if (physicalAttractiveness > 95) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Model</p>;
  } else if (physicalAttractiveness > 80) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">Pretty Hot</p>
    );
  } else if (physicalAttractiveness > 60) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">
        Decently Attractive
      </p>
    );
  } else if (physicalAttractiveness > 40) {
    return <p className="text-sm ibm-plex-mono-regular text-center">Average</p>;
  } else if (physicalAttractiveness > 20) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center">
        Not Very Attractive
      </p>
    );
  }
  return (
    <p className="text-sm ibm-plex-mono-regular text-center">Plain Ugly</p>
  );
};

const getRelationshipStatus = (relationshipStatus) => {
  if (relationshipStatus >= 10) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center ml-2">
        Pure Love
      </p>
    );
  } else if (relationshipStatus >= 8) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center ml-2">
        Very Good
      </p>
    );
  } else if (relationshipStatus >= 5) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center ml-2">Good</p>
    );
  } else if (relationshipStatus >= 3) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center ml-2">Lukewarm</p>
    );
  } else if (relationshipStatus >= 1) {
    return (
      <p className="text-sm ibm-plex-mono-regular text-center ml-2">Bad</p>
    );
  }
  return (
    <p className="text-sm ibm-plex-mono-regular text-center ml-2">
      Total Hatred
    </p>
  );
};

const GameState = ({ gameState, handleEndLife, handleSaveToCloud }) => {
  const [showStats, setShowStats] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showBackstory, setShowBackstory] = useState(false);

  return (
    <div className="border border-zinc-700 p-4 rounded-lg mb-4">
      <div className="flex flex-col">
        <div className="w-full">
          <p className="text-lg ibm-plex-mono-medium">
            {gameState.backstory?.name || "Unknown"}
          </p>

          <p className="flex flex-col mt-4">
            <strong className="text-sm text-zinc-400">Location</strong>{" "}
            <span className="ibm-plex-mono-regular tracking-tight">
              {gameState.backstory?.location || "Unknown"}
            </span>
          </p>
          <div className="flex w-full gap-2 mt-8">
            <div className="flex flex-1 flex-col border border-zinc-700 rounded-lg p-2 items-center">
              <p className="ibm-plex-mono-medium text-xl">
                ${getNetWorth(gameState.netWorth)}
              </p>
              <p className="text-sm text-zinc-400">Net Worth</p>
            </div>
            <div className="flex flex-1 flex-col border border-zinc-700 rounded-lg p-2 items-center">
              <p className="text-2xl">
                {getHappinessEmoji(gameState.stats.happiness)}
              </p>
              {getHappiness(gameState.stats.happiness)}
            </div>
          </div>
          <div className="flex flex-1 mt-2 items-center border border-zinc-700 rounded-lg py-2 px-4">
            {getHealthIcon(gameState.stats.health)}
            <div className="flex flex-col">
              <p className="text-sm text-bold text-zinc-400">Health</p>
              {getHealth(gameState.stats.health)}
            </div>
          </div>
          <div className="w-full h-[1px] bg-zinc-700 mt-8"></div>
          <div
            className="flex justify-between mt-6 cursor-pointer"
            onClick={() => setShowStats(!showStats)}
          >
            <p className="text-bold text-zinc-400">Stats</p>
            <div className="flex items-center text-zinc-400">
              {showStats ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>

          {showStats ? (
            <div>
              <div className="flex flex-col mt-6 mb-12">
                <div className="flex flex-col gap-1 items-start justify-start">
                  <p className="text-sm text-bold text-zinc-400">Appearance</p>
                  <div className="text-start">
                    {getPhysicalAttractiveness(gameState.stats.appearance)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400  h-2 rounded-sm"
                    style={{ width: `${gameState.stats.intelligence}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-bold text-zinc-400">
                    Intelligence
                  </p>
                  {getIntelligence(gameState.stats.intelligence)}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400  h-2 rounded-sm"
                    style={{ width: `${gameState.stats.charisma}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-bold text-zinc-400">Charisma</p>
                  {getCharisma(gameState.stats.charisma)}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-8">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400  h-2 rounded-sm"
                    style={{ width: `${gameState.stats.fitness}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-bold text-zinc-400">Fitness</p>
                  {getFitness(gameState.stats.fitness)}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400  h-2 rounded-sm"
                    style={{ width: `${gameState.stats.creativity}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-bold text-zinc-400">Creativity</p>
                  {getCreativity(gameState.stats.creativity)}
                </div>
              </div>
            </div>
          ) : null}
          <div className="w-full h-[1px] bg-zinc-700 my-6"></div>
          <div
            className="flex justify-between cursor-pointer mb-6"
            onClick={() => setShowRelationships(!showRelationships)}
          >
            <p className="text-bold text-zinc-400">Relationships</p>
            <div className="flex items-center text-zinc-400">
              {showRelationships ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>
          {showRelationships ? (
            <div>
              <div className="flex flex-col gap-2">
                {gameState.relationships.map((relationship, index) => (
                  <div key={index} className="flex flex-col mb-4">
                    <div className="flex justify-between">
                      <p className="ibm-plex-mono-bold">{relationship.name}</p>
                      <p className="text-sm ibm-plex-mono-regular">
                        {relationship.gender
                          ? capitalizeFirstLetter(relationship.gender)
                          : ""}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-400 ibm-plex-mono-regular flex justify-between">
                      Age
                      <span className="text-sm text-zinc-100">
                        {relationship.age}
                      </span>
                    </p>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p className="text-sm text-bold text-zinc-400">
                          Relationship
                        </p>
                        <p className="ibm-plex-mono-regular ml-2 text-sm">
                          {relationship.relationship}
                        </p>
                      </div>

                      <div className="flex text-zinc-200 justify-between">
                        <p className="text-sm text-bold text-zinc-400">
                          Relationship Status
                        </p>

                        {getRelationshipStatus(relationship.relationshipStatus)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="w-full h-[1px] bg-zinc-700 mb-6 mt-4"></div>
        </div>

        <div
          className="flex justify-between cursor-pointer mb-6"
          onClick={() => setShowBackstory(!showBackstory)}
        >
          <p className="text-bold text-zinc-400">Backstory</p>
          <div className="flex items-center text-zinc-400">
            {showBackstory ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
        {showBackstory ? (
          <div className="flex flex-col gap-2">
            <p>{gameState.backstory?.situation || "Unknown"}</p>

            <h3 className="font-semibold mt-4">Life Events:</h3>
            <ul className="max-h-40 overflow-y-auto mb-6">
              {gameState.lifeEvents.map((event, index) => (
                <li key={index} className="text-sm">
                  {event}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="w-full h-[1px] bg-zinc-700 mb-4"></div>
      <div className="flex gap-2 mt-8">
        <button
          onClick={handleSaveToCloud}
          className="border border-zinc-700 hover:bg-zinc-800 text-white text-sm font-bold h-14 flex-1 px-2 rounded"
        >
          Save to Cloud
        </button>
        <button
          onClick={handleEndLife}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white ibm-plex-mono-semibold text-sm flex-1 px-2 h-14 rounded"
        >
          End This Life
        </button>
      </div>
    </div>
  );
};

export default GameState;

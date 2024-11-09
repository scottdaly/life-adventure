// src/components/Game.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameState from "./GameState";
import ChoiceSelection from "./ChoiceSelection";
import OutcomeDisplay from "./OutcomeDisplay";
import LoadingSpinner from "./LoadingSpinner";
import {
  evaluateChoice,
  generateScenario,
} from "../services/geminiFlashService";
import Intro from "./Intro";
import { useGameState } from "../context/gameStateContext";
import {
  saveGame,
  saveNewRelationships,
  updateRelationship,
} from "../services/dbServices";
import { useAuth } from "../components/AuthContext";

const Game = () => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [choiceOutcome, setChoiceOutcome] = useState(null);
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [decisionsMadeThisYear, setDecisionsMadeThisYear] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [isIntro, setIsIntro] = useState(true);
  const [ageFactor, setAgeFactor] = useState(3);
  const [outcomeDisplaying, setOutcomeDisplaying] = useState(false);
  const [intelligenceChange, setIntelligenceChange] = useState(0);
  const [charismaChange, setCharismaChange] = useState(0);
  const [fitnessChange, setFitnessChange] = useState(0);
  const [creativityChange, setCreativityChange] = useState(0);
  const [healthChange, setHealthChange] = useState(0);
  const [happinessChange, setHappinessChange] = useState(0);
  const [changeToShow, setChangeToShow] = useState(null);
  const [isEnded, setIsEnded] = useState(false);
  const navigate = useNavigate();
  const { gameState, setGameState, relationships, setRelationships } =
    useGameState();
  const { user, loading: authLoading } = useAuth();

  const getDecisionsForAge = (age) => {
    if (age < 13) return 1;
    return 3; // 3 decisions for teenage years and beyond
  };

  const getNextAge = (currentAge) => {
    if (currentAge <= 10) {
      setAgeFactor(3);
    } else {
      setAgeFactor(1);
    }
    const nextAge = currentAge + ageFactor;
    return nextAge;
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/");
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (!gameState) {
      navigate("/");
    }
  }, []);

  const generateNewScenario = async (newGameState) => {
    if (!newGameState) return;
    setIsLoading(true);
    if (selectedChoiceIndex !== null) {
      setSelectedChoiceIndex(null);
    }
    console.log("Generating new scenario", newGameState);
    const scenarioData = await generateScenario(newGameState, relationships);
    if (scenarioData) {
      setCurrentScenario(scenarioData.scenario);
      setChoices(scenarioData.choices);
    }
    setIsLoading(false);
  };

  const sendToEvaluateChoice = async (
    choice,
    scenario,
    gameState,
    relationships
  ) => {
    console.log("Sending to evaluate choice for age", gameState.age);
    const evaluation = await evaluateChoice(
      choice,
      scenario,
      gameState,
      relationships
    );
    let changes = "";
    setChoiceOutcome(evaluation.outcome);
    setOutcomeDisplaying(true);
    changes += evaluation.summary ? `Summary: ${evaluation.summary}\n` : "";
    changes += evaluation.outcome ? `Outcome: ${evaluation.outcome}\n` : "";
    changes += evaluation.notableLifeEvent
      ? `Notable Life Event: ${evaluation.notableLifeEvent}\n`
      : "";
    changes += evaluation.newRelationshipsArray
      ? `New Relationships: ${evaluation.newRelationshipsArray
          .map((relationship) => relationship.name)
          .join(", ")}\n`
      : "";
    changes += evaluation.removedRelationshipsArray
      ? `Removed Relationships: ${evaluation.removedRelationshipsArray
          .map((relationship) => relationship.name)
          .join(", ")}\n`
      : "";
    if (evaluation.summary) {
      setGameState((prevState) => ({
        ...prevState,
        history: [
          ...prevState.history,
          `\nAge ${prevState.age}: ${evaluation.summary}`,
        ],
      }));
    }
    if (evaluation.notableLifeEvent.toLowerCase() === "true") {
      setGameState((prevState) => ({
        ...prevState,
        life_events: [...prevState.life_events, evaluation.lifeEventSummary],
      }));
    }
    if (evaluation.newRelationshipsArray) {
      saveNewRelationships(gameState.id, evaluation.newRelationshipsArray);
    }
    if (evaluation.removedRelationshipsArray) {
      setGameState((prevState) => ({
        ...prevState,
        relationships: prevState.relationships.filter(
          (relationship) =>
            !evaluation.removedRelationshipsArray.some(
              (removedRelationship) =>
                removedRelationship.name === relationship.name
            )
        ),
      }));
    }
    const newHistory = [...gameState.history];
    if (evaluation.summary) {
      newHistory.push(evaluation.summary);
    }
    const newLifeEvents = [...gameState.life_events];
    if (evaluation.lifeEventSummary) {
      newLifeEvents.push(evaluation.lifeEventSummary);
    }

    return { newHistory, newLifeEvents };
  };

  const handleContinue = async () => {
    console.log("Handling continue for age ", gameState.age);
    if (!gameState) return;
    setIsLoading(true);
    let netWorthChange = 0;

    const { newHistory, newLifeEvents } = await sendToEvaluateChoice(
      choices[selectedChoiceIndex],
      currentScenario,
      gameState,
      relationships
    );
    const newRelationships = [];

    console.log("Evalutated choice, age is", gameState.age);
    relationships.map(async (relationship, index) => {
      const olderRelationship = {
        ...relationship,
        age: relationship.age + ageFactor,
      };
      const updatedRelationship = await updateRelationship(
        gameState.id,
        olderRelationship
      );
      newRelationships[index] = updatedRelationship;
    });

    setRelationships(newRelationships);

    let newAge = getNextAge(gameState.age);
    console.log("New age is", newAge);

    const newGameState = {
      ...gameState,
      age: newAge,
      stats: Object.keys(gameState.stats).reduce((newStats, stat) => {
        if (stat === "appearance") {
        } else {
          let statChange = 0;
          const statEffect = stat + "Effect";

          if (choices[selectedChoiceIndex][statEffect] === 1) {
            statChange = -10;
          } else if (choices[selectedChoiceIndex][statEffect] === 2) {
            statChange = -5;
          } else if (choices[selectedChoiceIndex][statEffect] === 4) {
            statChange = 5;
          } else if (choices[selectedChoiceIndex][statEffect] === 5) {
            statChange = 10;
          }

          console.log("Stat change is", statChange, "for stat", stat);
          if (stat === "fitness") {
            setFitnessChange(statChange);
          } else if (stat === "creativity") {
            setCreativityChange(statChange);
          } else if (stat === "health") {
            setHealthChange(statChange);
          } else if (stat === "happiness") {
            setHappinessChange(statChange);
          } else if (stat === "intelligence") {
            setIntelligenceChange(statChange);
          } else if (stat === "charisma") {
            setCharismaChange(statChange);
          }
          let newStat = gameState.stats[stat] + statChange;
          if (newStat < 0) {
            newStat = 0;
          } else if (newStat > 100) {
            newStat = 100;
          }
          newStats[stat] = newStat;
        }
        return newStats;
      }, {}),
      net_worth: gameState.net_worth + netWorthChange,
      history: newHistory,
      life_events: newLifeEvents,
    };

    const updatedGame = await saveGame(
      gameState.id,
      newGameState.age,
      newGameState.location,
      newGameState.net_worth,
      newGameState.name,
      newGameState.stats,
      newGameState.life_events,
      newGameState.history,
      newGameState.inventory,
      ageFactor
    );

    if (updatedGame) {
      await setGameState(updatedGame);
    }

    setDecisionsMadeThisYear((prev) => prev + 1);

    const decisionsThisYear = getDecisionsForAge(newAge);
    if (decisionsMadeThisYear + 1 >= decisionsThisYear) {
      await progressYear(newGameState);
    } else {
      await generateNewScenario(newGameState);
    }
  };

  const progressYear = async (newGameState) => {
    if (!gameState || !newGameState) return;
    console.log("Progressing year for age", newGameState.age);
    setSelectedChoiceIndex(null);
    setDecisionsMadeThisYear(0);

    await generateNewScenario(newGameState);
  };

  const endLife = () => {
    setIsEnded(true);
  };

  const handleEndLife = () => {
    endLife();
    navigate("/");
  };

  const handleIntroContinue = () => {
    generateNewScenario(gameState);
    setIsIntro(false);
  };

  const handleOutcomeContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOutcomeDisplaying(false);
    }, 1000);
  };

  if (!gameState) {
    return <LoadingSpinner message="Initializing game..." />;
  }

  const decisionsThisYear = getDecisionsForAge(gameState.age);

  return (
    <div className="flex flex-col w-full mx-auto max-w-[1200px] px-8 py-4">
      <div className="pb-4 flex justify-between">
        <Link to="/">
          <h1 className="text-3xl w-48 font-bold mb-4">Life Simulation Game</h1>
        </Link>
        <Link to="/account">
          <div className="flex items-center gap-3">
            <p className="text-zinc-300">Account</p>
            <div className="w-10 h-10 rounded-full bg-[url('https://images.unsplash.com/photo-1698159929253-98fc08508886?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover"></div>
          </div>
        </Link>
      </div>

      {isIntro ? (
        <Intro gameState={gameState} introContinue={handleIntroContinue} />
      ) : (
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/3">
            <GameState
              gameState={gameState}
              relationships={relationships}
              handleEndLife={handleEndLife}
            />
          </div>
          <div className="flex flex-col w-full pl-0 pb-8 md:pl-8 md:pb-0">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <LoadingSpinner message="Time is passing..." />
              </div>
            ) : (
              <>
                {/* {currentScenario && <ScenarioDisplay scenario={currentScenario} />} */}
                {outcomeDisplaying ? (
                  <div className="flex flex-col">
                    <OutcomeDisplay choiceOutcome={choiceOutcome} />
                    <div className="flex py-5">
                      {fitnessChange > 0 ? (
                        <div className="text-green-300 bg-green-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{fitnessChange > 5 ? "++" : "+"}</strong>{" "}
                          Fitness
                        </div>
                      ) : fitnessChange < 0 ? (
                        <div className="text-red-300 bg-red-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{fitnessChange < -5 ? "--" : "-"}</strong>{" "}
                          Fitness
                        </div>
                      ) : null}
                      {charismaChange > 0 ? (
                        <div className="text-green-300 bg-green-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{charismaChange > 5 ? "++" : "+"}</strong>{" "}
                          Charisma
                        </div>
                      ) : charismaChange < 0 ? (
                        <div className="text-red-300 bg-red-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{charismaChange < -5 ? "--" : "-"}</strong>{" "}
                          Charisma
                        </div>
                      ) : null}
                      {creativityChange > 0 ? (
                        <div className="text-green-300 bg-green-700/50 rounded-md px-2 py-1 mr-2">
                          <strong> {creativityChange > 5 ? "++" : "+"}</strong>{" "}
                          Creativity
                        </div>
                      ) : creativityChange < 0 ? (
                        <div className="text-red-300 bg-red-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{creativityChange < -5 ? "--" : "-"}</strong>{" "}
                          Creativity
                        </div>
                      ) : null}
                      {healthChange > 0 ? (
                        <div className="text-green-300 bg-green-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{healthChange > 5 ? "++" : "+"}</strong>{" "}
                          Health
                        </div>
                      ) : healthChange < 0 ? (
                        <div className="text-red-300 bg-red-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{healthChange < -5 ? "--" : "-"}</strong>{" "}
                          Health
                        </div>
                      ) : null}
                      {happinessChange > 0 ? (
                        <div className="text-green-300 bg-green-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{happinessChange > 5 ? "++" : "+"}</strong>{" "}
                          Happiness
                        </div>
                      ) : happinessChange < 0 ? (
                        <div className="text-red-300 bg-red-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{happinessChange < -5 ? "--" : "-"}</strong>{" "}
                          Happiness
                        </div>
                      ) : null}
                      {intelligenceChange > 0 ? (
                        <div className="text-green-300 bg-green-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>{intelligenceChange > 5 ? "++" : "+"}</strong>{" "}
                          Intelligence
                        </div>
                      ) : intelligenceChange < 0 ? (
                        <div className="text-red-300 bg-red-700/50 rounded-md px-2 py-1 mr-2">
                          <strong>
                            {intelligenceChange < -5 ? "--" : "-"}
                          </strong>{" "}
                          Intelligence
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={handleOutcomeContinue}
                        className="bg-white hover:bg-zinc-200 text-black ibm-plex-mono-semibold leading-tight py-4 px-8 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white "
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {choices ? (
                      choices.length > 0 && (
                        <ChoiceSelection
                          scenario={currentScenario}
                          choices={choices}
                          selectedIndex={selectedChoiceIndex}
                          setSelectedIndex={setSelectedChoiceIndex}
                          age={gameState.age}
                          decisionsMadeThisYear={decisionsMadeThisYear}
                          decisionsThisYear={decisionsThisYear}
                        />
                      )
                    ) : (
                      <ChoiceError />
                    )}
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={handleContinue}
                        className="bg-white hover:bg-zinc-200 text-black ibm-plex-mono-semibold leading-tight py-4 px-6 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white "
                        disabled={selectedChoiceIndex === null}
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

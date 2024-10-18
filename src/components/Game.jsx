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

  const generateNewScenario = async () => {
    if (!gameState) return;
    setIsLoading(true);
    if (selectedChoiceIndex !== null) {
      setSelectedChoiceIndex(null);
    }
    const scenarioData = await generateScenario(gameState, relationships);
    if (scenarioData) {
      setCurrentScenario(scenarioData.scenario);
      setChoices(scenarioData.choices);
    }
    setIsLoading(false);
  };

  const sendToEvaluateChoice = async (choice, scenario) => {
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

    const newGameState = {
      ...gameState,
      age: gameState.age + ageFactor,
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
      setGameState(updatedGame);
    }

    setDecisionsMadeThisYear((prev) => prev + 1);

    const decisionsThisYear = getDecisionsForAge(gameState.age);
    if (decisionsMadeThisYear + 1 >= decisionsThisYear) {
      await progressYear();
    } else {
      await generateNewScenario();
    }
  };

  const progressYear = async () => {
    if (!gameState) return;
    const nextAge = getNextAge(gameState.age);
    setGameState((prevState) => ({
      ...prevState,
      age: nextAge,
    }));
    setSelectedChoiceIndex(null);
    setDecisionsMadeThisYear(0);
    await sendToEvaluateChoice(
      choices[selectedChoiceIndex],
      currentScenario,
      gameState
    );
    await generateNewScenario();
  };

  const handleEndLife = () => {
    endLife();
    navigate("/");
  };

  const handleIntroContinue = () => {
    generateNewScenario();
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
      <Link to="/">
        <div className="pb-4">
          <h1 className="text-3xl w-48 font-bold mb-4">Life Simulation Game</h1>
        </div>
      </Link>
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
                  <>
                    <OutcomeDisplay choiceOutcome={choiceOutcome} />
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={handleOutcomeContinue}
                        className="bg-white hover:bg-zinc-200 text-black ibm-plex-mono-semibold leading-tight py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white "
                      >
                        Continue
                      </button>
                    </div>
                  </>
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
                        className="bg-white hover:bg-zinc-200 text-black ibm-plex-mono-semibold leading-tight py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white "
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

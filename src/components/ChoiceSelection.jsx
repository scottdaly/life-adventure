import { ArrowRightIcon } from "lucide-react";
import React from "react";

const ChoiceSelection = ({
  scenario,
  choices,
  onSelect,
  selectedIndex,
  choiceOutcome,
  age,
  decisionsMadeThisYear,
  decisionsThisYear,
}) => {
  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!choices.length) return null;

  console.log("Choices", choices);

  return (
    <div className="mb-4">
      {choiceOutcome && (
        <div className="py-4 rounded mb-4 ibm-plex-mono-regular tracking-tight text-lg">
          <p className="text-zinc-200">{choiceOutcome}</p>
        </div>
      )}
      <div className="flex justify-between">
        <div>
          <h2 className="text-zinc-400">Your Choices</h2>
          <p className="text-xl font-semibold mb-4">{age} years old</p>
        </div>
        <div className="text-zinc-400 h-full flex items-center justify-center">
          {decisionsThisYear > 0 ? (
            <p>
              {decisionsMadeThisYear + 1} / {decisionsThisYear}
            </p>
          ) : null}
        </div>
      </div>

      {scenario && (
        <div className="py-4 rounded mb-8 ibm-plex-mono-regular tracking-tight text-lg">
          <p className="text-zinc-200">{renderText(scenario)}</p>
        </div>
      )}
      <div className="space-y-2">
        {choices.map((choice, index) => {
          return (
            <button
              key={index}
              className={`flex w-full text-start bg-zinc-800 py-4 px-4 rounded ibm-plex-mono-regular ${
                selectedIndex === index
                  ? "bg-yellow-800"
                  : "hover:bg-yellow-950"
              }`}
              onClick={() => onSelect(index)}
            >
              <div className="flex items-center justify-center h-full w-12">
                <ArrowRightIcon className="w-8 h-8 mr-2" />
              </div>
              <div className="flex flex-col flex-1">
                {renderText(choice.choiceText)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceSelection;

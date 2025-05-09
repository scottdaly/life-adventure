import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const ChoiceSelection = ({
  scenario,
  choices,
  selectedIndex,
  setSelectedIndex,
  age,
  decisionsMadeThisYear,
  decisionsThisYear,
}) => {
  const { isDarkMode } = useTheme();

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

  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <div>
          <h2 className="text-zinc-500 dark:text-zinc-400 transition-colors duration-500">Your Choices</h2>
          <p className="text-xl font-semibold mb-2">{age} years old</p>
        </div>
        <div className="text-zinc-500 dark:text-zinc-400 transition-colors duration-500 h-full flex items-center justify-center">
          {decisionsThisYear > 0 ? (
            <p>
              {decisionsMadeThisYear + 1} / {decisionsThisYear}
            </p>
          ) : null}
        </div>
      </div>

      {scenario && (
        <div className="py-4 rounded mb-4 ibm-plex-mono-regular tracking-tight text-lg">
          <p className="text-zinc-800 dark:text-zinc-200 transition-colors duration-500">{renderText(scenario)}</p>
        </div>
      )}
      <div className="space-y-2">
        {choices.map((choice, index) => {
          return (
            <button
              key={index}
              className={`flex w-full text-start bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-4 px-4 border-2 rounded ibm-plex-mono-regular transition-colors duration-500 ${
                selectedIndex === index ? "bg-yellow-900 border-zinc-400" : "hover:bg-yellow-950"
              }`}
              style={{
                backgroundColor: selectedIndex === index ? isDarkMode ? "rgb(43, 53, 48)" : "rgb(220, 252, 231)" : isDarkMode ? "rgb(39, 39, 42)" : "rgb(226, 232, 240)",
                borderColor: selectedIndex === index ? isDarkMode ? "rgb(111, 111, 120)" : "rgb(52, 138, 112)" : "transparent",
              }}
              onClick={() => setSelectedIndex(index)}
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

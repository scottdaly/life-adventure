// src/components/ScenarioDisplay.jsx
import React from "react";

const ScenarioDisplay = ({ scenario }) => {
  if (!scenario) return null;

  return (
    <div className="bg-white mb-4">
      <h2 className="text-xl font-semibold mb-2">Current Scenario</h2>
      <p>{scenario}</p>
    </div>
  );
};

export default ScenarioDisplay;

import React from "react";

export default function OutcomeDisplay({ choiceOutcome }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg ibm-plex-mono-regular">{choiceOutcome}</p>
    </div>
  );
}

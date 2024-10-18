import React from "react";

const ChoiceError = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">Uh oh!</p>
      <p>Something went wrong with the choices.</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  );
};

export default ChoiceError;

// src/components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-transparent" />
      <p className="mt-2 text-gray-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

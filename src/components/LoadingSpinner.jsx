// src/components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 dark:border-zinc-400 border-t-transparent dark:border-t-transparent transition-colors duration-500" />
      <p className="mt-2 text-gray-700 dark:text-zinc-300">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

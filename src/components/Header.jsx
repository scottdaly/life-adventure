import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user } = useAuth();
  
  return (
    <div className="fixed top-4 right-10 flex items-center gap-6 z-50">
      {user && (
        <Link to="/account" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-500">
          <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500 flex items-center justify-center shadow-sm">
            <span className="text-sm font-semibold">{user.email[0].toUpperCase()}</span>
          </div>
        </Link>
      )}
      <div className="relative">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header; 
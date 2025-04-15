// src/components/Register.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Register = ({ showLogin, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await register(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 p-4 bg-transparent w-full">
      <input
        className="flex p-2 rounded-md bg-transparent w-full border border-zinc-400 dark:border-zinc-600 focus:border-zinc-500 dark:focus:border-zinc-400 focus:outline-none"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        placeholder="Email"
        required
      />
      <div className="flex items-center rounded-md text-black border border-zinc-400 dark:border-zinc-600 focus-within:border-zinc-500 dark:focus-within:border-zinc-400 group w-full">
        <input
          className="flex flex-1 p-2 bg-transparent focus:outline-none"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="Password"
          required
        />
        <div
          className={`flex items-center h-full px-2 cursor-pointer ${
            password.length > 0 ? "opacity-100 visible" : "opacity-0 hidden"
          }`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400 transition-colors duration-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400 transition-colors duration-500" />
          )}
        </div>
      </div>
      <div className="flex items-center rounded-md text-black border border-zinc-400 dark:border-zinc-600 focus-within:border-zinc-500 dark:focus-within:border-zinc-400 group w-full">
        <input
          className="flex flex-1 p-2 bg-transparent focus:outline-none"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          placeholder="Confirm Password"
          required
        />
        <div
          className={`flex items-center h-full px-2 cursor-pointer ${
            confirmPassword.length > 0 ? "opacity-100 visible" : "opacity-0 hidden"
          }`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOffIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400 transition-colors duration-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400 transition-colors duration-500" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-emerald-800 dark:bg-blue-800 text-white font-semibold hover:bg-emerald-900 dark:hover:bg-blue-900 transition-colors duration-500"
      >
        Register
      </button>
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex flex-row gap-2 text-zinc-500 dark:text-zinc-500 transition-colors duration-500">
        <p>Already have an account?</p>
        <button
          onClick={() => setShowLogin(!showLogin)}
          className="text-emerald-600 dark:text-blue-400 hover:text-emerald-700 dark:hover:text-blue-300 transition-colors duration-500"
        >
          Login
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500"></div>
        <p className="text-zinc-500 dark:text-zinc-400 mb-1 transition-colors duration-500">or</p>
        <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500"></div>
      </div>
      <a
        href="http://localhost:3000/auth/google"
        className="border border-zinc-800 dark:border-zinc-200 w-full p-2 rounded-md text-center flex flex-row items-center justify-center gap-1 font-semibold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
        <p>Register with Google</p>
      </a>
    </form>
  );
};

export default Register;

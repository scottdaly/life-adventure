// src/components/Register.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "";

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mb-8">
      <input
        className="p-2 rounded-md bg-zinc-800 text-white border-2 border-transparent focus:border-zinc-400 focus:outline-none"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <div className="flex items-center rounded-md bg-zinc-800 text-white border-2 border-transparent focus-within:border-zinc-400 group">
        <input
          className="flex flex-1 p-2 bg-transparent focus:outline-none"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div
          className={`flex items-center h-full px-2 cursor-pointer ${
            password.length > 0 ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-zinc-400 " />
          ) : (
            <EyeIcon className="h-5 w-5 text-zinc-400" />
          )}
        </div>
      </div>
      <div className="flex items-center rounded-md bg-zinc-800 text-white border-2 border-transparent focus-within:border-zinc-400 group">
        <input
          className="flex flex-1 p-2 bg-transparent focus:outline-none"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <div
          className={`flex items-center h-full px-2 cursor-pointer ${
            confirmPassword.length > 0 ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOffIcon className="h-5 w-5 text-zinc-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-zinc-400" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-zinc-200 text-black"
      >
        Register
      </button>
      {error && <p className="text-red-400">{error}</p>}
      <p className="text-zinc-400 my-2 text-center">or</p>
      <a
        href={`${API_URL}/auth/google`}
        className="border border-zinc-100 w-full p-2 rounded-md text-center"
      >
        Register with Google
      </a>
    </form>
  );
};

export default Register;

// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 p-4 bg-transparent w-full"
    >
      <input
        className="flex p-2 rounded-md w-full bg-zinc-800 border-2 border-transparent focus:border-zinc-300 focus:outline-none"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        placeholder="Email"
        required
      />
      <div className="flex items-center rounded-md bg-zinc-800 text-white border-2 border-transparent focus-within:border-zinc-300 group">
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
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-zinc-200 text-black"
      >
        Login
      </button>
      {error && <p className="text-red-400">{error}</p>}
      <p className="text-zinc-400 my-2">or</p>
      <a
        href={`${API_URL}/auth/google`}
        className="border border-zinc-100 w-full p-2 rounded-md text-center"
      >
        Login with Google
      </a>
    </form>
  );
};

export default Login;

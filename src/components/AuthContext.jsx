// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);
const API_ENDPOINT = import.meta.env.VITE_API_URL || "";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkUser = async () => {
      try {
        const response = await fetchWithAuth(`${API_ENDPOINT}/api/user`);

        if (response.ok) {
          const data = await response.json();

          setUser(data); // Set the authenticated user
        } else {
          console.log("session expired, refeshing token");
          await refreshAuthToken();
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies in request
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      const data = await response.json();
      console.log("Login response", data);
      setUser(data.user); // Set user state if login is successful
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies in request
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }

      const data = await response.json();
      console.log("Register response", data);
      setUser(data.user); // Set user state if registration is successful
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/logout`, {
        method: "GET",
        credentials: "include", // Include cookies in request
      });

      if (response.ok) {
        setUser(null); // Clear user state on successful logout
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Token refresh function
  const refreshAuthToken = async () => {
    try {
      const response = await fetchWithAuth(
        `${API_ENDPOINT}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include", // Include cookies in request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      console.log("Token refreshed", data);
      setUser(data.user); // Set the new user state if refresh was successful
    } catch (error) {
      console.error("Token refresh error:", error);
      logout(); // Log out if refresh fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Utility function for fetching with auto-refresh token
export const fetchWithAuth = async (url, options = {}) => {
  try {
    let response = await fetch(url, {
      ...options,
      credentials: "include", // Send cookies with request
    });

    // If the response is 401 Unauthorized, try refreshing the token
    if (response.status === 401) {
      await refreshAuthToken(); // Attempt to refresh the token
      // Retry the original request after refreshing the token
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });
    }

    return response; // Return the (possibly retried) response
  } catch (error) {
    console.error("fetchWithAuth error:", error);
    throw error;
  }
};

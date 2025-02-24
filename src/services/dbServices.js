import { fetchWithAuth } from "../components/AuthContext";

const API_ENDPOINT = "http://localhost:3000";

export const saveNewGame = async (gameState) => {
  try {
    const response = await fetchWithAuth(`${API_ENDPOINT}/save-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: gameState.age,
        location: gameState.location,
        netWorth: gameState.netWorth,
        name: gameState.name,
        stats: gameState.stats,
        lifeEvents: gameState.lifeEvents,
        history: gameState.history,
        inventory: gameState.inventory,
      }),
    });

    // Check if the response is OK (HTTP status 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.message || "Failed to save new game");
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the saved game data
  } catch (error) {
    console.error("Error saving new game:", error);
    return null; // Return null if an error occurred
  }
};

export const saveGame = async (
  gameId,
  age,
  location,
  netWorth,
  name,
  stats,
  lifeEvents,
  history,
  inventory
) => {
  try {
    const response = await fetchWithAuth(`${API_ENDPOINT}/save-game`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId,
        age,
        location,
        netWorth,
        name,
        stats,
        lifeEvents,
        history,
        inventory,
      }),
    });

    console.log("Saved game", response);
    const data = await response.json();

    return data.gameState;
  } catch (error) {
    console.error("Error saving game:", error);
    return null;
  }
};

export const getGameStates = async (userId) => {
  try {
    const response = await fetchWithAuth(
      `${API_ENDPOINT}/games?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting game states:", error);
    return null;
  }
};

export const removeGameState = async (gameStateId) => {
  try {
    const response = await fetchWithAuth(`${API_ENDPOINT}/save-game`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: gameStateId }),
    });
    return response.data;
  } catch (error) {
    console.error("Error removing game state:", error);
    return null;
  }
};

export const getRelationships = async (gameId) => {
  try {
    // Append gameId as a query parameter in the URL
    const response = await fetchWithAuth(
      `${API_ENDPOINT}/relationships?gameId=${gameId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Headers are fine with GET requests
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.message || "Failed to fetch relationships");
    }

    const data = await response.json(); // Parse the response data

    return data;
  } catch (error) {
    console.error("Error fetching relationships:", error);
    return null; // Return null if an error occurs
  }
};

export const saveNewRelationships = async (gameId, relationships) => {
  try {
    const response = await fetchWithAuth(`${API_ENDPOINT}/relationships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId,
        relationships,
      }),
    });

    const data = await response.json();
    return data.relationships;
  } catch (error) {
    console.error("Error saving new relationships:", error);
    return null;
  }
};

export const updateRelationship = async (gameId, relationship) => {
  console.log("Updating relationship", relationship);
  try {
    const response = await fetchWithAuth(
      `${API_ENDPOINT}/relationships/${relationship.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId,
          relationship,
        }),
      }
    );
    const data = await response.json();
    console.log("Updated relationship", data);
    return data.relationship;
  } catch (error) {
    console.error("Error updating relationship:", error);
    return null;
  }
};

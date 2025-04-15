const API_ENDPOINT = import.meta.env.VITE_API_URL || "";

export async function generateScenario(gameState, relationships) {
  console.log(
    "Generating scenario - Here are the relationships",
    relationships
  );
  const response = await fetch(`${API_ENDPOINT}/generate-scenario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameState, relationships }),
  });
  const data = await response.json();

  return data;
}

export async function evaluateChoice(
  choice,
  scenario,
  gameState,
  relationships
) {
  // Call the evaluate-choice endpoint to get the outcome of the choice and return the data
  const response = await fetch(`${API_ENDPOINT}/evaluate-choice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ choice, scenario, gameState, relationships }),
  });
  const data = await response.json();

  return data;
}

export async function generateBackstory() {
  const response = await fetch(`${API_ENDPOINT}/generate-backstory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

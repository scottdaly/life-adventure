const API_ENDPOINT = "http://localhost:3000";

export async function generateScenario(gameState) {
  const response = await fetch(`${API_ENDPOINT}/generate-scenario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameState }),
  });
  const data = await response.json();
  return data;
}

export async function evaluateChoice(choice, scenario, gameState) {
  const response = await fetch(`${API_ENDPOINT}/evaluate-choice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ choice, scenario, gameState }),
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
  console.log("data", data);
  return data;
}

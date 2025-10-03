const API_BASE = ""; 

// --- Users ---
export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return await res.json();
}

export async function createUser(user) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return await res.json();
}

// --- Polls ---
export async function getPolls() {
  const res = await fetch(`${API_BASE}/polls`);
  return await res.json();
}

export async function createPoll(poll) {
  const res = await fetch(`${API_BASE}/polls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(poll)
  });
  return await res.json();
}

// --- Votes ---
export async function getVotes() {
  const res = await fetch(`${API_BASE}/votes`);
  return await res.json();
}

export async function createVote(vote) {
  const res = await fetch(`${API_BASE}/votes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vote)
  });
  return await res.json();
}

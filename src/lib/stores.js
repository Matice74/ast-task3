import { writable } from "svelte/store";
import { getUsers, getPolls, getVotes } from "../api.js";

export const users = writable([]);
export const polls = writable([]);
export const votes = writable([]);

// Initiale Ladung vom Backend
export async function loadData() {
  users.set(await getUsers());
  polls.set(await getPolls());
  votes.set(await getVotes());
}

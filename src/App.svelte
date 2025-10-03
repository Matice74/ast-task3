<script>
  import PollCreate from './PollCreate.svelte';
  import VotePoll from './VotePoll.svelte';
  import { loadData } from './lib/stores.js';
  import CreateUser from './CreateUser.svelte';
  loadData();
</script>

<main>
  <h1>Poll App (Backend connected)</h1>
  <PollCreate />
  <CreateUser />
  <VotePoll />
</main>

<style>
  main { font-family: sans-serif; padding: 20px; }
  h1 { margin-bottom: 20px; }
</style>


<script>
  import { polls, votes, users } from './lib/stores.js';
  import { createVote } from './api.js';
  import { get } from 'svelte/store';

  let selectedUserId = null;
  let selectedPollId = null;
  let selectedOptionId = null;
  let message = "";

  function getVoteCount(optionId) {
    return $votes.filter(v => v.option.id === optionId).length;
  }


  function pollOptions() {
    const poll = get(polls).find(p => p.id === selectedPollId);
    return poll ? poll.options : [];
  }

  async function vote() {
    if (!selectedUserId || !selectedPollId || !selectedOptionId) {
      message = "Select user, poll and option!";
      return;
    }

    const voteObj = {
      user: { id: selectedUserId },
      option: { id: selectedOptionId }
    };

    const savedVote = await createVote(voteObj);


    votes.update(all => [...all.filter(v => v.user?.id !== selectedUserId), savedVote]);
    selectedOptionId = null;
    message = "Vote recorded!";
  }
</script>


<div class="vote-poll">
  <h2>Vote on Poll</h2>
  {#if message}<p>{message}</p>{/if}

  <select bind:value={selectedUserId}>
    <option value="" disabled selected>Select User</option>
    {#each $users as u}
      <option value={u.id}>{u.username}</option>
    {/each}
  </select>

  <select bind:value={selectedPollId}>
    <option value="" disabled selected>Select Poll</option>
    {#each $polls as poll}
      <option value={poll.id}>{poll.question}</option>
    {/each}
  </select>

  {#if selectedPollId}
    {#each pollOptions() as option}
      <div>
        <input type="radio" bind:group={selectedOptionId} value={option.id} />
        {option.caption} ({getVoteCount(option.id)} votes)
      </div>
    {/each}
    <button on:click={vote}>Vote</button>
  {/if}
</div>

<style>
  div { margin: 5px 0; }
  input, select { margin: 5px; }
  button { margin: 5px; }
</style>
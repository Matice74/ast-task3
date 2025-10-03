<script>
  import { polls } from './lib/stores.js';
  import { createPoll } from './api.js';
  import { get } from 'svelte/store';

  let title = "";
  let options = ["", ""];
  let message = "";
  function addOption() {
    options = [...options, ""];
  }

  function removeOption(index) {
    options = options.filter((_, i) => i !== index);
  }

  function updateOption(index, value) {
    options[index] = value;
  }
  async function createNewPoll() {
    if (!title.trim()) {
      message = "Poll needs a title!";
      return;
    }

    const filledOptions = options.filter(o => o.trim() !== "");
    if (filledOptions.length < 2) {
      message = "Please provide at least 2 options.";
      return;
    }
    const poll = {
      question: title,
      publishedAt: new Date().toISOString(),
      validUntil: new Date(new Date().getTime() + 7*24*60*60*1000).toISOString(),
      options: filledOptions.map((text, i) => ({ caption: text, presentationOrder: i }))
    };

    const savedPoll = await createPoll(poll);
    polls.update(all => [...all, savedPoll]);

    title = "";
    options = ["", ""];
    message = "Poll created!";
  }
</script>

<button on:click={createNewPoll}>Create Poll</button>
{#if message}<p>{message}</p>{/if}

<div class="create-poll">
  <h2>Create a New Poll</h2>
  <input placeholder="Question" bind:value={title} />
  
<h3>Options</h3>
  {#each options as option, index}
    <div class="option">
      <input placeholder="Option" bind:value={options[index]} on:input={(e) => updateOption(index, e.target.value)} />
      {#if options.length > 2}
        <button on:click={() => removeOption(index)}>Remove</button>
      {/if}
    </div>
  {/each}
  <button on:click={addOption}>Add Option</button>
  <br/>
  <button on:click={createPoll}>Create Poll</button>
  {#if message}
    <p>{message}</p>
  {/if}
</div>

<style>
  input { margin: 5px; }
  button { margin: 5px; }
  div { margin: 5px 0; }
</style>

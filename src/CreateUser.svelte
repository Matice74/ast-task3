<script>
  import { createUser } from "./api.js";
  import { users } from "./lib/stores.js";

  let username = "";
  let email = "";
  let message = "";

  async function handleCreate() {
    if (!username.trim() || !email.trim()) {
      message = "Please fill in both fields.";
      return;
    }

    try {
      const newUser = await createUser({ username, email });
      users.update(u => [...u, newUser]);

      message = `User "${newUser.username}" created!`;
      username = "";
      email = "";
    } catch (err) {
      console.error(err);
      message = "Error creating user.";
    }
  }
</script>

<div class="create-user">
  <h2>Create User</h2>
  <input placeholder="Username" bind:value={username} />
  <input placeholder="Email" bind:value={email} />
  <button on:click={handleCreate}>Create</button>
  {#if message}<p>{message}</p>{/if}
</div>

<style>
  input, button { margin: 5px; }
</style>

<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {RANK_OPTIONS} from './js/User';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {userIcon} from "./js/AppIcons";

  export let user;

  function updateHandler() {
    user.updateHandler()
  }
</script>
<style>
    textarea {
        width: 100%;
        height: 75px;
    }
</style>

{#if !user.name}
  <h2>Welcome to <a href="https://github.com/bdelbosc/beer-feedback#-beer-feedback" rel="noopener" target="_blank">Beer
    Feedback</a>!</h2>
{/if}

<h3>
  <SvgIcon d={userIcon} fill="blue" boxSize="20"/>
  Who are you?
</h3>
<div>
  <span class="label required">Name</span>
  <input type="text" class="fixedInput" on:change={updateHandler} bind:value={user.name}/>
</div>

<div>
  <SelectCheck on:change={updateHandler} bind:value={user.rank} options={RANK_OPTIONS} noCheck="true" required="true">
    Rank
  </SelectCheck>
</div>

<div>
  <span class="longLabel" title="BJCP ID, email, ...">Additional Information</span>
  <textarea on:change={updateHandler} type=text bind:value={user.comment}/>
</div>

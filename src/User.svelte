<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {
    RANK_OPTIONS
  } from './js/User';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {userIcon} from "./js/AppIcons";

  export let user;

  function updateHandler() {
    user.updateHandler()
  }
</script>

<style>
  span.label {
    float: left;
    width: 100px;
  }

  input {
    width: 10em;
  }
</style>
<h3>
  <SvgIcon d={userIcon} fill="blue"/>
  Who are you?
</h3>
<div>
  <span class="label">Name</span>
  <input on:change={updateHandler} type=text bind:value={user.name}/>
</div>

<div>
  <SelectCheck on:change={updateHandler} bind:value={user.rank} options={RANK_OPTIONS} noCheck="true">
    Rank
  </SelectCheck>
</div>


<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {
    ACCURACY_OPTIONS,
    INTANGIBLE_OPTIONS,
    TECHNICAL_OPTIONS,
    DRINKABILITY_OPTIONS
  } from './js/Overall';

  export let overall;

  function updateHandler() {
    overall.updateHandler()
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

<div>
  <SelectCheck on:change={updateHandler} bind:value={overall.accuracy} options={ACCURACY_OPTIONS}
               noCheck="true">
    Accuracy
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={overall.technical} options={TECHNICAL_OPTIONS}
               noCheck="true">
    Technical
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={overall.intangible} options={INTANGIBLE_OPTIONS}
               noCheck="true">
    Intangible
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={overall.drinkability} options={DRINKABILITY_OPTIONS}
               noCheck="true">
    Drinkability
  </SelectCheck>
</div>
<div>
  <span class="label">Feedback</span>
  <input on:change={updateHandler} type=text bind:value={overall.feedback}/>
</div>


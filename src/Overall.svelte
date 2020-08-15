<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {
    ACCURACY_OPTIONS,
    INTANGIBLE_OPTIONS,
    TECHNICAL_OPTIONS,
    DRINKABILITY_OPTIONS
  } from './js/Overall';
  import Score from "./comp/Score.svelte";
  import {getScore, getScoreLongDescription} from './js/PdfRenderer';

  export let overall;
  export let score;

  function updateHandler() {
    overall.updateHandler()
  }
</script>

<style>
  div.scoreDescription {
    font-size: 0.8em;
    font-style: italic;
  }

  div.score {
    margin-top: 1em;
    margin-bottom: 1em;
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
    Technical Merit
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={overall.drinkability} options={DRINKABILITY_OPTIONS}
               noCheck="true">
    Drinkability
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={overall.intangible} options={INTANGIBLE_OPTIONS}
               noCheck="true">
    Intangible
  </SelectCheck>
</div>
<div>
</div>
<div>
  <span class="longLabel">Feedback</span>
  <textarea on:change={updateHandler} type=text bind:value={overall.feedback}/>
</div>
<div>
  <Score on:change={updateHandler} bind:value={overall.score} max="10" min="1">Score</Score>
</div>
{#if score > 0}
  <div class="score">
    Total score is <b>{score}</b> which is <b>{getScore(score)}</b>
    <div class="scoreDescription">{getScoreLongDescription(score)}</div>
  </div>
{/if}


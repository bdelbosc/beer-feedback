<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {
    ASTRINGENCY_OPTIONS,
    BODY_OPTIONS,
    CARBONATION_OPTIONS,
    CREAMINESS_OPTIONS,
    WARMTH_OPTIONS
  } from './js/Mouthfeel';
  import Score from "./comp/Score.svelte";

  export let mouthfeel;

  function updateHandler() {
    mouthfeel.updateHandler()
  }
</script>
<div>
  <SelectCheck on:change={updateHandler} bind:value={mouthfeel.body} options={BODY_OPTIONS}
               bind:checked={mouthfeel.bodyInappropriate}>
    Body
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={mouthfeel.carbonation} options={CARBONATION_OPTIONS}
               bind:checked={mouthfeel.carbonationInappropriate}>
    Carbonation
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={mouthfeel.warmth} options={WARMTH_OPTIONS}
               bind:checked={mouthfeel.warmthInappropriate}>
    Warmth
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={mouthfeel.creaminess} options={CREAMINESS_OPTIONS}
               bind:checked={mouthfeel.creaminessInappropriate}>
    Creaminess
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={mouthfeel.astringency} options={ASTRINGENCY_OPTIONS}
               bind:checked={mouthfeel.astringencyInappropriate}>
    Astringency
  </SelectCheck>
</div>
<div>
  <span>Other Palate Sensations</span>
  <textarea on:change={updateHandler} type=text bind:value={mouthfeel.other}/>
</div>
<div>
  <Score on:change={updateHandler} bind:value={mouthfeel.score} max="5" min="1">Score</Score>
</div>


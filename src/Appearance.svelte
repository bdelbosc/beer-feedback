<script>
  import Srm from "./comp/Srm.svelte";
  import {
    HEAD_OPTIONS, RETENTION_OPTIONS, CLARITY_OPTIONS, HUE_OPTIONS, TEXTURE_OPTIONS
  } from './js/Appearance';
  import Score from "./comp/Score.svelte";
  import SelectCheck from "./comp/SelectCheck.svelte";

  export let appearance;

  function updateHandler() {
    appearance.updateHandler();
  }
</script>
<div on:click={updateHandler}><span class="label" id="color">Color</span>
  <Srm bind:value={appearance['color']}/>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={appearance.clarity} options={CLARITY_OPTIONS}
               noCheck="true">
    Clarity
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={appearance.hue} options={HUE_OPTIONS}
               noCheck="true">
    Hue
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={appearance.head} options={HEAD_OPTIONS}
               noCheck="true">
    Head
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={appearance.retention} options={RETENTION_OPTIONS}
               noCheck="true">
    Retention
  </SelectCheck>
</div>
<div>
  <SelectCheck on:change={updateHandler} bind:value={appearance.texture} options={TEXTURE_OPTIONS}
               noCheck="true">
    Texture
  </SelectCheck>
</div>

<div>
  <label for="laces"><span class="label">Laces</span><input id="laces" on:change={updateHandler} type=checkbox
                                                            bind:checked={appearance.laces}></label>
  <label for="legs"><span class="label">Legs</span><input id="legs" on:change={updateHandler} type=checkbox
                                                          bind:checked={appearance.legs}></label>
</div>
<div>
  <Score on:change={updateHandler} bind:value={appearance.score} max="3" min="1">Score</Score>
</div>

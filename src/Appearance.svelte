<script>
  import Srm from "./comp/Srm.svelte";
  import {
    HEAD_OPTIONS, RETENTION_OPTIONS, CLARITY_OPTIONS, HUE_OPTIONS, TEXTURE_OPTIONS
  } from './js/Appearance';

  export let appearance;

  function updateHandler() {
    appearance.updateHandler();
  }
</script>
<style>
  span.label {
    float: left;
    width: 100px;
  }

  span.missing {
    float: left;
    width: 100px;
    color: orangered;
  }

  select {
    width: 10em;
  }
</style>
<div on:click={updateHandler}><span class="label" id="color">Color</span>
  <Srm bind:value={appearance['color']}/>
</div>
<div><span class="label" id="clarity">Clarity</span>
  <select on:change={updateHandler} bind:value={appearance.clarity}>
    {#each CLARITY_OPTIONS as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Hue</span>
  <select on:change={() => updateHandler} bind:value={appearance.hue}>
    {#each HUE_OPTIONS as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Head</span>
  <select on:change={updateHandler} bind:value={appearance.head}>
    {#each HEAD_OPTIONS as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Retention</span>
  <select on:change={updateHandler} bind:value={appearance.retention}>
    {#each RETENTION_OPTIONS as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Texture</span>
  <select on:change={updateHandler} bind:value={appearance.texture}>
    {#each TEXTURE_OPTIONS as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div>
  <label for="laces"><span class="label">Laces</span><input id="laces" on:change={updateHandler} type=checkbox
                                                            bind:checked={appearance.laces}></label>
  <label for="legs"><span class="label">Legs</span><input id="legs" on:change={updateHandler} type=checkbox
                                                          bind:checked={appearance.legs}></label>
</div>

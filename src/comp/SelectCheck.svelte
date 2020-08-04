<script>
  export let value = undefined;
  export let checked = false;
  export let options = [];

  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  function eventHandler() {
    // propagate change event
    dispatch('change');
  }

</script>
<style>
  select {
    width: 10em;
  }

  span.check {
    display: flex;
    flex-direction: row;
  }

  span.label {
    float: left;
    width: 100px;
  }

  input#checkbox {
    margin-right: 5px;
  }
</style>

<span class="label"><slot/></span>
<select on:change={eventHandler} bind:value={value}>
  {#each options as item}
    <option value={item.id}>
      {item.text}
    </option>
  {/each}
</select>
<br/>
<span class="check">
  <span class="label">&nbsp</span>
  <label>
    <input on:change={eventHandler} type="checkbox" bind:checked={checked}/>
    <slot name="checkbox"/>
  </label>
</span>

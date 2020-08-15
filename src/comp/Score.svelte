<script>
  import {createEventDispatcher} from 'svelte';

  export let value = undefined;
  export let max = 12;
  export let min = 0;

  const dispatch = createEventDispatcher();

  function eventHandler() {
    // propagate change event
    dispatch('change');
  }

</script>
<style>
  input[type=number] {
    width: 4em;
  }

  input[type=range] {
    width: 320px;
  }

  span.label {
    float: left;
    width: 100px;
  }


</style>
<label>
  <span class="label"><slot/></span>
  <span>{value > 0 ? value: '...'}</span><span>/{max}</span>
  <br/>
  <input on:change={eventHandler} type=range bind:value={value} min={min} max={max}>
</label>

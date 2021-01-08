<script>
  import SvgIcon from "./SvgIcon.svelte";

  export let value = undefined;
  export let checked = false;
  export let options = [];
  export let noCheck = false;
  export let required = false;

  import {createEventDispatcher} from 'svelte';
  import {alertIcon, checkmarkIcon} from '../js/AppIcons'

  const dispatch = createEventDispatcher();

  function eventHandler() {
    // propagate change event
    dispatch('change');
  }

  function check() {
    // propagate change event
    checked = !checked;
  }

</script>
<span class={required ? 'label required' : 'label'}><slot/></span>
<select class="fixedInput" on:change={eventHandler} bind:value={value}>
  {#each options as item}
    <option value={item.id}>
      {item.text}
    </option>
  {/each}
</select>
{#if !noCheck}
  <button on:change={eventHandler} type="checkbox" on:click={() => check()}>
    {#if checked}
      <span title="Inappropriate"><SvgIcon d={alertIcon} fill="orange"/></span>
    {:else}
      <span title="Ok"><SvgIcon d={checkmarkIcon} fill="lightgray"/></span>
    {/if}
  </button>
{/if}

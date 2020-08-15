<script>
  import {onMount} from "svelte";

  export let items = [];
  export let activeTabValue;

  onMount(() => {
    // Set default tab value
    if (Array.isArray(items) && items.length && items[0].value) {
      activeTabValue = items[0].value;
    }
  });

  const handleClick = tabValue => () => (activeTabValue = tabValue);

  let comment;

  $: comment = items[activeTabValue - 1].comment;
</script>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 2px;
    margin-top: 2px;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
    clear: both;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: orangered;
    background-color: #fff;
    border-color: darkgrey darkgrey #fff;
    font-size: 1.1em;
  }

  li.activeCompleted > span {
    color: darkgreen;
    background-color: #fff;
    border-color: darkgrey darkgrey #fff;
    font-size: 1.1em;
  }

  li.inactive > span {
    color: orangered;
    opacity: 0.5;
    background-color: #eee;
    border-color: #dee2e6 #dee2e6 #eee;
    font-size: 1.1em;
  }

  li.inactiveCompleted > span {
    color: darkgreen;
    opacity: 0.5;
    background-color: #eee;
    border-color: #dee2e6 #dee2e6 #eee;
    font-size: 1.1em;
  }

  .comment {
    font-size: 0.8em;
    clear: both;
    font-style: italic;
    color: orangered;
    padding-top: 4px;
    padding-bottom: 4px;
  }

</style>

<ul>
  {#if Array.isArray(items)}
    {#each items as item}
      {#if activeTabValue === item.value}
        <li class={item.comment ? 'active':'activeCompleted'}>
          <span on:click={handleClick(item.value)}>{item.label}</span>
        </li>
      {:else}
        <li class={item.comment ? 'inactive': 'inactiveCompleted'}>
          <span on:click={handleClick(item.value)}>{item.shortLabel}</span>
        </li>
      {/if}
    {/each}
  {/if}
</ul>
<div class="comment">{comment}</div>


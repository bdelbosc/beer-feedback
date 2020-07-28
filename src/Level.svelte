<script>
  const levels = ["None", "Low", "Medium Low", "Medium", "Medium High", "High"];
  export let value = 3;
  export let edit = false;
  $: level = levels[value];
</script>
<style>

</style>

{#if edit}
  <span>{levels[value]}</span><br>
  <input type="range" min="0" max="5" step="1" bind:value={value}>
{:else if value == 1}
  <span title="{levels[value]}">&darr;</span>
{:else if value == 2}
  <span title="{levels[value]}">&searr;</span>
{:else if value == 3}
  <span title="{levels[value]}">&rarr;</span>
{:else if value == 4}
  <span title="{levels[value]}">&nearr;</span>
{:else if value == 5}
  <span title="{levels[value]}">&uarr;</span>
{:else if value == 0}
  <span title="{levels[value]}">&#8709;</span>
{:else}
  <span title="Unknown">{value}</span>
{/if}

<script>
  export let value = 'none';
</script>
<style>
  span {
    font-size: larger;
  }
</style>

{#if value == 'low'}
  <span title="Low">&darr;</span>
{:else if value == 'medium-low'}
  <span title="Medium Low">&searr;</span>
{:else if value == 'medium'}
  <span title="Medium">&rarr;</span>
{:else if value == 'medium-high'}
  <span title="Medium High">&nearr;</span>
{:else if value == 'high'}
  <span title="High">&uarr;</span>
{:else if value == 'none'}
  <span title="None">&#8709;</span>
{:else}
  <span title="Unknown">{value}</span>
{/if}

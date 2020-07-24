<script>
  export let value = 'none';
</script>

{#if value == 'low'}
  <span title="Low">&dArr;</span>
{:else if value == 'medium-low'}
  <span title="Medium Low">&#8664;</span>
{:else if value == 'medium'}
  <span title="Medium">&rArr;</span>
{:else if value == 'medium-high'}
  <span title="Medium High">&#8663;</span>
{:else if value == 'high'}
  <span title="High">&uArr;</span>
{:else if value == 'none'}
  <span title="Non">&#8709;</span>
{:else}
  <span title="Unknown">{value}</span>
{/if}

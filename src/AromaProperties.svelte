<script>
  export let inappropriate = false;
  export let initial = false;
  export let warms = false;
</script>

{#if inappropriate}
  <span title="Inappropriate">&#9888;</span>
{/if}
{#if initial}
  <span title="Initial aroma">&#9684;</span>
{/if}
{#if warms}
  <span title="When the beer warms">&#9685;</span>
{/if}

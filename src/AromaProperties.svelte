<script>
  export let inappropriate = false;
  export let initial = false;
  export let warms = false;
</script>

{#if inappropriate}
  <button><span title="Inappropriate">&#9888;</span></button>
{/if}
{#if initial}
  <button><span title="Initial aroma">&#9684;</span></button>
{/if}
{#if warms}
  <button><span title="When the beer warms">&#9685;</span></button>
{/if}

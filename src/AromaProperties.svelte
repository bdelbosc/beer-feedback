<script>
  import SvgIcon from './SvgIcon.svelte'
  import {alertIcon, initialIcon, warmsIcon} from './AppIcons'
  export let inappropriate = false;
  export let initial = false;
  export let warms = false;
</script>
<style>
</style>
{#if inappropriate}
  <span title="Inappropriate"><SvgIcon d={alertIcon} fill="orange"/></span>
{/if}
{#if initial}
  <span title="Initial aroma"><SvgIcon d={initialIcon}/></span>
{/if}
{#if warms}
  <span title="When the beer warms"><SvgIcon d={warmsIcon}/></span>
{/if}

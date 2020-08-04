<script>
  import SvgIcon from './comp/SvgIcon.svelte'
  import {alertIcon, initialIcon, warmsIcon, aftertasteIcon} from './js/AppIcons'

  export let inappropriate = false;
  export let initial = false;
  export let warms = false;
  export let aftertaste = false;
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
{#if aftertaste}
  <span title="Aftertaste"><SvgIcon d={aftertasteIcon}/></span>
{/if}

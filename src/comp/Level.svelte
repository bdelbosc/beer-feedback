<script>
  import SvgIcon from './SvgIcon.svelte'
  import {lowIcon, mediumHighIcon, mediumIcon, mediumLowIcon, highIcon, noneIcon} from '../js/AppIcons'
  import {LEVELS} from '../js/BaseCategory'

  const icons = [noneIcon, lowIcon, mediumLowIcon, mediumIcon, mediumHighIcon, highIcon];
  export let value = 3;
  export let edit = false;
  $: level = LEVELS[value];
</script>
<style>
  input[type=range] {
    width: 100%;
  }
</style>

{#if edit}
  <span><SvgIcon d={icons[value]}/>{LEVELS[value]}</span><br>
  <input type="range" min="0" max="5" step="1" bind:value={value}>
{:else if value == 1}
  <span title="{LEVELS[value]}"><SvgIcon d={lowIcon}/></span>
{:else if value == 2}
  <span title="{LEVELS[value]}"><SvgIcon d={mediumLowIcon}/></span>
{:else if value == 3}
  <span title="{LEVELS[value]}"><SvgIcon d={mediumIcon}/></span>
{:else if value == 4}
  <span title="{LEVELS[value]}"><SvgIcon d={mediumHighIcon}/></span>
{:else if value == 5}
  <span title="{LEVELS[value]}"><SvgIcon d={highIcon}/></span>
{:else if value == 0}
  <span title="{LEVELS[value]}"><SvgIcon d={noneIcon}/></span>
{:else}
  <span title="Unknown">{value}</span>
{/if}

<script>
  import SvgIcon from './SvgIcon.svelte'
  import {lowIcon, mediumHighIcon, mediumIcon, mediumLowIcon, highIcon, noneIcon} from '../js/AppIcons'

  const levels = ["None", "Low", "Medium Low", "Medium", "Medium High", "High"];
  const icons = [noneIcon, lowIcon, mediumLowIcon, mediumIcon, mediumHighIcon, highIcon];
  export let value = 3;
  export let edit = false;
  $: level = levels[value];
</script>
<style>
  input[type=range] {
    width: 320px;
  }

</style>

{#if edit}
  <span><SvgIcon d={icons[value]}/>{levels[value]}</span><br>
  <input type="range" min="0" max="5" step="1" bind:value={value}>
{:else if value == 1}
  <span title="{levels[value]}"><SvgIcon d={lowIcon}/></span>
{:else if value == 2}
  <span title="{levels[value]}"><SvgIcon d={mediumLowIcon}/></span>
{:else if value == 3}
  <span title="{levels[value]}"><SvgIcon d={mediumIcon}/></span>
{:else if value == 4}
  <span title="{levels[value]}"><SvgIcon d={mediumHighIcon}/></span>
{:else if value == 5}
  <span title="{levels[value]}"><SvgIcon d={highIcon}/></span>
{:else if value == 0}
  <span title="{levels[value]}"><SvgIcon d={noneIcon}/></span>
{:else}
  <span title="Unknown">{value}</span>
{/if}

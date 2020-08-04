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

  input[type=range]:focus {
    outline: none;
  }

  input[type='range'] {
    overflow: hidden;
    margin: 18px 0;
    width: 100%;
    height: 30px;
    -webkit-appearance: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    color: #367ebd;
    margin-top: -1px;
  }

  input[type='range']::-webkit-slider-thumb {
    width: 0px;
    -webkit-appearance: none;
    cursor: pointer;
    background: lightgray;
    box-shadow: -160px 0px 0px 160px #367ebd;
  }

  input[type=range]::-moz-range-track {
    height: 20px;
    width: 100%;
    cursor: pointer;
    background: #fff;
    border-radius: 2px;
    border: 0px solid gray;
  }

  input[type=range]::-moz-range-progress {
    background-color: #367ebd;
    height: 20px;
  }

  input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 18px;
    width: 18px;
    border-radius: 0px;
    background: lightgray;
    cursor: pointer;
  }

  input[type=range]::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }

  input[type=range]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }

  input[type=range]:focus::-ms-fill-lower {
    background: #3071a9;
  }

  input[type=range]:focus::-ms-fill-upper {
    background: #367ebd;
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

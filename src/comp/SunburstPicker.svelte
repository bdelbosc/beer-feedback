<svelte:head>
  <script src="/plotly-latest.min.js" type="text/javascript" on:load={plotlyLoaded}></script>
</svelte:head>


<script>
  import {onMount} from 'svelte';
  import SvgIcon from "./SvgIcon.svelte";
  import {checkmarkIcon, editIcon} from '../js/AppIcons'

  export let value = '';
  let selected = '';
  let mounted = false;
  export let plotId = 'plotDiv';
  export let data = [];
  export let layout = {};

  onMount(async () => {
    mounted = true;
  });

  function plotlyLoaded() {
    let plotDiv = document.getElementById(plotId);
    Plotly.newPlot(plotDiv, data, layout, {displayModeBar: false});
    plotDiv.on('plotly_sunburstclick', function (data) {
      selected = data["points"][0]["currentPath"] + data["points"][0]["label"];
    });
    console.debug(plotDiv.data);
  }

  function validate() {
    console.debug("validate");
    value = selected;
  }

  function edit() {
    console.debug("edit");
    selected = value;
    value = '';
  }

  $: {
    if (mounted) {
      if (value.length == 0) {
        document.getElementById(plotId + "Selected").hidden = true;
        document.getElementById(plotId + "Edit").hidden = false;
        // TODO here we want to reset the plot or select the root element
        let plotDiv = document.getElementById(plotId);
        if (plotDiv.data !== undefined) {
          console.debug("REDRAW");
          data[0].level = '';
          Plotly.redraw(plotDiv, data, layout, {displayModeBar: false});
        }
      } else {
        document.getElementById(plotId + "Selected").hidden = false;
        document.getElementById(plotId + "Edit").hidden = true;
      }
    }
  }

</script>
<style>
  input {
    width: 270px;
  }
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

</style>
<div id="{plotId}Edit">
  <div>
    <input bind:value="{selected}"/>
    <button on:click={validate} disabled={selected.length == 0}>
      <SvgIcon d={checkmarkIcon} fill="green" />
    </button>
  </div>
  <div id="{plotId}"><!-- Plotly chart will be drawn inside this DIV --></div>
  <slot/>
</div>
<div id="{plotId}Selected">
  <span contenteditable="false" bind:innerHTML={value}/>
  <button on:click={edit}>
    <SvgIcon d={editIcon}/>
  </button>
</div>


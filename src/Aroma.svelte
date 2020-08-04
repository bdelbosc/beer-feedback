<script>
  import aromaData from './aroma-data.json';
  import aromaLayout from './aroma-layout.json';
  import SunburstPicker from './SunburstPicker.svelte';
  import Level from './Level.svelte';
  import AromaProperties from './AromaProperties.svelte';
  import {onMount} from 'svelte';
  import SvgIcon from "./SvgIcon.svelte";
  import {
    hopsIcon,
    maltIcon,
    fermentationIcon,
    moreIcon,
    trashIcon,
    cancelIcon,
    addIcon,
    alertIcon,
    warmsIcon,
    initialIcon,
    editIcon,
    checkmarkIcon,
  } from './AppIcons'

  export let aroma;
  let currentAroma = '';
  let inappropriate = false;
  let initial = false;
  let warms = false;
  let level = 3;
  let selecting = true;
  let editEntry = -1;

  onMount(async () => {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
  });

  function picker() {
    currentAroma = '';
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function cancel() {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    editEntry = -1;
  }

  function edit(index) {
    currentAroma = 'Aroma/' + aroma.aromas[index].category + "/" + aroma.aromas[index].trait;
    initial = aroma.aromas[index].initial;
    inappropriate = aroma.aromas[index].inappropriate;
    warms = aroma.aromas[index].warms;
    level = aroma.aromas[index].level;
    editEntry = index;
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function add() {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    const boom = currentAroma.split('/');
    const category = boom[1].toLocaleLowerCase();
    let description = boom[2];
    for (let i = 3; i < boom.length; i++) {
      description += "/";
      description += boom[i];
    }
    if (editEntry >= 0) {
      aroma.aromas[editEntry] = {
        level: level,
        category: category,
        trait: description,
        initial: initial,
        warms: warms,
        inappropriate: inappropriate
      };
      editEntry = -1;
    } else {
      aroma.aromas.push({
        level: level,
        category: category,
        trait: description,
        initial: initial,
        warms: warms,
        inappropriate: inappropriate
      });
      aroma = aroma
    }
    initial = false;
    warms = false;
    inappropriate = false;
    aroma.updateHandler(true);
  }

  function clear(index) {
    aroma.aromas.splice(index, 1);
    aroma = aroma;
    aroma.updateHandler();
  }

  $: selecting = currentAroma.length > 0;

</script>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  div.inputRow {
    display: flex;
    flex-direction: row;
  }

  .remove {
    float: right;
    clear: both;
  }

  .remove:hover {
    background-color: #f44336;
    color: white;
  }

  button.cancel {
    float: right;
  }

  .buttons, .item {
    clear: both;
  }

</style>
<div id="picker">
  <SunburstPicker bind:value={currentAroma} data={aromaData} layout={aromaLayout} plotId="aromaPicker">
    <button class="cancel" on:click={() => cancel()}>
      <SvgIcon d={cancelIcon} size="2em" fill="gray"/>
    </button>
  </SunburstPicker>
  {#if selecting}
    <div>
      Intensity:
      <Level edit=true bind:value={level}/>
    </div>

    <div class="inputRow">
      <input type="checkbox" id="inappropriate" bind:checked={inappropriate}/>
      <label for="inappropriate">
        <SvgIcon d={alertIcon} fill="orange"/>
        Inappropriate</label>
    </div>

    <div class="inputRow">
      <input type="checkbox" id="initial" bind:checked={initial}/>
      <label for="initial">
        <SvgIcon d={initialIcon}/>
        Initial aroma</label>
    </div>

    <div class="inputRow">
      <input type="checkbox" id="warms" bind:checked={warms}/>
      <label for="warms">
        <SvgIcon d={warmsIcon}/>
        When the beer warms</label>
    </div>

    <button on:click={() => add()}>
      <SvgIcon d={checkmarkIcon} fill="green" size="2em"/>
    </button>
    <button class="cancel" on:click={() => cancel()}>
      <SvgIcon d={cancelIcon} size="2em" fill="gray"/>
    </button>
  {/if}
</div>

<div id="list">
  {#each aroma.aromas as item, i}
    <div class="item">
      <button class="remove" on:click={() => clear(i)}><span title="Delete"><SvgIcon d={trashIcon} size="0.8em"/></span>
      </button>
      {#if item.category === 'hops'}
        <span title="Hops"><SvgIcon d={hopsIcon} size="1em" boxSize=510 fill="darkolivegreen"/></span>
      {:else if item.category === 'malt'}
        <span title="Malt"><SvgIcon d={maltIcon} size="1em" boxSize=225 fill="orange"/></span>
      {:else if item.category === 'fermentation'}
        <span title="Fermentation"><SvgIcon d={fermentationIcon} size="1em" boxSize=225 fill="chocolate"/></span>
      {:else if item.category === 'flaws'}
        <span title="Flaws"><SvgIcon d={alertIcon} size="1em" fill="darkorange"/></span>
      {:else}
        <span title="Others"><SvgIcon d={moreIcon} size="1em" boxSize=32 fill="darkgray"/></span>
      {/if}
      <Level value={item.level}/>
      <span on:click={() => edit(i)}>{item.trait}</span>
      <AromaProperties inappropriate={item.inappropriate} initial={item.initial} warms={item.warms}/>
    </div>
  {/each}
  <div class="buttons">
    <button on:click={picker}>
      <span title="Add new Aroma"><SvgIcon d={addIcon} size="2em" fill="blue"/></span>
    </button>
  </div>

</div>


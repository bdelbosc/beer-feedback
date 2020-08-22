<script>
  import aromaData from './data/aroma-data.json';
  import aromaLayout from './data/aroma-layout.json';
  import SunburstPicker from './comp/SunburstPicker.svelte';
  import Level from './comp/Level.svelte';
  import AromaProperties from './comp/AromaProperties.svelte';
  import {onMount} from 'svelte';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {
    hopsIcon,
    maltIcon,
    fermentationIcon,
    moreIcon,
    trashIcon,
    addIcon,
    alertIcon,
    warmsIcon,
    initialIcon,
    editIcon,
    checkmarkIcon,
  } from './js/AppIcons'
  import Score from "./comp/Score.svelte";

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

  function updateHandler() {
    aroma.updateHandler();
  }

  $: selecting = currentAroma.length > 0;

</script>
<style>

  .buttons, .item {
    clear: both;
  }
</style>
<div id="picker">
  <SunburstPicker bind:value={currentAroma} data={aromaData} layout={aromaLayout} plotId="aromaPicker"/>
  {#if selecting}
    <div class="inputRow">
      <label>
        <input type="checkbox" bind:checked={inappropriate}/>
        <SvgIcon d={alertIcon} fill="orange"/>
        Inappropriate
      </label>
    </div>

    <div class="inputRow">
      <label>
        <input type="checkbox" bind:checked={initial}/>
        <SvgIcon d={initialIcon}/>
        Initial aroma
      </label>
    </div>

    <div class="inputRow">
      <label>
        <input type="checkbox" bind:checked={warms}/>
        <SvgIcon d={warmsIcon}/>
        When the beer warms
      </label>
    </div>

    <div>
      Intensity:
      <Level edit=true bind:value={level}/>
    </div>

    <button on:click={() => add()}>
      <SvgIcon d={checkmarkIcon} fill="green" size="2em"/>
    </button>
  {/if}
</div>

<div id="list">
  {#each aroma.aromas as item, i}
    <div class="item">
      <button class="delete" on:click={() => clear(i)}><span title="Delete"><SvgIcon d={trashIcon} size="0.8em"/></span>
      </button>
      {#if item.category === 'hops'}
        <span title="Hops"><SvgIcon d={hopsIcon} size="1em" boxSize=510 fill="darkolivegreen"/></span>
      {:else if item.category === 'malt'}
        <span title="Malt"><SvgIcon d={maltIcon} size="1em" boxSize=225 fill="orange"/></span>
      {:else if item.category === 'fermentation'}
        <span title="Fermentation"><SvgIcon d={fermentationIcon} size="1em" boxSize=225 fill="chocolate"/></span>
      {:else if item.category === 'flaws'}
        <span title="Flaws"><SvgIcon d={alertIcon} size="1em" fill="OrangeRed"/></span>
      {:else}
        <span title="Others"><SvgIcon d={moreIcon} size="1em" boxSize=32 fill="LightBlue"/></span>
      {/if}
      <Level value={item.level}/>
      <span on:click={() => edit(i)}>{item.trait}</span>
      <AromaProperties inappropriate={item.inappropriate} initial={item.initial} warms={item.warms}/>
    </div>
  {/each}
  <div class="buttons">
    <button on:click={picker}>
      <span class="buttonText" title="Add new Aroma">
        <SvgIcon d={addIcon} size="2em" fill="blue"/><br>
        Add aromatic
      </span>
    </button>
  </div>

  <div>
    <span class="longLabel">Additional Comment</span>
    <textarea on:change={updateHandler} type=text bind:value={aroma.comment}/>
  </div>

  <div>
    <Score on:change={updateHandler} bind:value={aroma.score} max="12" min="4">Score</Score>
  </div>
</div>

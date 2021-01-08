<script>
  import flavorData from './data/flavor-data.json';
  import flavorLayout from './data/flavor-layout.json';
  import SunburstPicker from './comp/SunburstPicker.svelte';
  import Level from './comp/Level.svelte';
  import AromaProperties from './comp/AromaProperties.svelte';
  import {onMount} from 'svelte';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {BALANCE_OPTIONS, BITTERNESS_OPTIONS, DRYNESS_OPTIONS} from './js/Flavor';
  import {
    hopsIcon,
    maltIcon,
    fermentationIcon,
    moreIcon,
    trashIcon,
    addIcon,
    alertIcon,
    aftertasteIcon,
    editIcon,
    checkmarkIcon,
    nextIcon
  } from './js/AppIcons'
  import Score from "./comp/Score.svelte";

  export let flavor;

  let currentFlavor = '';
  let inappropriate = false;
  let aftertaste = false;
  let level = 3;
  let selecting = true;
  let editEntry = -1;

  let mounted = false;

  onMount(async () => {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    mounted = true;
  });

  function picker() {
    currentFlavor = '';
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function edit(index) {
    currentFlavor = 'Aroma/' + flavor.flavors[index].category + "/" + flavor.flavors[index].trait;
    inappropriate = flavor.flavors[index].inappropriate;
    aftertaste = flavor.flavors[index].aftertaste;
    level = flavor.flavors[index].level;
    editEntry = index;
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function add() {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    var boom = currentFlavor.split('/');
    var category = boom[1].toLocaleLowerCase();
    var aroma = boom[2];
    for (var i = 3; i < boom.length; i++) {
      aroma += "/";
      aroma += boom[i];
    }
    if (editEntry >= 0) {
      flavor.flavors[editEntry] = {
        level: level,
        category: category,
        trait: aroma,
        inappropriate: inappropriate,
        aftertaste: aftertaste
      };
      editEntry = -1;
    } else {
      flavor.flavors.push({
        level: level,
        category: category,
        trait: aroma,
        inappropriate: inappropriate,
        aftertaste: aftertaste
      });
      flavor = flavor;
    }
    // aromas = aromas;
    inappropriate = false;
    aftertaste = false;
    flavor.updateHandler(true);
  }

  function clear(index) {
    flavor.flavors.splice(index, 1);
    flavor = flavor;
    flavor.updateHandler();
  }

  function updateHandler() {
    flavor.updateHandler()
  }

  $: selecting = currentFlavor.length > 0;

</script>
<style>
  .buttons, .item {
    clear: both;
  }
</style>
<div id="picker">
  <SunburstPicker bind:value={currentFlavor} data={flavorData} layout={flavorLayout} plotId="flavorPicker"/>
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
        <input type="checkbox" bind:checked={aftertaste}/>
        <SvgIcon d={aftertasteIcon} fill="orange"/>
        Aftertaste
      </label>
    </div>

    <div>
      Intensity:
      <Level edit=true bind:value={level}/>
    </div>

    <button class="validation" on:click={() => add()}>
      <SvgIcon d={checkmarkIcon} fill="green" size="2em"/>
    </button>
  {/if}
</div>

<div id="list">
  {#each flavor.flavors as item, i}
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
      <AromaProperties inappropriate={item.inappropriate} aftertaste={item.aftertaste}/>
    </div>
  {/each}

  <div class="buttons">
    <button class="validation" on:click={picker}>
      <span class="buttonText" title="Add new Flavor"><SvgIcon d={addIcon} size="2em" fill="blue"/><br>Add flavor</span>
    </button>
  </div>

  <div class="break">
    <SelectCheck on:change={updateHandler} bind:value={flavor.bitterness} options={BITTERNESS_OPTIONS}
                 bind:checked={flavor.bitternessInappropriate}>
      Bitterness
    </SelectCheck>
  </div>

  <div>
    <SelectCheck on:change={updateHandler} bind:value={flavor.balance} options={BALANCE_OPTIONS}
                 bind:checked={flavor.balanceInappropriate}>
      Balance
    </SelectCheck>
  </div>

  <div>
    <SelectCheck on:change={updateHandler} bind:value={flavor.finish} options={DRYNESS_OPTIONS}
                 bind:checked={flavor.finishInappropriate}>
      Finish
    </SelectCheck>
  </div>

  <div>
    <span class="longLabel" title="Pleasure; Expected/surprising for style, comparing to aromas; Works together?; Backbone">Additional Comment</span>
    <textarea on:change={updateHandler} type=text bind:value={flavor.comment}/>
  </div>

  <div>
    <Score on:change={updateHandler} bind:value={flavor.score} max="20" min="5">Score</Score>
  </div>
</div>

<script>
  import flavorData from './flavor-data.json';
  import flavorLayout from './flavor-layout.json';
  import SunburstPicker from './SunburstPicker.svelte';
  import Level from './Level.svelte';
  import AromaProperties from './AromaProperties.svelte';
  import {onMount} from 'svelte';
  import SvgIcon from "./SvgIcon.svelte";
  import SelectCheck from "./SelectCheck.svelte";
  import {BALANCE_OPTIONS, BITTERNESS_OPTIONS, DRYNESS_OPTIONS} from './js/Flavor';
  import {
    hopsIcon,
    maltIcon,
    fermentationIcon,
    moreIcon,
    trashIcon,
    cancelIcon,
    addIcon,
    alertIcon,
    aftertasteIcon,
    editIcon,
    checkmarkIcon,
    nextIcon
  } from './AppIcons'

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

  function cancel() {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    editEntry = -1;
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
  <SunburstPicker bind:value={currentFlavor} data={flavorData} layout={flavorLayout} plotId="flavorPicker">
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
      <input type="checkbox" id="aftertaste" bind:checked={aftertaste}/>
      <label for="aftertaste">
        <SvgIcon d={aftertasteIcon} fill="orange"/>
        Aftertaste</label>
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
  {#each flavor.flavors as item, i}
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
      <AromaProperties inappropriate={item.inappropriate} aftertaste={item.aftertaste}/>
    </div>
  {/each}

  <div class="buttons">
    <button on:click={picker}>
      <span title="Add new Flavor"><SvgIcon d={addIcon} size="2em" fill="blue"/></span>
    </button>
  </div>

  <div>
    <SelectCheck on:change={updateHandler} bind:value={flavor.bitterness} options={BITTERNESS_OPTIONS}
                 bind:checked={flavor.bitternessInappropriate}>
      Bitterness
      <span slot="checkbox">Inappropriate</span>
    </SelectCheck>
  </div>


  <div>
    <SelectCheck on:change={updateHandler} bind:value={flavor.balance} options={BALANCE_OPTIONS}
                 bind:checked={flavor.balanceInappropriate}>
      Balance
      <span slot="checkbox">Inappropriate</span>
    </SelectCheck>
  </div>

  <div>
    <SelectCheck on:change={updateHandler} bind:value={flavor.finish} options={DRYNESS_OPTIONS}
                 bind:checked={flavor.finishInappropriate}>
      Finish
      <span slot="checkbox">Inappropriate</span>
    </SelectCheck>
  </div>

</div>


<script>
  import flavorData from './flavor-data.json';
  import flavorLayout from './flavor-layout.json';
  import SunburstPicker from './SunburstPicker.svelte';
  import Level from './Level.svelte';
  import AromaProperties from './AromaProperties.svelte';
  import {onMount} from 'svelte';
  import SvgIcon from "./SvgIcon.svelte";
  import SelectCheck from "./SelectCheck.svelte";

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

  export let flavors = undefined;
  let currentFlavor = '';
  let inappropriate = false;
  let aftertaste = false;
  let level = 3;
  let selecting = true;
  let editEntry = -1;
  let comment = '';

  const bitterness = [
    {id: undefined, text: ''},
    {id: 0, text: 'None'},
    {id: 1, text: `Low`},
    {id: 2, text: 'Medium Low'},
    {id: 3, text: 'Medium'},
    {id: 4, text: 'Medium-High'},
    {id: 5, text: 'High'}
  ];

  const balances = [
    {id: undefined, text: ''},
    {id: 'malty', text: `Malty`},
    {id: 'slightly-malt', text: `Slightly Malty`},
    {id: 'even', text: `Even`},
    {id: 'slightly-hoppy', text: `Slightly Hoppy`},
    {id: 'hoppy', text: `Hoppy`},
    {id: 'sligthly-sour', text: `Slightly Sour`},
    {id: 'sour', text: `Sour`}
  ];

  const dryness = [
    {id: undefined, text: ''},
    {id: 0, text: `Bone Dry`},
    {id: 1, text: `Dry`},
    {id: 2, text: `Balanced`},
    {id: 3, text: `Somewhat sweet`},
    {id: 4, text: `Sweet`},
    {id: 5, text: `Cloying`},
  ];


  onMount(async () => {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    computeComment(flavors['flavors']);
  });

  function getCategoryRank(category) {
    if (category === "malt") return 100;
    if (category === "hops") return 90;
    if (category === "fermentation") return 80;
    if (category === "others") return 70;
    if (category === "flaws") return 50;
    return 10;
  }

  function compare(a, b) {
    const aa = getCategoryRank(a.category) + a.level;
    const bb = getCategoryRank(b.category) + b.level;
    if (bb > aa) return 1;
    if (aa > bb) return -1;
    return 0;
  }

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
    currentFlavor = 'Aroma/' + flavors['flavors'][index].category + "/" + flavors['flavors'][index].trait;
    inappropriate = flavors['flavors'][index].inappropriate;
    aftertaste = flavors['flavors'][index].aftertaste;
    level = flavors['flavors'][index].level;
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
      flavors['flavors'][editEntry] = {
        level: level,
        category: category,
        trait: aroma,
        inappropriate: inappropriate,
        aftertaste: aftertaste
      };
      editEntry = -1;
    } else {
      flavors['flavors'].push({
        level: level,
        category: category,
        trait: aroma,
        inappropriate: inappropriate,
        aftertaste: aftertaste
      });
      flavors = flavors;
    }
    flavors['flavors'].sort(compare);
    // aromas = aromas;
    inappropriate = false;
    aftertaste = false;
  }

  function clear(index) {
    flavors['flavors'].splice(index, 1);
    flavors = flavors;
  }

  function computeComment(flavorList) {
    var categories = [];
    for (var i = 0; i < flavorList.length; i++) {
      if (!categories.includes((flavorList[i].category))) {
        categories.push(flavorList[i].category);
      }
    }
    var text = '';
    if (!categories.includes("malt")) {
      text += 'malt';
    }
    if (!categories.includes("hops")) {
      if (text) {
        text += ', ';
      }
      text += "hops";
    }
    if (!categories.includes("fermentation")) {
      if (text) {
        text += ', ';
      }
      text += 'fermentation';
    }
    if (text) {
      return "Please, add " + text + " and others aromatics";
    }
    return "ok";
  }

  $: selecting = currentFlavor.length > 0;

  $: comment = computeComment(flavors['flavors']);

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

  .comment {
    clear: both;
    font-style: italic;
    color: orangered;
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
  {#each flavors['flavors'] as item, i}
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
  {#if comment !== "ok"}
    <div class="comment">{comment}</div>
  {/if}


  <div class="buttons">
    <button on:click={picker}>
      <span title="Add new Flavor"><SvgIcon d={addIcon} size="2em" fill="blue"/></span>
    </button>
  </div>

  <div>
    <SelectCheck bind:value={flavors['bitterness']['value']} options={bitterness}
                 bind:checked={flavors['bitterness']['inappropriate']}>
      Bitterness
      <span slot="checkbox">Inappropriate</span>
    </SelectCheck>
  </div>


  <div>
    <SelectCheck bind:value={flavors['balance']['value']} options={balances}
                 bind:checked={flavors['balance']['inappropriate']}>
      Balance
      <span slot="checkbox">Inappropriate</span>
    </SelectCheck>
  </div>

  <div>
    <SelectCheck bind:value={flavors['finish']['value']} options={dryness}
                 bind:checked={flavors['finish']['inappropriate']}>
      Finish
      <span slot="checkbox">Inappropriate</span>
    </SelectCheck>
  </div>

</div>


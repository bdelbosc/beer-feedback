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
    nextIcon
  } from './AppIcons'

  let aromas = [
    {
      "trait": "Chocolat",
      "category": "malt",
      "inappropriate": true,
      "level": 3,
      "initial": true,
      "warms": false
    },
    {
      "trait": "Framboise",
      "category": "hops",
      "inappropriate": false,
      "level": 5,
      "initial": false,
      "warms": true
    },
    {
      "trait": "Esters/Pear",
      "category": "fermentation",
      "level": 2
    },
    {
      "trait": "A long description",
      "category": "others",
      "level": 0
    },
    {
      "trait": "Oxydation/Cherry",
      "category": "flaws",
      "level": 1
    }
  ];
  let currentAroma = '';
  let inappropriate = false;
  let initial = false;
  let warms = false;
  let level = 3;
  let selecting = true;
  let editEntry = -1;
  let comment = '';

  onMount(async () => {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    computeComment(aromas);
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
    currentAroma = 'Aroma/' + aromas[index].category + "/" + aromas[index].trait;
    initial = aromas[index].initial;
    inappropriate = aromas[index].inappropriate;
    warms = aromas[index].warms;
    level = aromas[index].level;
    editEntry = index;
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function add() {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    var boom = currentAroma.split('/');
    var category = boom[1].toLocaleLowerCase();
    var aroma = boom[2];
    for (var i = 3; i < boom.length; i++) {
      aroma += "/";
      aroma += boom[i];
    }
    if (editEntry >= 0) {
      aromas[editEntry] = {
        level: level,
        category: category,
        trait: aroma,
        initial: initial,
        warms: warms,
        inappropriate: inappropriate
      };
      editEntry = -1;
    } else {
      aromas = aromas.concat({
        level: level,
        category: category,
        trait: aroma,
        initial: initial,
        warms: warms,
        inappropriate: inappropriate
      });
    }
    aromas.sort(compare);
    aromas = aromas;
    initial = false;
    warms = false;
    inappropriate = false;
  }

  function submit() {
    console.log(aromas);
  }

  function clear(index) {
    aromas.splice(index, 1);
    aromas = aromas;
  }

  function computeComment(aromaList) {
    var categories = [];
    for (var i = 0; i < aromaList.length; i++) {
      if (!categories.includes((aromaList[i].category))) {
        categories.push(aromaList[i].category);
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

  $: selecting = currentAroma.length > 0;

  $: comment = computeComment(aromas);
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
  {#each aromas as aroma, i}
    <div class="item">
      <button class="remove" on:click={() => clear(i)}><span title="Delete"><SvgIcon d={trashIcon} size="0.8em"/></span>
      </button>
      {#if aroma.category === 'hops'}
        <span title="Hops"><SvgIcon d={hopsIcon} size="1em" boxSize=510 fill="darkolivegreen"/></span>
      {:else if aroma.category === 'malt'}
        <span title="Malt"><SvgIcon d={maltIcon} size="1em" boxSize=225 fill="orange"/></span>
      {:else if aroma.category === 'fermentation'}
        <span title="Fermentation"><SvgIcon d={fermentationIcon} size="1em" boxSize=225 fill="chocolate"/></span>
      {:else if aroma.category === 'flaws'}
        <span title="Flaws"><SvgIcon d={alertIcon} size="1em" fill="darkorange"/></span>
      {:else}
        <span title="Others"><SvgIcon d={moreIcon} size="1em" boxSize=32 fill="darkgray"/></span>
      {/if}
      <Level value={aroma.level}/>
      <span on:click={() => edit(i)}>{aroma.trait}</span>
      <AromaProperties inappropriate={aroma.inappropriate} initial={aroma.initial} warms={aroma.warms}/>
    </div>
  {/each}
  {#if comment !== "ok"}
    <div class="comment">{comment}</div>
  {/if}
  <div class="buttons">
    <button on:click={picker}>
      <span title="Add new Aroma"><SvgIcon d={addIcon} size="2em" fill="blue"/></span>
    </button>
    <button on:click={submit} class="submit" disabled={comment !== "ok"}>
      <span title="Next Section"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
    </button>
  </div>
</div>


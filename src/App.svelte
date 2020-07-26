<script>
  import aromaData from './aroma-data.json';
  import aromaLayout from './aroma-layout.json';
  import SunburstPicker from './SunburstPicker.svelte';
  import Level from './Level.svelte';
  import AromaProperties from './AromaProperties.svelte';
  import {onMount} from 'svelte';

  let aromas = [
    {
      "trait": "Chocolat",
      "category": "malt",
      "inappropriate": true,
      "level": "medium",
      "initial": true,
      "warms": false
    },
    {
      "trait": "Framboise",
      "category": "hops",
      "inappropriate": false,
      "level": "high",
      "initial": false,
      "warms": true
    },
    {
      "trait": "A long description",
      "category": "others",
      "level": "none"
    }
  ];
  let currentAroma = '';
  let inappropriate = false;
  let initial = false;
  let warms = false;

  onMount(async () => {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
  });

  function getLevelRank(level) {
    if (level === 'none') return 0;
    if (level === 'low') return 1;
    if (level === 'medium-low') return 2;
    if (level === 'medium') return 3;
    if (level === 'medium-high') return 4;
    if (level === 'high') return 5;
    return 0;
  }

  function getCategoryRank(category) {
    if (category === "malt") return 100;
    if (category === "hops") return 90;
    if (category === "fermentation") return 80;
    if (category === "others") return 70;
    if (category === "flaws") return 50;
    return 10;
  }

  function compare(a, b) {
    const aa = getCategoryRank(a.category) + getLevelRank(a.level);
    const bb = getCategoryRank(b.category) + getLevelRank(b.level);
    if (bb > aa) return 1;
    if (aa > bb) return -1;
    return 0;
  }

  function picker() {
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function add(level) {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    var boom = currentAroma.split('/');
    var category = boom[1].toLocaleLowerCase();
    var aroma = boom[2];
    for (var i = 3; i < boom.length; i++) {
      aroma += "/";
      aroma += boom[i];
    }
    aromas = aromas.concat({
      level: level,
      category: category,
      trait: aroma,
      initial: initial,
      warms: warms,
      inappropriate: inappropriate
    });
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


</script>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  div.malt {
    background-color: bisque;
  }

  span.malt {
    background-color: bisque;
    background: url(/images/question.png);
    width: 3em;
  }

  div.hops {
    background-color: yellowgreen;
  }

  div.fermentation {
    background-color: lightslategray;
  }

  div.others {
    background-color: aquamarine;
  }

  div.inputRow {
    display: flex;
    flex-direction: row;
  }

  .remove:hover {
    background-color: #f44336;
    color: white;
  }

  .intensityButton {
    width: 3em;
  }

  .level {
    width: 2em;
  }
</style>
<h1>Aromas</h1>

<div id="picker">
  <SunburstPicker bind:value={currentAroma} data={aromaData} layout={aromaLayout} plotId="aromaPicker"/>

  <div class="inputRow">
    <input type="checkbox" id="initial" bind:checked={initial}/>
    <label for="initial">Initial aroma &#9684;</label>
  </div>

  <div class="inputRow">
    <input type="checkbox" id="warms" bind:checked={warms}/>
    <label for="warms">When the beer warms &#9685;</label>
  </div>

  <div class="inputRow">
    <input type="checkbox" id="inappropriate" bind:checked={inappropriate}/>
    <label for="inappropriate">Inappropriate &#9888;</label>
  </div>

  <div>
    <button class="intensityButton" on:click={() => add('none')}>
      <Level value='none'/>
    </button>
    <button class="intensityButton" on:click={() => add('low')}>
      <Level value='low'/>
    </button>
    <button class="intensityButton" on:click={() => add('medium-low')}>
      <Level value='medium-low'/>
    </button>
    <button class="intensityButton" on:click={() => add('medium')}>
      <Level value='medium'/>
    </button>
    <button class="intensityButton" on:click={() => add('medium-high')}>
      <Level value='medium-high'/>
    </button>
    <button class="intensityButton" on:click={() => add('high')}>
      <Level value='high'/>
    </button>
  </div>
</div>

<div id="list">
  {#each aromas as aroma, i}
    <div>
      <button class="remove" on:click={() => clear(i)}>&#8855;</button>
      <img src="/images/{aroma.category}.png" alt="{aroma.category}"/>
      <input
        placeholder="Pick aroma"
        bind:value={aroma.trait}
      >
      <button class="level">
        <Level value={aroma.level}/>
      </button>

      <AromaProperties inappropriate={aroma.inappropriate} initial={aroma.initial} warms={aroma.warms}/>
    </div>
  {/each}

  <button on:click={picker}>
    Add new Aroma
  </button>
  <button on:click={submit}>
    Submit
  </button>
</div>

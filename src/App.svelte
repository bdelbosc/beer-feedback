<script>
  let currentAroma = '';
  let aromas = [];

  import aromaData from './aroma-data.json';
  import aromaLayout from './aroma-layout.json';
  import SunburstPicker from './SunburstPicker.svelte';
  import Level from './Level.svelte';

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
    if (category === "esters") return 80;
    if (category === "others") return 70;
    if (category === "flaws") return 50;
    return 10;
  }

  function compare(a, b) {
    const aa = getCategoryRank(a.category) + getLevelRank(a.level);
    const bb = getCategoryRank(b.category) + getLevelRank(b.level);
    console.log(a);
    console.log(aa);
    console.log(b);
    console.log(bb);
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
    aromas = aromas.concat({level: level, category: category, trait: aroma});
    aromas.sort(compare);
    aromas = aromas;
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
  div.malt {
    background-color: bisque;

  }

  div.hops {
    background-color: yellowgreen;
  }

  div.esters {
    background-color: lightslategray;
  }

  div.others {
    background-color: aquamarine;
  }

  .close:hover {
    background-color: #f44336;
    color: white;
  }

  /*#picker {*/
  /*	display: none;*/
  /*}*/
</style>
<h1>Aromas</h1>

<div id="picker">
  <SunburstPicker bind:value={currentAroma} data={aromaData} layout={aromaLayout} plotId="aromaPicker"/>
  Intensity:
  <button on:click={() => add('none')}>
    <Level value='none'/>
  </button>
  <button on:click={() => add('low')}>
    <Level value='low'/>
  </button>
  <button on:click={() => add('medium-low')}>
    <Level value='medium-low'/>
  </button>
  <button on:click={() => add('medium')}>
    <Level value='medium'/>
  </button>
  <button on:click={() => add('medium-high')}>
    <Level value='medium-high'/>
  </button>
  <button on:click={() => add('high')}>
    <Level value='high'/>
  </button>
</div>

<div id="list">
  {#each aromas as aroma, i}
    <div class="{aroma.category}">
      <Level value={aroma.level}/>
      <input
        placeholder="Pick aroma"
        bind:value={aroma.trait}
      >
      <button on:click={() => clear(i)} class="close">&#128465;</button>
    </div>
  {/each}

  <button on:click={picker}>
    Add new Aroma
  </button>
  <button on:click={submit}>
    Submit
  </button>
</div>

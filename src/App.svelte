<script>
  let currentAroma = '';
  let aromas = [];

  import aromaData from './aroma-data.json';
  import aromaLayout from './aroma-layout.json';
  import SunburstPicker from './SunburstPicker.svelte';

  function picker() {
    document.getElementById('picker').hidden = false;
    document.getElementById('list').hidden = true;
  }

  function add(level) {
    document.getElementById('picker').hidden = true;
    document.getElementById('list').hidden = false;
    aromas = aromas.concat({level: level, trait: currentAroma});
    aromas = aromas;
  }

  function submit() {
    console.log(aromas);
  }

  function clear() {
    aromas = aromas.filter(t => !t.done);
  }


</script>
<style>
  /*#picker {*/
  /*	display: none;*/
  /*}*/
</style>
<h1>Aromas</h1>

<div id="picker">
  <SunburstPicker bind:value={currentAroma} data={aromaData} layout={aromaLayout} plotId="aromaPicker"/>

  <button on:click={() => add('none')}>
    None
  </button>
  <button on:click={() => add('low')}>
    Low
  </button>
  <button on:click={() => add('medium-low')}>
    Med Low
  </button>
  <button on:click={() => add('medium')}>
    Medium
  </button>
  <button on:click={() => add('medium-high')}>
    Med High
  </button>
  <button on:click={() => add('high')}>
    High
  </button>
</div>

<div id="list">
  {#each aromas as aroma}
    <div>
      <input
        type=checkbox
        bind:checked={aroma.done}
      >

      <select bind:value={aroma.level}>
        <option value="none">None</option>
        <option value="low">Low</option>
        <option value="medium-low">Medium low</option>
        <option value="medium">Medium</option>
        <option value="medium-high">Medium high</option>
        <option value="high">High</option>
      </select>

      <input
        placeholder="Pick aroma"
        bind:value={aroma.trait}
      >

    </div>
  {/each}

  <button on:click={picker}>
    Peak new Aroma
  </button>
  <button on:click={clear}>
    Delete selected
  </button>
  <button on:click={submit}>
    Submit
  </button>
</div>

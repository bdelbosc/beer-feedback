<script>

  import SelectCheck from "./comp/SelectCheck.svelte";
  import {
    CATEGORY_OPTIONS
  } from './js/Beer';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {beerIcon, trashIcon} from "./js/AppIcons";
  import {parsePDF} from "./js/PdfRenderer";

  export let beer;
  export let aroma;
  export let flavor;
  export let appearance;
  export let mouthfeel;
  export let overall;

  function updateHandler() {
    beer.updateHandler();
  }

  function onFileLoad(elementId, event) {
    document.getElementById(elementId).innerText = event.target.result;
  }

  function resetData() {
    beer.flush();
    beer = beer;
    aroma.flush();
    appearance.flush();
    flavor.flush();
    mouthfeel.flush();
    overall.flush();
  }

  function uploadData(json) {
    beer.load(json.beer);
    aroma.load(json.aroma);
    appearance.load(json.appearance);
    flavor.load(json.flavor);
    mouthfeel.load(json.mouthfeel);
    overall.load(json.overall);
  }

  function onChooseFile(event) {
    if (typeof window.FileReader !== 'function')
      throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
      throw ("The browser does not properly implement the event object");
    if (!input.files)
      throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
      return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = function (e) {
      parsePDF(e.target.result, uploadData);
    };
    fr.readAsText(file);
  }

</script>

<style>
  span.label {
    float: left;
    width: 100px;
  }

  input[type=text] {
    width: 10em;
  }

  .reset {
    float: right;
    clear: both;
  }

  .reset:hover {
    background-color: #f44336;
    color: white;
  }

  div.upload {
    margin-top: 3em;
  }
</style>
<h3>
  <SvgIcon d={beerIcon} boxSize="2206" fill="orange"/>
  Which beer deserves feedback?
</h3>

<div>
  <span class="label">Entry #</span>
  <input on:change={updateHandler} type=text bind:value={beer.entry}/>
</div>

<div>
  <SelectCheck on:change={updateHandler} bind:value={beer.category} options={CATEGORY_OPTIONS} noCheck="true">
    Category
  </SelectCheck>
</div>

<div>
  <span class="label">Special Ingredients</span>
  <input on:change={updateHandler} type=text bind:value={beer.special}/>
</div>

<div>
  <span class="label">Comment</span>
  <input on:change={updateHandler} type=text bind:value={beer.comment}/>
</div>

<div>
  <slot/>
  <button class="reset" on:click={() => resetData()}>
    <span title="Reset"><SvgIcon d={trashIcon} size="0.8em"/></span>
  </button>
</div>
<div class="upload">
  <label for="upload">You can also upload an existing Scoresheet</label>
  <input id='upload' type='file' accept="application/pdf" on:change={() => onChooseFile(event)}/>
</div>


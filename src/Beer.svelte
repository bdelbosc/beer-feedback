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
    console.info("Resetting Beer and Scoresheet data");
    beer.flush();
    beer = beer;
    aroma.flush();
    appearance.flush();
    flavor.flush();
    mouthfeel.flush();
    overall.flush();
  }

  function uploadData(json) {
    console.info("Loading Beer and Scoresheet from json");
    beer.load(json.beer);
    aroma.load(json.aroma);
    appearance.load(json.appearance);
    flavor.load(json.flavor);
    mouthfeel.load(json.mouthfeel);
    overall.load(json.overall);
  }

  function onChooseFile(event) {
    try {
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
      console.info('Loading file ' + file.name);
      let fr = new FileReader();
      fr.onload = function (e) {
        try {
          parsePDF(e.target.result, uploadData);
        } catch (err) {
          alert(err);
        }
      };
      fr.readAsText(file);
    } catch (err) {
      alert(err.message);
    }
  }

  function shareLink() {
    let link = "http://beer-feedback.surge.sh/?"
    link += "beerEntry=" + encodeURIComponent(beer.entry)
    link += "&beerCategory=" + encodeURIComponent(beer.category)
    link += "&beerSpecial=" + encodeURIComponent(beer.special)
    link += "&beerComment=" + encodeURIComponent(beer.comment)
    console.info("Copying link: " + link);
    let input = document.getElementById("sharedLink");
    input.value = link;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

</script>

<style>
  div.upload {
    margin-top: 3em;
  }

  /*input.hidden {*/
  /*  visibility: hidden;*/
  /*}*/
</style>
<h3>
  <SvgIcon d={beerIcon} boxSize="512" fill="#700000"/>
  Which beer deserves feedback?
</h3>

<div>
  <SelectCheck on:change={updateHandler} bind:value={beer.category} options={CATEGORY_OPTIONS} noCheck="true">
    Category
  </SelectCheck>
</div>

<div>
  <span class="label">Entry #</span>
  <input type="text" class="fixedInput" on:change={updateHandler} bind:value={beer.entry}/>
</div>

<div>
  <span class="label">Special Ingredients</span>
  <input type="text" class="fixedInput" on:change={updateHandler} bind:value={beer.special}/>
</div>

<div>
  <span class="longLabel">Comment</span>
  <textarea on:change={updateHandler} type="text" bind:value={beer.comment}/>
</div>

<div>
  <slot/>
  <button class="delete" on:click={() => resetData()}>
    <span title="Reset"><SvgIcon d={trashIcon} size="0.8em"/></span>
  </button>
</div>
<div class="upload">
  <label>Or load an existing PDF Scoresheet
    <input id='upload' type='file' accept="application/pdf" on:change={() => onChooseFile(event)}/>
  </label>
</div>

<div>
  Share the link for this beer entry<br/>
  <input type="text" value="..." id="sharedLink">
  <button on:click={() => shareLink()}>Copy</button>
</div>

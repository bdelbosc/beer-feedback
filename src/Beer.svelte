<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {BeerDto, CATEGORY_OPTIONS} from './js/Beer';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {beerIcon, trashIcon} from "./js/AppIcons";
  import {parsePDF} from "./js/PdfRenderer";
  import Tabs from "./comp/Tabs.svelte";
  import {TextRenderer} from "./js/TextRenderer";
  import pkg from "../package.json";
  import {generatePdf} from "./js/PdfGenerator";
  import {UserDto} from "./js/User";
  import {AromaDto} from "./js/Aroma";
  import {AppearanceDto} from "./js/Appearance";
  import {MouthfeelDto} from "./js/Mouthfeel";
  import {OverallDto} from "./js/Overall";
  import {FlavorDto} from "./js/Flavor";
  import Datepicker from 'svelte-calendar';

  export let user;
  export let beer;
  export let aroma;
  export let flavor;
  export let appearance;
  export let mouthfeel;
  export let overall;
  export let totalScore;

  let tabItems = [
    {label: "Entry", shortLabel: "Entry", value: 1, comment: ''},
    {label: "Load", shortLabel: "Load", value: 2, comment: ''},
    {label: "Share", shortLabel: "Share", value: 3, comment: ''},
    {label: "...", shortLabel: "...", value: 4, comment: ''}
  ];
  let currentTab = 1;

  function updateHandler() {
    beer.updateHandler();
  }

  function onFileLoad(elementId, event) {
    document.getElementById(elementId).innerText = event.target.result;
  }

  function resetData(message) {
    if (confirm(message)) {
      console.info("Resetting Beer and Scoresheet data");
      beer.flush();
      beer = beer;
      aroma.flush();
      aroma = aroma;
      appearance.flush();
      appearance = appearance;
      flavor.flush();
      flavor = flavor;
      mouthfeel.flush();
      mouthfeel = mouthfeel;
      overall.flush();
      overall = overall;
      return true;
    }
    return false;
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
      currentTab = 1;
    } catch (err) {
      alert(err.message);
    }
  }

  function shareEntryLink() {
    let link = "https://beer-feedback.surge.sh/?";
    link += "beerEntry=" + encodeURIComponent(beer.entry);
    link += "&beerCategory=" + encodeURIComponent(beer.category);
    link += "&beerSpecial=" + encodeURIComponent(beer.special);
    link += "&beerComment=" + encodeURIComponent(beer.comment);
    console.info("Copying entry link: " + link);
    let input = document.getElementById("sharedEntryLink");
    input.value = link;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  function shareScoresheetLink() {
    let link = "https://beer-feedback.surge.sh/?"
    let json = JSON.stringify({
      'user': user,
      'beer': beer,
      'aroma': aroma,
      'appearance': appearance,
      'flavor': flavor,
      'mouthfeel': mouthfeel,
      'overall': overall,
      'score': totalScore,
      'version': pkg.version
    });
    link += "renderPdf=" + encodeURIComponent(json);
    console.info("Copying score link: " + link);
    let input = document.getElementById("sharedScoresheetLink");
    input.value = link;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  function exportText() {
    console.info("Generate Text Scoresheet");
    let renderer = new TextRenderer("BEER SCORESHEET", totalScore);
    renderScoresheet(renderer);
    let text = renderer.produce();
    console.info(text);
    let input = document.getElementById("exportText");
    input.value = text;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  function renderScoresheet(renderer) {
    user.render(renderer);
    beer.render(renderer);
    aroma.render(renderer);
    appearance.render(renderer);
    flavor.render(renderer);
    mouthfeel.render(renderer);
    overall.render(renderer, totalScore);
  }

  function checkShareLinkAndRedirect(theUser) {
    console.info("Check for shared link");
    if (beer.isFromSharedBeerEntry() && theUser.isCompleted()) {
      if (resetData("Make sure you have generated a PDF of your current Scoresheet before starting a new Beer Entry")) {
        beer.loadFromShareLink();
        aroma.save();
        appearance.save();
        flavor.save();
        mouthfeel.save();
        overall.save();
      }
      window.location.href = "/?tab=beer";
    } else if (beer.isFromSharedScoresheet()) {
      const params = new URLSearchParams(window.location.search);
      if (params.has("renderPdf")) {
        let json = JSON.parse(unescape(params.get("renderPdf")));
        let pdfJson = {};
        pdfJson.user = new UserDto();
        pdfJson.beer = new BeerDto();
        pdfJson.aroma = new AromaDto();
        pdfJson.appearance = new AppearanceDto();
        pdfJson.flavor = new FlavorDto();
        pdfJson.mouthfeel = new MouthfeelDto();
        pdfJson.overall = new OverallDto();

        pdfJson.user.load(json.user);
        pdfJson.beer.load(json.beer);
        pdfJson.aroma.load(json.aroma);
        pdfJson.appearance.load(json.appearance);
        pdfJson.flavor.load(json.flavor);
        pdfJson.mouthfeel.load(json.mouthfeel);
        pdfJson.overall.load(json.overall);
        pdfJson.score = json.score;
        generatePdf(pdfJson).then(() => {
            alert("You have a new Scoresheet in your Download folder!");
            window.location.href = "/"
          }
          , () => alert("PDF generation failure"));
      }
    }
  }

  $: checkShareLinkAndRedirect(user);

</script>
<style>
  button.reset {
    margin: 1em 0 1em 0;
    clear: both;
  }

  button.reset:hover {
    background-color: #f44336;
    color: white;
  }
</style>

<h3>
  <SvgIcon d={beerIcon} boxSize="512" fill="#700000"/>
  Which beer deserves feedback?
</h3>


<Tabs bind:activeTabValue={currentTab} items={tabItems}/>
{#if 1 === currentTab}
  <div>
    <SelectCheck bind:value={beer.category} options={CATEGORY_OPTIONS} noCheck="true" required="true">
      Category
    </SelectCheck>
  </div>

  <div>
    <span class="label required">Entry #</span>
    <input type="text" class="fixedInput" on:change={updateHandler} bind:value={beer.entry}/>
  </div>

  <div>
    <span class="label">Special Ingredients</span>
    <input type="text" class="fixedInput" on:change={updateHandler} bind:value={beer.special}/>
  </div>

  <div>
    <span class="label">Tasting date</span>
    <Datepicker bind:selected={beer._tastingDate} bind:dateChosen={beer.updated}>
      <button class="fixedInput">{beer.tastingDate}</button>
    </Datepicker>
  </div>

  <div>
    <span class="longLabel">Comment</span>
    <textarea on:change={updateHandler} type="text" bind:value={beer.comment}/>
  </div>

  <div>
    <slot/>
    <button class="reset" on:click={() => resetData("Clear Current Beer Entry and its Scoresheet?\nMake sure you have generated a PDF before")}>
      <span class="buttonText" title="Reset"><SvgIcon d={trashIcon} size="0.8em"/><br>New Beer Entry</span>
    </button>
  </div>

{:else if 2 === currentTab}
  <div class="upload">
    <label><p class="help">Load a PDF Scoresheet, note that the current Scoresheet will be lost</p>
      <input id='upload' type='file' accept="application/pdf" on:change={() => onChooseFile(event)}/>
    </label>
  </div>

{:else if 3 === currentTab}
  <div>
    <p class="help">Share this <b>Beer Entry</b> with other judges, copying the following link:</p>
    <input type="text" value="..." id="sharedEntryLink"/>
    <button disabled={!beer.isCompleted()} on:click={() => shareEntryLink()}>Copy</button>

    <p class="help">Share your <b>Scoresheet</b>, copying the following link:</p>
    <input type="text" value="..." id="sharedScoresheetLink"/>
    <button disabled={!beer.isCompleted()} on:click={() => shareScoresheetLink()}>Copy</button>
    <p class="help">Because the link contains the Scoresheet data it can be very long and may not work everywhere.</p>
  </div>
{:else if 4 === currentTab}
  <div>
    <p class="help">Generate a text Scoresheet</p>
    <textarea type="text" value="..." id="exportText"/>
    <button disabled={!beer.isCompleted()} on:click={() => exportText()}>Export as Text</button>
  </div>
{/if}

<svelte:head>
  <!--  <script src="/hnl.mobileConsole.1.3.js"></script>-->
</svelte:head>
<script>
  import {onMount} from "svelte";
  import Tabs from "./comp/Tabs.svelte";
  import User from './User.svelte';
  import Beer from './Beer.svelte';
  import Aroma from './Aroma.svelte';
  import Appearance from './Appearance.svelte';
  import Flavor from './Flavor.svelte';
  import Mouthfeel from './Mouthfeel.svelte';
  import Overall from './Overall.svelte';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {beerIcon, nextIcon, userIcon} from './js/AppIcons'

  import {AromaDto} from './js/Aroma';
  import {AppearanceDto} from './js/Appearance';
  import {FlavorDto} from './js/Flavor';
  import {MouthfeelDto} from './js/Mouthfeel';
  import {OverallDto} from './js/Overall';
  import {UserDto} from './js/User';
  import {BeerDto} from './js/Beer';
  import {PdfRenderer} from './js/PdfRenderer';
  import pkg from '../package.json'
  import Octocat from "./comp/Octocat.svelte";
  import {fade} from 'svelte/transition';
  import bjcpGuideline from './data/bjcp-guideline.json';
  import {TextRenderer} from "./js/TextRenderer";

  let visible = false;

  export const name = "Beer feedback";

  const user = new UserDto();
  const beer = new BeerDto();
  const aroma = new AromaDto();
  const appearance = new AppearanceDto();
  const flavor = new FlavorDto();
  const mouthfeel = new MouthfeelDto();
  const overall = new OverallDto();

  let mainComment;
  let totalScore;
  let start;
  let mytime;
  let elapsed = 0;
  let showPdf = false;

  function getComment(item, header = 'Comment on: ') {
    if (item.isCompleted()) {
      return '';
    }
    let required = item.getRequired();
    if (required.length == 1) return header + required + ".";
    if (required.length == 2) return header + required[0] + " and " + required[1] + ".";
    let last = required[required.length - 1];
    return header + required.join(', ').replace(last, 'and ' + last) + '.';
  }

  function computeScore() {
    let score = 0;
    if (aroma.score > 0) score += aroma.score;
    if (appearance.score > 0) score += appearance.score;
    if (flavor.score > 0) score += flavor.score;
    if (mouthfeel.score > 0) score += mouthfeel.score;
    if (overall.score > 0) score += overall.score;
    return score;
  }

  const interval = setInterval(() => {
    mytime = new Date();
    elapsed = Math.round((mytime - start) / 1000);
    let updated = false;
    let completed = true;
    if (user.isUpdated()) {
      user = user;
      mainComment = getComment(user, 'Missing: ');
      completed = completed && user.isCompleted();
      user.save();
    }
    if (beer.isUpdated()) {
      beer = beer;
      mainComment = getComment(beer, 'Missing: ');
      completed = completed && beer.isCompleted();
      start = new Date();
      beer.save();
    }
    if (start == undefined && beer.isCompleted()) start = new Date();
    if (aroma.isUpdated()) {
      tabItems[0].comment = getComment(aroma);
      completed = completed && aroma.isCompleted();
      updated = true;
      aroma.save();
    }
    if (appearance.isUpdated()) {
      tabItems[1].comment = getComment(appearance);
      completed = completed && appearance.isCompleted();
      updated = true;
      appearance.save();
    }
    if (flavor.isUpdated()) {
      tabItems[2].comment = getComment(flavor);
      completed = completed && flavor.isCompleted();
      updated = true;
      flavor.save();
    }
    if (mouthfeel.isUpdated()) {
      tabItems[3].comment = getComment(mouthfeel);
      completed = completed && mouthfeel.isCompleted();
      updated = true;
      mouthfeel.save();
    }
    if (overall.isUpdated()) {
      tabItems[4].comment = getComment(overall);
      completed = completed && overall.isCompleted();
      updated = true;
      overall.save();
    }
    if (updated) {
      tabItems = tabItems;
      totalScore = computeScore();
      if (completed) {
        console.debug("SHOW PDF");
        showPdf = true;
      } else {
        showPdf = false;
      }
    }
    // console.debug(appearance);
  }, 1500);


  let tabItems = [
    {label: "Aroma", shortLabel: "A", value: 1, comment: ''},
    {label: "Appearance", shortLabel: "A", value: 2, comment: ''},
    {label: "Flavors", shortLabel: "F", value: 3, comment: ''},
    {label: "Moothfeel", shortLabel: "M", value: 4, comment: ''},
    {label: "Overall", shortLabel: "O", value: 5, comment: ''}
  ];
  let currentTab = 1;

  function submit() {
    let json = JSON.stringify({
      'user': user,
      'beer': beer,
      'aroma': aroma,
      'appearance': appearance,
      'flavor': flavor,
      'mouthfeel': mouthfeel,
      'overall': overall,
      'start': start,
      'score': totalScore,
      'version': pkg.version
    });
    console.info("Generate PDF");
    console.info(json);
    let renderer = new PdfRenderer("BEER SCORESHEET", totalScore);
    renderer.addMetdata(pkg.version, user.name, beer.entry, beer.category, json);
    renderScoresheet(renderer);
    let name = 'scoresheet-' + start.toISOString().slice(0, 10).replace(/-/g, "");
    name += '-' + beer.entry.replace(/\W/g, '_');
    name += '-' + beer.category.replace(/\W/g, '_');
    name += '-' + user.name.replace(/\W/g, '_') + '.pdf';
    renderer.produce(name);
  }

  function renderText() {
    console.info("Generate Text Scoresheet");
    let renderer = new TextRenderer("BEER SCORESHEET", totalScore);
    renderScoresheet(renderer);
    let text = renderer.produce();
    console.info(text);

  }

  function renderScoresheet(renderer) {
    renderer.addVersion(pkg.version);
    user.render(renderer);
    beer.render(renderer);
    aroma.render(renderer);
    appearance.render(renderer);
    flavor.render(renderer);
    mouthfeel.render(renderer);
    overall.render(renderer, totalScore);
  }

  function beerEdit() {
    document.getElementById("evaluation").hidden = true;
    document.getElementById("user").hidden = true;
    document.getElementById("beer").hidden = false;
    document.getElementById("top").hidden = true;
  }

  function userEdit() {
    document.getElementById("evaluation").hidden = true;
    document.getElementById("user").hidden = false;
    document.getElementById("beer").hidden = true;
    document.getElementById("top").hidden = true;
  }

  function evaluationEdit() {
    aroma = aroma;
    currentTab = 1;
    document.getElementById("evaluation").hidden = false;
    document.getElementById("user").hidden = true;
    document.getElementById("beer").hidden = true;
    document.getElementById("top").hidden = false;
  }

  onMount(() => {
    if (!user.isCompleted()) userEdit();
    else if (!beer.isCompleted()) beerEdit();
    else evaluationEdit();

    window.onbeforeunload = function () {
      return "";
    }
  });
</script>


<style>
  /* ----------------------------------------
  ** Global App css
  **/
  :global(span.label) {
    vertical-align: middle;
    display: inline-block;
    width: 100px;
    color: #555;
  }

  :global(span.longLabel) {
    vertical-align: middle;
    display: inline-block;
    color: #555;
    width: 100%;
  }

  :global(textarea) {
      width: 100%;
      height: 150px;
  }

  :global(select.fixedInput) {
      width: 250px;
  }

  :global(input.fixedInput) {
      width: 250px;
  }

  :global(button.delete) {
    float: right;
    clear: both;
  }

  :global(button.delete:hover) {
    background-color: #f44336;
    color: white;
  }

  :global(button.validation) {
    float: right;
    clear: both;
    margin: 1em 0 1em 0;
  }

  :global(div.inputRow) {
    display: flex;
    flex-direction: row;
  }

  :global(p.help) {
    font-size: 1em;
    color: #666;
    font-style: italic;
    margin: 0.4em 0 0.4em 0;
  }

  :global(span.buttonText) {
    font-size: 1em;
    color: #666;
    font-style: italic;
    margin: 0.4em 0 0.4em 0;
  }

  /* ----------------------------------------
  ** Local
  **/
  div.main {
    max-width: 640px;
    margin: auto;
    clear: both;
  }

  div.top {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    margin-top: 0;
    clear: both;
  }

  .pdf {
    float: right;
    margin: 0 0 0 0;
    opacity: 0.5;
    clear: both;
  }

  .showPdf {
    float: right;
    margin: 0 0 0 0;
    opacity: 1;
    clear: both;
  }

  button.settings {
    border: 0px;
    background-color: #fff;
    color: #444;
    margin-bottom: 0;
  }

  .settings > span {
    font-size: 0.9em;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    overscroll-behavior-y: contain !important;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button {
    border: 1px solid #444;
    background-color: #eee;
    color: #444;
  }

  div.footLine {
    border-top: 1px solid #dee2e6;
    width: 100%;
    font-size: 0.6em;
    color: #999;
    clear: both;
  }

  div.statusLine {
    float: right;
    font-size: 0.8em;
    color: #666;
    font-style: italic;
    margin-bottom: 5px;
  }

  p.guideline {
    text-align: justify;
    text-justify: inter-word;
  }

  div.bjcpDisclamer {
    text-align: justify;
    text-justify: inter-word;
    font-size: 0.8em;
    color: #444;
  }

  div.bjcpGuideline {
    color: #999;
    padding-top: 2em;
    clear: both;
  }

  /* ----------------------------------------
  ** Small device override
  **/
  @media only screen and (max-width: 639px) {
      :global(textarea) {
          height: 100px;
      }

      :global(select.fixedInput) {
          width: 170px;
      }

      :global(input.fixedInput) {
          width: 170px;
      }

      div.main {
          max-width: 320px;
      }

      div.top {
          max-width: 320px;
      }

  }

</style>

<div class="top" id="top">
  <button class="settings" on:click={() => userEdit()}>
    <div title="Edit User">
      <SvgIcon d={userIcon} fill="blue" boxSize="20"/>{user.name}
    </div>
  </button>
  <button class="settings" on:click={() => beerEdit()}>
    <div title="Edit Beer">
      <SvgIcon d={beerIcon} boxSize="512" fill="#700000"/>
      #{beer.entry}
    </div>
  </button>
  <button on:click={() => submit()} class="pdf" class:showPdf={showPdf}>
    <span title="Export PDF">PDF</span>
  </button>
</div>

<div class="main">
  <div id="user">
    <User user={user}/>
    <button class="validation" on:click={() => beerEdit()} disabled={!user.isCompleted()}>
      <span title="Beer"><SvgIcon d={nextIcon} size="2em" fill="green"/><br>Beer</span>
    </button>
  </div>

  <div id="beer">
    <Beer beer={beer} user={user} aroma={aroma} appearance={appearance} flavor={flavor} mouthfeel={mouthfeel} overall={overall} totalScore={totalScore}>
      <button class="validation" on:click={() => evaluationEdit()} disabled={!beer.isCompleted()}>
        <span class="buttonText" title="Scoresheet"><SvgIcon d={nextIcon} size="2em" fill="green"/><br/>Go to Scoresheet</span>
      </button>
    </Beer>
  </div>

  <div id="evaluation">
    <div class="statusLine">{elapsed}s elapsed, score: {totalScore}</div>
    <Tabs bind:activeTabValue={currentTab} items={tabItems}/>
    {#if 1 === currentTab}
      {#if visible && beer.category}
        <p class="guideline" in:fade>
          {beer.category}: {bjcpGuideline[beer.category].aroma}
        </p>
      {:else}
        <div in:fade>
          <Aroma aroma={aroma}/>
        </div>
      {/if}
    {:else if 2 === currentTab}
      {#if visible && beer.category}
        <p class="guideline" in:fade>
          {beer.category}: {bjcpGuideline[beer.category].appearance}
        </p>
      {:else}
        <div in:fade>
          <Appearance appearance={appearance}/>
        </div>
      {/if}
    {:else if 3 === currentTab}
      {#if visible && beer.category}
        <p class="guideline" in:fade>
          {beer.category}: {bjcpGuideline[beer.category].flavor}
        </p>
      {:else}
        <div in:fade>
          <Flavor flavor={flavor}/>
        </div>
      {/if}
    {:else if 4 === currentTab}
      {#if visible && beer.category}
        <p class="guideline" in:fade>
          {beer.category}: {bjcpGuideline[beer.category].mouthfeel}
        </p>
      {:else}
        <div in:fade>
          <Mouthfeel mouthfeel={mouthfeel}/>
        </div>
      {/if}
    {:else if 5 === currentTab}
      {#if visible && beer.category}
        <p class="guideline" in:fade>
          {beer.category}: {bjcpGuideline[beer.category].overall}
        </p>
      {:else}
        <div in:fade>
          <Overall overall={overall} score={totalScore} aroma={aroma} flavor={flavor}/>
        </div>
      {/if}
    {/if}
    <div class="bjcpGuideline">
      <label>
        <input type="checkbox" bind:checked={visible}>
        View BJCP Guideline
      </label>
    </div>
    {#if visible}
      <div in:fade class="bjcpDisclamer">
        <p>
          This is an extract of the 2015 BJCP Style Guide used for personal educational purpose.
          The BJCP data or any derivative output are protected by the BJCP Copyright and should not
          be marketed for profit or integrated or embedded in websites without the BJCP agreement.
          The most current version of the BCJP Style Guide can be found on the
          <a href="https://www.bjcp.org/" rel="noopener" target="_blank">BJCP web site</a>.
        </p>
        <p>
          <a href="https://dev.bjcp.org/style/2015/{bjcpGuideline[beer.category].link}/" rel="noopener"
             target="_blank">View original BJCP {beer.category} description</a>.
        </p>
      </div>
    {/if}
  </div>
  <div class="footLine">{pkg.name} v{pkg.version}</div>
</div>

<Octocat/>

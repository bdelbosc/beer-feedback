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
  import {
    nextIcon, userIcon, beerIcon
  } from './js/AppIcons'

  import {AromaDto, renderAroma} from './js/Aroma';
  import {AppearanceDto, renderAppearance} from './js/Appearance';
  import {FlavorDto, renderFlavor} from './js/Flavor';
  import {MouthfeelDto, renderMouthfeel} from './js/Mouthfeel';
  import {OverallDto, renderOverall} from './js/Overall';
  import {UserDto, renderUser} from './js/User';
  import {BeerDto, renderBeer} from './js/Beer';
  import {PdfRenderer} from './js/PdfRenderer';
  import pkg from '../package.json'
  import Octocat from "./comp/Octocat.svelte";

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
    return header + item.getRequired().join(', ') + '.';
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
      console.debug("Aroma updated");
      console.debug(aroma);
    }
    if (appearance.isUpdated()) {
      tabItems[1].comment = getComment(appearance);
      completed = completed && appearance.isCompleted();
      updated = true;
      console.debug("Appearance updated");
      console.debug(appearance);
    }
    if (flavor.isUpdated()) {
      tabItems[2].comment = getComment(flavor);
      completed = completed && flavor.isCompleted();
      updated = true;
      console.debug("Flavor updated");
      console.debug(flavor);
    }
    if (mouthfeel.isUpdated()) {
      tabItems[3].comment = getComment(mouthfeel);
      completed = completed && mouthfeel.isCompleted();
      updated = true;
      console.debug("Mouthfeel updated");
      console.debug(mouthfeel);
    }
    if (overall.isUpdated()) {
      tabItems[4].comment = getComment(overall);
      completed = completed && overall.isCompleted();
      updated = true;
      console.debug("Overall updated");
      console.debug(overall);
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
    renderer.addVersion(pkg.version);
    renderUser(renderer, user, start);
    renderBeer(renderer, beer);
    renderAroma(renderer, aroma);
    renderAppearance(renderer, appearance);
    renderFlavor(renderer, flavor);
    renderMouthfeel(renderer, mouthfeel);
    renderOverall(renderer, overall, totalScore);
    let name = 'scoresheet-' + start.toISOString().slice(0, 10).replace(/-/g, "");
    name += '-' + beer.entry.replace(/\W/g, '_');
    name += '-' + beer.category.replace(/\W/g, '_');
    name += '-' + user.name.replace(/\W/g, '_') + '.pdf';
    renderer.produce(name);
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
  }

  :global(span.labelLong) {
    vertical-align: middle;
    display: inline-block;
    width: 100%;
  }

  :global(textarea) {
    width: 100%;
  }

  :global(select.fixedInput) {
    width: 170px;
  }

  :global(input.fixedInput) {
    width: 10em;
  }

  :global(button.delete) {
    float: right;
    clear: both;
  }

  :global(button.delete:hover) {
    background-color: #f44336;
    color: white;
  }

  :global(div.inputRow) {
    display: flex;
    flex-direction: row;
  }

  /* ----------------------------------------
  ** Local
  **/
  div.main {
    max-width: 320px;
    margin: auto;
    clear: both;
  }

  div.top {
    max-width: 320px;
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
  }

  div.statusLine {
    float: right;
    font-size: 0.8em;
    color: #666;
    font-style: italic;
    margin-bottom: 5px;
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
    <button on:click={() => beerEdit()} disabled={!user.isCompleted()}>
      <span title="Beer"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
    </button>
  </div>

  <div id="beer">
    <Beer beer={beer} aroma={aroma} appearance={appearance} flavor={flavor} mouthfeel={mouthfeel} overall={overall}>
      <button on:click={() => evaluationEdit()} disabled={!beer.isCompleted()}>
        <span title="Scoresheet"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
      </button>
    </Beer>
  </div>

  <div id="evaluation">
    <div class="statusLine">{elapsed}s elapsed, score: {totalScore}</div>
    <Tabs bind:activeTabValue={currentTab} items={tabItems}/>
    {#if 1 === currentTab}
      <Aroma aroma={aroma}/>
    {:else if 2 === currentTab}
      <Appearance appearance={appearance}/>
    {:else if 3 === currentTab}
      <Flavor flavor={flavor}/>
    {:else if 4 === currentTab}
      <Mouthfeel mouthfeel={mouthfeel}/>
    {:else if 5 === currentTab}
      <Overall overall={overall} score={totalScore}/>
    {/if}
  </div>
  <div class="footLine">{pkg.name} v{pkg.version}</div>
</div>

<Octocat/>

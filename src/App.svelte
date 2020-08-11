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

  export const name = "Beer feedback";

  let user = new UserDto();
  let beer = new BeerDto();
  let aroma = new AromaDto();
  let appearance = new AppearanceDto();
  let flavor = new FlavorDto();
  let mouthfeel = new MouthfeelDto();
  let overall = new OverallDto();

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
    let completed = false;
    if (user.isUpdated()) {
      user = user;
      mainComment = getComment(user, 'Missing: ');
      completed = user.isCompleted();
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
      console.log("Saving aromas");
      console.log(aroma);
    }
    if (appearance.isUpdated()) {
      tabItems[1].comment = getComment(appearance);
      completed = completed && appearance.isCompleted();
      updated = true;
      console.log("Saving appearance");
      console.log(appearance);
    }
    if (flavor.isUpdated()) {
      tabItems[2].comment = getComment(flavor);
      completed = completed && flavor.isCompleted();
      updated = true;
      console.log("Saving flavors");
      console.log(flavor);
    }
    if (mouthfeel.isUpdated()) {
      tabItems[3].comment = getComment(mouthfeel);
      completed = completed && mouthfeel.isCompleted();
      updated = true;
      console.log("Saving mouthfeel");
      console.log(mouthfeel);
    }
    if (overall.isUpdated()) {
      tabItems[4].comment = getComment(overall);
      completed = completed && overall.isCompleted();
      updated = true;
      console.log("Saving overall");
      console.log(overall);
    }
    if (updated) {
      tabItems = tabItems;
      totalScore = computeScore();
      if (completed) {
        showPdf = true;
      }
    }

    // console.log(appearance);
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
    console.log(aroma);
    console.log(appearance);
    console.log(flavor);
    console.log(mouthfeel);
    console.log(overall);

    let renderer = new PdfRenderer("BEER SCORESHEET", totalScore);
    let json = JSON.stringify({
      'user': user,
      'beer': beer,
      'aroma': aroma,
      'appearance': appearance,
      'flavor': flavor,
      'mouthfeel': mouthfeel,
      'overall': overall,
      'start': start,
      'score': totalScore
    });
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

  .right {
    float: right;
    margin: 0 0 0 0;
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
    font-color: #ccc;
  }

  div.statusLine {
    float: right;
    font-size: 0.8em;
    font-color: #bbb;
    font-style: italic;
  }

  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }

  @keyframes octocat-wave {
    0%, 100% {
      transform: rotate(0)
    }
    20%, 60% {
      transform: rotate(-25deg)
    }
    40%, 80% {
      transform: rotate(10deg)
    }
  }

  @media (max-width: 500px) {
    .github-corner:hover .octo-arm {
      animation: none
    }

    .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out
    }
  }
</style>

<div class="top" id="top">
  <button class="settings" on:click={() => userEdit()}>
    <span title="Edit User"><SvgIcon d={userIcon} fill="blue" size="1.5em"/>{user.name}</span>
  </button>
  <button class="settings" on:click={() => beerEdit()}>
    <span title="Edit Beer"><SvgIcon d={beerIcon} boxSize="2206" fill="orange" size="1.5em"/>{beer.entry}</span>
  </button>
  <button on:click={() => submit()} class="right">
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
    <Beer beer={beer}/>
    <button on:click={() => evaluationEdit()} disabled={!beer.isCompleted()}>
      <span title="Scoresheet"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
    </button>
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
      <Overall overall={overall}/>
    {/if}
  </div>
  <div class="footLine">{pkg.name} v{pkg.version}</div>
</div>


<a href="https://github.com/bdelbosc/beer-feedback" target="_blank" class="github-corner"
   aria-label="Star me on GitHub">
  <svg width="50" height="50" viewBox="0 0 250 250"
       style="fill:#70B7FD; color:#fff; position: absolute; bottom: 0; border: 0; left: 0;" aria-hidden="true">
    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
    <path
      d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
      fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
    <path
      d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
      fill="currentColor" class="octo-body"></path>
  </svg>
</a>

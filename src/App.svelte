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
      console.log("Saving user");
      console.log(user);
    }
    if (beer.isUpdated()) {
      beer = beer;
      mainComment = getComment(beer, 'Missing: ');
      completed = completed && beer.isCompleted();
      console.log("Saving beer");
      console.log(beer);
      if (beer.isCompleted()) start = new Date();
    }
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

    let renderer = new PdfRenderer("Beer Scoresheet", totalScore);
    renderUser(renderer, user, start);
    renderBeer(renderer, beer);
    renderAroma(renderer, aroma);
    renderAppearance(renderer, appearance);
    renderFlavor(renderer, flavor);
    renderMouthfeel(renderer, mouthfeel);
    renderOverall(renderer, overall);
    renderer.produce('scoresheet.pdf');
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
    margin: auto;
    float: right;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  button[disabled] {
    border: 1px dotted #ccc;
    background-color: #fff;
    color: #ccc;
  }

  button {
    border: 1px solid #444;
    background-color: #eee;
    color: #444;
  }

  div.statusLine {
    font-size: 0.8em;
    font-color: #bbb;
  }

</style>
<div class="top" id="top">
  <button on:click={() => userEdit()}>
    <span title="Edit user"><SvgIcon d={userIcon} size="0.8em" fill="blue"/>{user.name}</span>
  </button>
  <button on:click={() => beerEdit()}>
    <span title="Edit beer"><SvgIcon d={beerIcon} boxSize="2206" size="0.8em" fill="orange"/>{beer.entry}</span>
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
    <div class="statusLine">Elapsed: {elapsed} seconds, Score: {totalScore}</div>
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
    <button on:click={() => submit()} class="submit">
      <span title="PDF">PDF</span>
    </button>
  </div>

</div>


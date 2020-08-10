<svelte:head>
  <!--  <script src="/hnl.mobileConsole.1.3.js"></script>-->
</svelte:head>
<script>
  import Tabs from "./comp/Tabs.svelte";
  import Aroma from './Aroma.svelte';
  import Appearance from './Appearance.svelte';
  import Flavor from './Flavor.svelte';
  import Mouthfeel from './Mouthfeel.svelte';
  import Overall from './Overall.svelte';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {
    nextIcon
  } from './js/AppIcons'

  import {AromaDto, renderAroma} from './js/Aroma';
  import {AppearanceDto, renderAppearance} from './js/Appearance';
  import {FlavorDto, renderFlavor} from './js/Flavor';
  import {MouthfeelDto, renderMouthfeel} from './js/Mouthfeel';
  import {OverallDto, renderOverall} from './js/Overall';
  import {PdfRenderer} from './js/PdfRenderer';

  export const name = "Beer feedback";

  let aroma = new AromaDto();
  let appearance = new AppearanceDto();
  let flavor = new FlavorDto();
  let mouthfeel = new MouthfeelDto();
  let overall = new OverallDto();

  let totalScore;
  let start = new Date();
  let mytime = new Date();
  let elapsed = 0;

  function getComment(item) {
    if (item.isCompleted()) {
      return '';
    }
    return 'Comment on: ' + item.getRequired().join(', ') + '.';
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
    if (aroma.isUpdated()) {
      tabItems[0].comment = getComment(aroma);
      updated = true;
      console.log("Saving aromas");
      console.log(aroma);
    }
    if (appearance.isUpdated()) {
      tabItems[1].comment = getComment(appearance);
      updated = true;
      console.log("Saving appearance");
      console.log(appearance);
    }
    if (flavor.isUpdated()) {
      tabItems[2].comment = getComment(flavor);
      updated = true;
      console.log("Saving flavors");
      console.log(flavor);
    }
    if (mouthfeel.isUpdated()) {
      tabItems[3].comment = getComment(mouthfeel);
      updated = true;
      console.log("Saving mouthfeel");
      console.log(mouthfeel);
    }
    if (overall.isUpdated()) {
      tabItems[4].comment = getComment(overall);
      updated = true;
      console.log("Saving overall");
      console.log(overall);
    }
    if (updated) {
      tabItems = tabItems;
      totalScore = computeScore();
    }

    // console.log(appearance);
  }, 3000);


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

    let renderer = new PdfRenderer("Beer Scoresheet Feedback", totalScore);
    renderAroma(renderer, aroma);
    renderAppearance(renderer, appearance);
    renderFlavor(renderer, flavor);
    renderMouthfeel(renderer, mouthfeel);
    renderOverall(renderer, overall);

    renderer.produce('scoresheet.pdf');
  }

  const formatter = new Intl.DateTimeFormat('en', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });


</script>


<style>
  div.main {
    max-width: 320px;
    margin: auto;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
</style>

Elapsed: {elapsed} seconds, Score: {totalScore}
<div class="main">
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

<button on:click={submit} class="submit">
  <span title="Next Section"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
</button>

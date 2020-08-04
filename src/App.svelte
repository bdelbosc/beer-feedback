<svelte:head>
  <script src="/hnl.mobileConsole.1.3.js"></script>
  <!--  <meta name="viewport" content="width=320, initial-scale=1.0">-->
</svelte:head>
<script>
  import Tabs from "./Tabs.svelte";
  import Aroma from './Aroma.svelte';
  import Appearance from './Appearance.svelte';
  import Flavor from './Flavor.svelte';
  import SvgIcon from "./SvgIcon.svelte";
  import {
    nextIcon
  } from './AppIcons'

  import {AromaDto} from './js/Aroma'
  import {AppearanceDto} from './js/Appearance'
  import {FlavorDto} from './js/Flavor'

  export let name = "Beer feedback";

  let aromas = new AromaDto();
  let appearance = new AppearanceDto();
  let flavors = new FlavorDto();

  let start = new Date();
  let mytime = new Date();
  let elapsed = 0;

  function getComment(item) {
    if (item.isCompleted()) {
      return '';
    }
    return 'Comment on: ' + item.getRequired().join(', ') + '.';
  }

  const interval = setInterval(() => {
    mytime = new Date();
    elapsed = Math.round((mytime - start) / 1000);
    let updated = false;
    if (aromas.isUpdated()) {
      tabItems[0].comment = getComment(aromas);
      updated = true;
      console.log("Saving aromas");
      console.log(aromas);
    }
    if (appearance.isUpdated()) {
      tabItems[1].comment = getComment(appearance);
      updated = true;
      console.log("Saving appearance");
      console.log(appearance);
    }
    if (flavors.isUpdated()) {
      tabItems[2].comment = getComment(flavors);
      updated = true;
      console.log("Saving flavors");
      console.log(flavors);
    }
    if (mouthfeel.updated) {
      console.log("Saving mouthfeel");
      console.log(mouthfeel);
      mouthfeel.updated = false;
      updated = true;
      tabItems[3].completed = mouthfeel.completed;
    }
    if (overall.updated) {
      console.log("Saving overall");
      console.log(overall);
      overall.updated = false;
      updated = true;
      tabItems[4].completed = overall.completed;
    }
    if (updated) {
      tabItems = tabItems;
    }

    // console.log(appearance);
  }, 3000);

  let mouthfeel = {
    'type': 'mouthfeel',
    'completed': false,
    'updated': false,
  };

  let overall = {
    'type': 'overall',
    'completed': false,
    'updated': false,
  };

  let tabItems = [
    {label: "Aroma", shortLabel: "A", value: 1, comment: ''},
    {label: "Appearance", shortLabel: "A", value: 2, comment: ''},
    {label: "Flavors", shortLabel: "F", value: 3, comment: ''},
    {label: "Moothfeel", shortLabel: "M", value: 4, comment: ''},
    {label: "Overall", shortLabel: "O", value: 5, comment: ''}
  ];
  let currentTab = 1;

  function submit() {
    console.log(aromas);
    console.log(appearance);
    console.log(flavors);
    console.log(mouthfeel);
    console.log(overall);
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

{formatter.format(mytime)} {elapsed} {elapsed === 1 ? 'second' : 'seconds'}
<div class="main">
  <Tabs bind:activeTabValue={currentTab} items={tabItems}/>
  {#if 1 === currentTab}
    <Aroma aromas={aromas}/>
  {:else if 2 === currentTab}
    <Appearance appearance={appearance}/>
  {:else if 3 === currentTab}
    <Flavor flavors={flavors}/>
  {:else if 4 === currentTab}
    Mouthfeel
  {:else if 5 === currentTab}
    Overall
  {/if}

</div>

<button on:click={submit} class="submit">
  <span title="Next Section"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
</button>


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

  import {AppearanceDto} from './js/Appearance'

  export let name = "Beer feedback";
  let start = new Date();
  let mytime = new Date();
  let elapsed = 0;

  const interval = setInterval(() => {
    mytime = new Date();
    elapsed = Math.round((mytime - start) / 1000);
    let updated = false;

    if (aromas.updated) {
      console.log("Saving aromas");
      console.log(aromas);
      aromas.updated = false;
      tabItems[0].completed = aromas.completed;
      updated = true;
      console.log(tabItems);
    }
    if (appearance.isUpdated()) {
      tabItems[1].completed = appearance.isCompleted();
      console.log("Saving appearance");
      console.log(appearance);
    }
    if (flavors.updated) {
      console.log("Saving flavors");
      console.log(flavors);
      flavors.updated = false;
      updated = true;
      tabItems[2].completed = flavors.completed;
    }
    if (mouthfeel.updated) {
      console.log("Saving mouthfeel");
      console.log(mouthfeel);
      mouthfeel.updated = false;
      tabItems[3].completed = mouthfeel.completed;
    }
    if (overall.updated) {
      console.log("Saving overall");
      console.log(overall);
      overall.updated = false;
      tabItems[4].completed = overall.completed;
    }

    if (updated) {
      tabItems = tabItems;
    }
    // console.log(appearance);
  }, 3000);

  let aromas = {
    'type': 'aromas',
    'completed': true,
    'updated': false,
    "aromas": [
      {
        "trait": "Chocolate",
        "category": "malt",
        "inappropriate": true,
        "level": 3,
        "initial": true,
        "warms": false
      },
      {
        "trait": "Framboise",
        "category": "hops",
        "inappropriate": false,
        "level": 5,
        "initial": false,
        "warms": true
      },
      {
        "trait": "Esters/Pear",
        "category": "fermentation",
        "level": 2
      },
      {
        "trait": "A long description",
        "category": "others",
        "level": 0
      },
      {
        "trait": "Oxydation/Cherry",
        "category": "flaws",
        "level": 1
      }
    ]
  };

  let appearance = new AppearanceDto();

  let flavors = {
    'type': 'flavors',
    'completed': false,
    'updated': false,
    'flavors': [],
    'bitterness': {},
    'balance': {},
    'finish': {},
  };

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
    {label: "Aroma", shortLabel: "A", value: 1, completed: aromas.completed},
    {label: "Appearance", shortLabel: "A", value: 2, completed: appearance.isCompleted()},
    {label: "Flavors", shortLabel: "F", value: 3, completed: flavors.completed},
    {label: "Moothfeel", shortLabel: "M", value: 4, completed: mouthfeel.completed},
    {label: "Overall", shortLabel: "O", value: 5, completed: overall.completed}
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


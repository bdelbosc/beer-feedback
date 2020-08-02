<svelte:head>
  <!--  <meta name="viewport" content="width=320, initial-scale=1.0">-->
</svelte:head>
<script>
  import Tabs from "./Tabs.svelte";
  import Aroma from './Aroma.svelte';
  import Appearance from './Appearance.svelte';
  import SvgIcon from "./SvgIcon.svelte";
  import {
    nextIcon
  } from './AppIcons'

  let aromas = [
    {
      "trait": "Chocolat",
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
  ];

  let appearance = {};

  let tabItems = [
    {label: "Aroma", shortLabel: "A", value: 1},
    {label: "Appearance", shortLabel: "A", value: 2},
    {label: "Flavors", shortLabel: "F", value: 3},
    {label: "Moothfeel", shortLabel: "M", value: 4},
    {label: "Overall", shortLabel: "O", value: 5}
  ];
  let currentTab = 1;

  function submit() {
    console.log(aromas);
    console.log(appearance);
  }


</script>
<style>
  div.main {
    max-width: 320px;
    margin: auto;
  }
</style>
<div class="main">
  <Tabs bind:activeTabValue={currentTab} items={tabItems}/>

  {#if 1 === currentTab}
    <Aroma aromas={aromas}/>
  {:else if 2 === currentTab}
    <Appearance appearance={appearance}/>
  {:else if 3 === currentTab}
    Flavors
  {:else if 4 === currentTab}
    Mouthfeel
  {:else if 5 === currentTab}
    Overall
  {/if}

</div>

<button on:click={submit} class="submit">
  <span title="Next Section"><SvgIcon d={nextIcon} size="2em" fill="green"/></span>
</button>

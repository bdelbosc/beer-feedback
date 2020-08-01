<svelte:head>
<!--  <meta name="viewport" content="width=320, initial-scale=1.0">-->
</svelte:head>
<script>
  import Tabs from "./Tabs.svelte";
  import Aroma from './Aroma.svelte';

  let tabItems = [
    {label: "Aroma", shortLabel: "A", value: 1},
    {label: "Appearance", shortLabel: "A", value: 2},
    {label: "Flavors", shortLabel: "F", value: 3},
    {label: "Moothfeel", shortLabel: "M", value: 4},
    {label: "Overall", shortLabel: "O", value: 5}
  ];
  let currentTab;
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
    <Aroma/>
  {:else if 2 === currentTab}
    Appearance
  {:else if 3 === currentTab}
    Flavors
  {:else if 4 === currentTab}
    Mouthfeel
  {:else if 5 === currentTab}
    Overall
  {/if}

</div>


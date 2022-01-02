<script>
  import {fade} from 'svelte/transition';
  import bjcpGuideline from '../data/bjcp-guideline.json';
  export let value = false;
  export let category;
  export let section;

  $: value = value;
</script>
<style>
    label.guidelineLabel {
        color: #999;
        padding-top: 2em;
        clear: both;
    }

    p.guidelineText {
        text-align: justify;
        text-justify: inter-word;
    }

    p.disclamer {
        text-align: justify;
        text-justify: inter-word;
        font-size: 0.8em;
        color: #444;
    }
</style>
{#if category}
  <div>
    <label class="guidelineLabel">
      <input type="checkbox" bind:checked={value}>
      View BJCP Guideline
    </label>
    {#if value}
      <p class="guidelineText" in:fade>
        {category}: {bjcpGuideline[category][section]}
      </p>
      <p>
        <a href="https://www.bjcp.org/style/2015/{bjcpGuideline[category].link}/" rel="noopener"
           target="_blank">View original BJCP {category} description</a>.
      </p>
      <p in:fade class="disclamer">
        This is an extract of the 2021 BJCP Style Guide used for personal educational purpose.
        The BJCP data or any derivative output are protected by the BJCP Copyright and should not
        be marketed for profit or integrated or embedded in websites without the BJCP agreement.
        The most current version of the BCJP Style Guide can be found on the
        <a href="https://www.bjcp.org/" rel="noopener" target="_blank">BJCP web site</a>.
      </p>
    {/if}

  </div>
{/if}



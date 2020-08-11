<script>
  import SelectCheck from "./comp/SelectCheck.svelte";
  import {
    CATEGORY_OPTIONS
  } from './js/Beer';
  import SvgIcon from "./comp/SvgIcon.svelte";
  import {beerIcon} from "./js/AppIcons";

  export let beer;

  function updateHandler() {
    beer.updateHandler()
  }
</script>

<style>
  span.label {
    float: left;
    width: 100px;
  }

  input {
    width: 10em;
  }
</style>
<SvgIcon d={beerIcon} boxSize="2206" fill="orange" size="2em"/>
<h3>
  Which beer do you want to evaluate?
</h3>
<div>
  <span class="label">Entry #</span>
  <input on:change={updateHandler} type=text bind:value={beer.entry}/>
</div>

<div>
  <SelectCheck on:change={updateHandler} bind:value={beer.category} options={CATEGORY_OPTIONS} noCheck="true">
    Category
  </SelectCheck>
</div>

<div>
  <span class="label">Special Ingredients</span>
  <input on:change={updateHandler} type=text bind:value={beer.special}/>
</div>

<div>
  <span class="label">Comment</span>
  <input on:change={updateHandler} type=text bind:value={beer.comment}/>
</div>


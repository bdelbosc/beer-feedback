<script>
  import Srm from "./Srm.svelte";
  import {onMount} from 'svelte';

  export let appearance = [];

  let srm;

  onMount(async () => {
    if (appearance[0]['color'] === undefined) {
      srm = '?';
    } else {
      srm = appearance[0]['color'];
    }
  });

  function update(color) {
    if (color === undefined) {
      return;
    }
    appearance[0]['color'] = color;
    // appearance = appearance;
  }

  $: update(srm);

</script>

<div>Color: <Srm bind:value={srm}/></div>
<div>Hue:</div>
<div>Clarity:</div>
<div>Head:</div>
<div>Retention:</div>
<div>Texture:</div>


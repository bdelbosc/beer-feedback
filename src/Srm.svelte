<script>
  import {onMount} from 'svelte';

  export let value = undefined;

  const SRM_RGB_MAP = {
    1: '#FFE699',
    2: '#FFD878',
    3: '#FFCA5A',
    4: '#FFBF42',
    5: '#FBB123',
    6: '#F8A600',
    7: '#F39C00',
    8: '#EA8F00',
    9: '#E58500',
    10: '#DE7C00',
    11: '#D77200',
    12: '#CF6900',
    13: '#CB6200',
    14: '#C35900',
    15: '#BB5100',
    16: '#B54C00',
    17: '#B04500',
    18: '#A63E00',
    19: '#A13700',
    20: '#9B3200',
    21: '#952D00',
    22: '#8E2900',
    23: '#882300',
    24: '#821E00',
    25: '#7B1A00',
    26: '#771900',
    27: '#701400',
    28: '#6A0E00',
    29: '#660D00',
    30: '#5E0B00',
    31: '#5A0A02',
    32: '#600903',
    33: '#520907',
    34: '#4C0505',
    35: '#470606',
    36: '#440607',
    37: '#3F0708',
    38: '#3B0607',
    39: '#3A070B',
    40: '#36080A'
  };

  function getFontColor(color) {
    if (color > 18 && color < 30) {
      return '#DE7C00';
    } else if (color >= 13 && color <= 18) {
      return '#600903';
    }
    return SRM_RGB_MAP[41 - color];
  }

  function selectSrm(color) {
    value = color;
    document.getElementById('picker').hidden = true;
    document.getElementById('selection').hidden = false;
  }

  function pickSrm() {
    document.getElementById('picker').hidden = false;
    document.getElementById('selection').hidden = true;
  }

  onMount(async () => {
    document.getElementById('picker').hidden = true;
    document.getElementById('selection').hidden = false;
  });

</script>
<div id="picker">
  {#each Object.keys(SRM_RGB_MAP) as color}
    <button style="height: 3em; width: 3em; color: {getFontColor(color)}; background-color: {SRM_RGB_MAP[color]}"
            on:click={() => selectSrm(color)}>{color}</button>
  {/each}
</div>
<button id="selection" style="width: 10em; color: {getFontColor(value)}; background-color: {SRM_RGB_MAP[value]}"
        on:click={() => pickSrm()}>{value}</button>

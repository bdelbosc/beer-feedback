<script>
  import Srm from "./Srm.svelte";

  export let appearance;

  const heads = [
    {id: undefined, text: ''},
    {id: 'white', text: `White`},
    {id: 'ivory', text: `Ivory`},
    {id: 'beige', text: `Beige`},
    {id: 'tan', text: `Tan`},
    {id: 'brown', text: `Brown`}
  ];

  const hues = [
    {id: 'none', text: ''},
    {id: 'copper', text: `Copper`},
    {id: 'red', text: `Red`},
    {id: 'garnet', text: `Garnet`},
  ];

  const clarities = [
    {id: undefined, text: ''},
    {id: 'brillant', text: `Brillant`},
    {id: 'clear', text: `Clear`},
    {id: 'hazy', text: `Hazy`},
    {id: 'cloudy', text: `Cloudy`},
    {id: 'opaque', text: `Opaque`}
  ];

  const retentions = [
    {id: undefined, text: ''},
    {id: 1, text: `Poor`},
    {id: 3, text: `Average`},
    {id: 5, text: `Long lasting`}
  ];

  const textures = [
    {id: undefined, text: ''},
    {id: 'thin', text: `Thin`},
    {id: 'frothy', text: `Frothy`},
    {id: 'creamy', text: `Creamy`},
    {id: 'dense', text: `Dense`},
    {id: 'rocky', text: `Rocky`},
    {id: 'bigbubbles', text: `Big bubbles`}
  ];

</script>
<style>
  span.label {
    float: left;
    width: 100px;
  }

  select {
    width: 10em;
  }
</style>
<div><span class="label">Color</span>
  <Srm bind:value={appearance['color']}/>
</div>
<div><span class="label">Clarity</span>
  <select bind:value={appearance['clarity']}>
    {#each clarities as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Hue</span>
  <select bind:value={appearance['hue']}>
    {#each hues as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Head</span>
  <select bind:value={appearance['head']}>
    {#each heads as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Retention</span>
  <select bind:value={appearance['retention']}>
    {#each retentions as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div><span class="label">Texture</span>
  <select bind:value={appearance['texture']}>
    {#each textures as item}
      <option value={item.id}>
        {item.text}
      </option>
    {/each}
  </select>
</div>
<div>
  <label><span class="label">Laces</span><input type=checkbox bind:checked={appearance['laces']}></label>
  <label><span class="label">Legs</span><input type=checkbox bind:checked={appearance['legs']}></label>
</div>

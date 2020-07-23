<svelte:head>
	<script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript" on:load={plotlyLoaded}></script>
</svelte:head>

<script>

	let aromas = [
		{level: 3, trait: 'honey', origin: 'malt'},
		{level: 2, trait: 'citrus', origin: 'hop'},
	];

	function add() {
		aromas = aromas.concat({level: -1, trait: '', origin: 'unknown'});
	}

	function submit() {
		console.log(aromas);
	}

	function clear() {
		aromas = aromas.filter(t => !t.done);
	}

	$: remaining = aromas.filter(t => !t.done).length;


	import {onMount} from 'svelte';
	let headerText;
  export let plotHeader = '';
	import data from './aroma.json';
	export let xdata = [data];
	export let layout = {
		margin: {l: 0, r: 0, b: 0, t: 0},
		width: 350,
		height: 380,
		sunburstcolorway: ["#FFC300", "#dd408c", "#f1a2d9", "#ff5833", "#259f20", "#97df2d", "#bf6c26", "#df892d", "#ac5812", "#fcd98e", "#5d070e", "#928a80", "#fdf7cb", "#bfac26", "#6b9f20", "#33b5ff", "#33ffe3", "#c7eef3", "#b2aea9"],
		autocolorscale: true,
		extendsunburstcolors: true,
		extendsunburstcolorway: true,
		font: {size: 22}
	};

	function plotlyLoaded() {
		let plotDiv = document.getElementById('plotDiv');
		let Plot = new Plotly.newPlot(plotDiv, xdata, layout, {showSendToCloud: false});
	}

	onMount(() => {
  	headerText = 'On Mount Called !';
	});

</script>

<h1>Aromas</h1>

<div id="plotly">
  <div>
    <h1>{plotHeader}</h1>
  </div>
  <div id="plotDiv"><!-- Plotly chart will be drawn inside this DIV --></div>
</div>

{#each aromas as aroma}
	<div>
		<input
			type=checkbox
			bind:checked={aroma.done}
		>

		<select id="level">
			<option value="-1">Level?</option>
			<option value="0">None</option>
			<option value="1">Low</option>
			<option value="2">Medium low</option>
			<option value="3">Medium</option>
			<option value="3">Medium high</option>
			<option value="5">High</option>
		</select>

		<input
			placeholder="What needs to be done?"
			bind:value={aroma.trait}
		>
		<select id="origin">
			<option value="unknown">Origin?</option>
			<option value="malt">Malt</option>
			<option value="hop">Hop</option>
			<option value="fermentation">Fermentation</option>
			<option value="other">Other</option>
		</select>

	</div>
{/each}

<p>{remaining} remaining</p>

<button on:click={add}>
	Add new
</button>

<button on:click={clear}>
	Delete selected
</button>

<button on:click={submit}>
	Submit
</button>

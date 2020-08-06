<svelte:head>
	<script src="/plotly-latest.min.js" type="text/javascript" on:load={plotlyLoaded}></script>
</svelte:head>


<script>
	import {onMount} from 'svelte';
	import SvgIcon from "./SvgIcon.svelte";
	import {checkmarkIcon, editIcon} from '../js/AppIcons'

	export let value = '';
	let selected = '';
	let mounted = false;
	export let plotId = 'plotDiv';
	export let data = [];
	export let layout = {};

	onMount(async () => {
		mounted = true;
	});

	function plotlyLoaded() {
		let plotDiv = document.getElementById(plotId);
		// plotDiv.hidden = false;
		Plotly.newPlot(plotDiv, data, layout, {showSendToCloud: false});
		plotDiv.on('plotly_sunburstclick', function (data) {
			selected = data["points"][0]["currentPath"] + data["points"][0]["label"];
		});
	}

	function validate() {
		console.log("validate");
		value = selected;
	}

	function edit() {
		console.log("edit");
		selected = value;
		value = '';
	}

	$: {
		if (mounted) {
			if (value.length == 0) {
				document.getElementById(plotId + "Selected").hidden = true;
				document.getElementById(plotId + "Edit").hidden = false;
				// TODO here we want to reset the plot or select the root element
			} else {
				document.getElementById(plotId + "Selected").hidden = false;
				document.getElementById(plotId + "Edit").hidden = true;
			}
		}
	}

</script>
<style>
	input {
		width: 320px;
	}
</style>
<div id="{plotId}Edit">
	<input bind:value="{selected}" size="28"/>
	<div id="{plotId}"><!-- Plotly chart will be drawn inside this DIV --></div>
	<button on:click={validate} disabled={selected.length == 0}>
		<SvgIcon d={checkmarkIcon} fill="green" size="2em"/>
	</button>
	<slot/>
</div>
<div id="{plotId}Selected">
	<span contenteditable="false" bind:innerHTML={value}/>
	<button on:click={edit}>
		<SvgIcon d={editIcon}/>
	</button>
</div>


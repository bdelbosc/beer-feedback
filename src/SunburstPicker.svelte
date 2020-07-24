<svelte:head>
	<script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript" on:load={plotlyLoaded}></script>
</svelte:head>

<script>
	export let value = '';
	export let plotId = 'plotDiv';
	export let data = [];
	export let layout = {};

	function plotlyLoaded() {
		let plotDiv = document.getElementById(plotId);
		plotDiv.hidden = false;
		let Plot = new Plotly.newPlot(plotDiv, data, layout, {showSendToCloud: false});
		plotDiv.on('plotly_sunburstclick', function(data) {
			value = data["points"][0]["currentPath"] + data["points"][0]["label"];
		});
	}

</script>


<div id="{plotId}"><!-- Plotly chart will be drawn inside this DIV --></div>
<div><p contenteditable="false" bind:innerHTML={value}/></div>
